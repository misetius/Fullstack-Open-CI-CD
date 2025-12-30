const { test, expect } = require('@playwright/test')


test('front page can be opened', async ({page}) => {
  await page.goto('http://localhost:4173')
  const locator1 = page.getByText('Phonebook')
  const locator2 = page.getByText('Numbers')
  await expect(locator1).toBeVisible()
  await expect(locator2).toBeVisible()
}) 