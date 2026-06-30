/*
In a given web Table.
1- search a element in web table
2- and get the corresponding coulumns values
*/

import {test, expect} from '@playwright/test';


// get all the column values from a web table
test('Get column value', async ({page}) => {

    await page.goto("https://practicetestautomation.com/practice-test-table/", {waitUntil: 'load'})

    const cells = page.locator("//table//tr//td")
    const count = await cells.count()

    expect(count).toBeGreaterThan(0)

    const values = await cells.evaluateAll((elements) =>
        elements
            .map((element) => element.textContent?.trim())
            .filter(Boolean)
    )
    console.log(values)
})


//get specfic column nearby columnvalues from a web table
test('Get specific column value', async ({page}) => {
    await page.goto("https://practicetestautomation.com/practice-test-table/", {waitUntil: 'load'})

    const cells = await page.locator("//table//tr")
    const count = await cells.count()

    expect(count).toBeGreaterThan(0)

    for (let i = 1; i <= count; i++) {
        const row = await cells.nth(i)
        const courseName = await row.locator('td').nth(1).textContent()

        if(courseName && courseName.trim() === "REST Assured") {
            const id = await row.locator('td').nth(0).textContent()
            const language = await row.locator('td').nth(2).textContent()
            const enrollMent = await row.locator('td').nth(4).textContent()
            console.log(`Course: ${courseName.trim()}, ID: ${id?.trim()}, Language: ${language?.trim()}, Enrollment: ${enrollMent?.trim()}`)
            break
        }
    }
})