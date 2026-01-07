import { test, expect } from '@playwright/test';

test.describe('Recipe Index E2E', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/');
  });

  test('should display the title and recipe list', async ({ page }) => {
    await expect(page.getByText('Recipe Index')).toBeVisible();
    await expect(page.getByText('Roasted Chicken with Lemon')).toBeVisible();
  });

  test('should filter by search term', async ({ page }) => {
    const searchInput = page.getByPlaceholder('Search by name or ingredients (e.g. Chicken, Tofu)');
    await searchInput.fill('Mapo');

    await expect(page.getByText('Mapo Tofu')).toBeVisible();
    await expect(page.getByText('Roasted Chicken with Lemon')).not.toBeVisible();
  });

  test('should filter by quick filter button', async ({ page }) => {
    await page.getByRole('button', { name: 'Chicken' }).click();

    await expect(page.getByText('Roasted Chicken with Lemon')).toBeVisible();
    await expect(page.getByText('Mapo Tofu')).not.toBeVisible();
  });

  test('should persist favorites', async ({ page }) => {
    const recipeCard = page.locator('.bg-white', { has: page.getByText('Smacked Cucumber') }).first();
    const favButton = recipeCard.getByRole('button', { name: /add to favorites/i });

    await favButton.click();

    // Reload page
    await page.reload();

    const recipeCardReloaded = page.locator('.bg-white', { has: page.getByText('Smacked Cucumber') }).first();
    const favButtonReloaded = recipeCardReloaded.getByRole('button', { name: /remove from favorites/i });

    await expect(favButtonReloaded).toBeVisible();

    await page.getByRole('button', { name: /favorites only/i }).click();
    await expect(page.getByText('Smacked Cucumber')).toBeVisible();
    await expect(page.getByText('Roasted Chicken with Lemon')).not.toBeVisible();
  });

  test('responsive layout check', async ({ page }) => {
    await expect(page.getByText('Recipe Index')).toBeVisible();
    await expect(page.getByText('Roasted Chicken with Lemon')).toBeVisible();
  });
});
