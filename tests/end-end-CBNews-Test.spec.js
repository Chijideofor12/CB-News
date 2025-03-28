// @ts-check
import { test, expect } from "@playwright/test";
import { describe } from "node:test";

test.use({
  launchOptions: {
    headless: false, // Disable headless mode
  },
});
describe("get all articles and filter by topics", () => {
  test("test", async ({ page }) => {
    await page.goto("https://cb-news-three.vercel.app/");
    await expect(page.getByRole("heading", { name: "Articles" })).toBeVisible();
    await page.getByRole("group", { name: "Topics:" }).locator("svg").click();
    await page.getByRole("option", { name: "Coding" }).click();
    await expect(
      page.locator(".text-sm > span:nth-child(2)").first()
    ).toBeVisible();
    await page.getByRole("group", { name: "Topics:" }).locator("svg").click();
    await page.getByRole("option", { name: "Football" }).click();
    await expect(
      page.locator(".text-sm > span:nth-child(2)").first()
    ).toBeVisible();
    await page.getByRole("group", { name: "Topics:" }).locator("svg").click();
    await page.getByRole("option", { name: "Cooking" }).click();
    await expect(
      page.locator(".text-sm > span:nth-child(2)").first()
    ).toBeVisible();
  });
});
