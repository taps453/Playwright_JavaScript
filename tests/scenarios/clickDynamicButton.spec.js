/*
1. You are working on a web application where:

- A page is loaded successfully
- There is a button labelled "PROCEED"
- The challenge is that the button appears dynamically and the time is unpredictable.
- Button may appear in 1 sec, 10 sec, 1 min or even more then 20 min

How would you design your automation flow
1. wait for the PROCEED button to appear, regardless on how long it take.
2. click the button immediately once it become visible and clickable.

*/

import {test, expect} from '@playwright/test';
import { error } from 'node:console';

//1. wait for button to be visible
test('click dyancmic button', async ({page}) => {
    await page.goto('', {waitUntil : 'load'})
    const button = await page.getByRole('button', {name : 'Proceed'})

    await button.waitFor({
        state : 'visible',
        timeout : 30 * 60 * 100
    })
    await button.click()
})


//2. use while loop and click
test("click dynamic button", async ({page}) => {
    await page.goto('' , {waitUntil : 'load'})

    const currentTime = Date.now()
    const maxTime = 30 * 60 * 1000

    while(true) {
        try {
            const button = await page.getByRole('button', {name : 'Proceed'})
            if(await button.isVisible() && await button.isEnabled()) {
                await button.click()
                break
            }
        } catch(error) {

        }
        if(Date.now() - currentTime > maxTime) {
            throw new Error("Botton not found")
        }
        await page.waitForTimeout(500) 
    }
})

