import { test, expect } from "@playwright/test";
import { describe } from "node:test";

test.use({
  launchOptions: {
    headless: false, // Disable headless mode
  },
});
describe("get article per article id", () => {
  test("test", async ({ page }) => {
    await page.goto("https://cb-news-three.vercel.app/");
    await page
      .getByText(
        "The Notorious MSG’s Unlikely Formula For SuccessTopic: cookingAuthor:"
      )
      .click();
    await expect(
      page.getByRole("heading", { name: "The Notorious MSG’s Unlikely" })
    ).toBeVisible();
  });
  test("user can vote up", async ({ page }) => {
    await page.goto("https://cb-news-three.vercel.app/");
    await page
      .getByRole("link", { name: "The battle for Node.js" })
      .first()
      .click();
    await page.getByRole("button", { name: "Upvote" }).click();
    await expect(page.getByText("13")).toBeVisible();
  });
});
