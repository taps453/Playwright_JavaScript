/*

1. You are given a web table with the following conditions.
- A table contains 38 records (country name)
- Each page displays 10 records
- Pagination is available (Page 1 --> 1-10 records, Page 2 --> 11-20 records....)

You need to find and click on the record "India", but you are not sure on which page it is present
If your desired country is not found your scrip should stop.

- There is a button Next to move to next page

*/

import {test, expect} from '@playwright/test';

test('Find element in web table', async ({page}) => {
    await page.goto('', {waitUntil : 'load'})
    while(true) {
        const records = await page.locator('').waitFor({ state : 'visible'})
        for(const record of records) {
            if(record.getAttribute("textContent") === 'India'){
                record.click()
                break
            }
        }
        const nextButton = await page.locator('')
        if(! (await nextButton.isVisible()) && ! (await nextButton.isEnabled())) {
            throw new Error("Next button not found")
        }
        await nextButton.click()
        await page.waitForTimeout(500)
    }
})
