import puppeteer from 'puppeteer';
import dotenv from "dotenv";
dotenv.config();


export const priceGet = async (symbol) => {
// headless way of launching browser - without i actually see browser and anything happening. I use with head.
const browser = await puppeteer.launch({headless : false});
const page = await browser.newPage() //newPage opens new tab and goes somewhere with goto.
await page.goto(symbol, { waitUntil: 'domcontentloaded' });
//await page.screenshot({path: "screenshot.png"}); //take a screenshot of a page

    const getPrice = async () => {
        // creating the func to evaluate the page - grab all info i want when calling func
            const grabParagraph = await page.evaluate(()=>{
            const priceTag = document.querySelector("div.text-5xl\\/9.font-bold.text-\\[\\#232526\\]");  //querySelectorAll grabs every item
            
            return priceTag.innerText; 
        });
        await browser.close(); // closing the browser 
        return grabParagraph;  
    }
    
    const exportPrice = getPrice();
    return exportPrice;
    };

    
    // const price = await getPrice();
    //console.log(price);



