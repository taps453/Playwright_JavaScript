/*
Write Playwright script to get all the link from a webPage.
and get the unique link and check broken links 
*/

import { test, expect } from '@playwright/test';
import { request } from 'node:http';

//using .all() method
test("get All anchor tag", async ({page}) => {
    await page.goto("https://playwright.dev/docs/intro")
    const anchorTags = await page.locator('a').all();

    const linkArray = []

    for(const link of anchorTags){
        const hrefs = await link.getAttribute('href')
        linkArray.push(hrefs)
    }
    console.log(linkArray.length)
    console.log(linkArray)

    //get unique links
    const set = new Set(linkArray)
    console.log("unique links => " , set)
})



// using evaluateAll()
test('get all webPage links', async ({page}) => {
    await page.goto("https://playwright.dev/docs/intro")

    const links = await page.locator('a').evaluateAll(
        (elements) => elements.map(ele => ele.href)
        // filter out empty links
        .filter(link => link && link != '#')
    )
    console.log(links)
})



//check broken links
test("check broken links", async ({page,request}) => {
    await page.goto("https://playwright.dev/docs/intro", {waitUntil: 'load'})

    const allLinks = await page.locator('a').evaluateAll(
        (element) => element.map(ele => ele.href)
    )
    for(const link of allLinks){
        const res = await request.get(link);
        if(res.status() > 200){
            console.log(`Broken link: ${link} with status code ${res.status()}`)
        }
    }
})