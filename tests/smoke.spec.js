const { test, expect } = require('@playwright/test');

test('gallery navigation and drag autoscroll work', async ({ page }) => {
  await page.goto('/');
  await page.locator('#search').fill('Marina Green');
  await page.locator('.catalog .card').click();
  await expect(page.locator('#name')).toHaveText('Marina Green Mica');

  const firstSource = await page.locator('#source').getAttribute('href');
  await page.locator('#next').click();
  await expect(page.locator('#largePhoto')).toHaveAttribute('src', /na-marina-green\/1\.jpg$/);
  await expect(page.locator('#source')).not.toHaveAttribute('href', firstSource);
  await page.locator('#close').click();

  await page.locator('#search').fill('');
  const card = page.locator('.catalog .card').first();
  await card.scrollIntoViewIfNeeded();
  await page.evaluate(() => scrollBy(0, 500));
  const before = await page.evaluate(() => scrollY);
  await page.evaluate(() => {
    const dataTransfer = new DataTransfer();
    const card = document.querySelector('.catalog .card');
    card.dispatchEvent(new DragEvent('dragstart', {
      bubbles: true,
      clientY: innerHeight / 2,
      dataTransfer
    }));
    document.dispatchEvent(new DragEvent('dragover', {
      bubbles: true,
      clientY: 2,
      dataTransfer
    }));
  });
  await page.waitForTimeout(700);
  const after = await page.evaluate(() => scrollY);
  await card.dispatchEvent('dragend');
  expect(after).toBeLessThan(before - 20);
});

test('a full 93-color ranking survives a shared URL', async ({ page }) => {
  await page.goto(`/#v=2&r=${'1'.repeat(93)}`);
  await expect(page.locator('#count')).toContainText('93 ranked');
  await expect(page.locator('.board .card')).toHaveCount(93);
});
