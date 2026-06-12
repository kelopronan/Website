const express = require('express');
const puppeteer = require('puppeteer');
const path = require('path');

const app = express();
const port = 3000;
app.use(express.static(path.join(__dirname, '..', '..'))); // Serves 'd:\New Portfolio()'

const server = app.listen(port, async () => {
    console.log(`Test server running at http://localhost:${port}`);
    
    try {
        const browser = await puppeteer.launch({ headless: 'new' });
        const page = await browser.newPage();
        
        // 1. Test responsive `.modules-grid` logic on extremely small widths
        await page.setViewport({ width: 300, height: 800 });
        await page.goto(`http://localhost:${port}/personality-db.html`, { waitUntil: 'networkidle0' });
        
        const gridInfo = await page.evaluate(() => {
            const grid = document.querySelector('.modules-grid');
            const card = document.querySelector('.module-card');
            if (!grid || !card) return null;
            
            const gridRect = grid.getBoundingClientRect();
            const cardRect = card.getBoundingClientRect();
            
            return {
                gridWidth: gridRect.width,
                cardWidth: cardRect.width,
                cardHeight: cardRect.height,
                cardScrollHeight: card.scrollHeight, // To check for overflow
                aspectRatio: window.getComputedStyle(card).aspectRatio
            };
        });
        
        console.log('--- Small Width Test ---');
        console.log('Grid Info:', gridInfo);
        if (gridInfo.cardScrollHeight > gridInfo.cardHeight) {
            console.log('FAIL: Content overflows the card height (text is cut off) due to aspect-ratio restriction.');
        } else {
            console.log('PASS: Content fits within card.');
        }
        
        // 2. Test animation layout thrashing
        // We will collect performance metrics or observe MutationObserver / FPS.
        // Or simply check how many times style recalculations happen.
        const metrics = await page.metrics();
        console.log('\n--- Metrics before wait ---');
        console.log(metrics);
        
        await new Promise(r => setTimeout(r, 2000));
        
        const metrics2 = await page.metrics();
        console.log('\n--- Metrics after 2s wait ---');
        console.log(metrics2);
        
        console.log(`Layout updates: ${metrics2.LayoutCount - metrics.LayoutCount}`);
        console.log(`Recalc Style updates: ${metrics2.RecalcStyleCount - metrics.RecalcStyleCount}`);
        if ((metrics2.LayoutCount - metrics.LayoutCount) > 10) {
            console.log('FAIL: Layout thrashing detected.');
        } else {
            console.log('PASS: No significant layout thrashing.');
        }
        
        // Let's also check if VanillaTilt overrides IntersectionObserver inline styles or vice-versa
        const tiltTest = await page.evaluate(() => {
            const card = document.querySelector('.module-card');
            return {
                transition: card.style.transition,
                transform: card.style.transform
            };
        });
        console.log('\n--- Style Conflict Test ---');
        console.log('Card Inline Styles:', tiltTest);
        
        await browser.close();
    } catch (e) {
        console.error(e);
    } finally {
        server.close();
    }
});
