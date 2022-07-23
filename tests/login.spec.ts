import { test, expect } from '@playwright/test'

test('Can we still login', async ({ page }) => {
  // Go to http://localhost:3000/
  await page.goto('http://localhost:3000/')

  // Click text=Sign In
  await page.locator('text=Sign In').click()
  await expect(page).toHaveURL('http://localhost:3000/login')

  // Fill input[name="email"]
  await page.locator('input[name="email"]').fill(process.env.E2E_USERNAME)

  // Fill input[name="password"]
  await page.locator('input[name="password"]').fill(process.env.E2E_PASSWORD)

  // Click text=Login
  await page.locator('text=Login').click()
  await expect(page).toHaveURL('http://localhost:3000/my-reports')
})
