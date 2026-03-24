import { test, expect } from '@playwright/test';
import * as allure from 'allure-js-commons';
import { Severity } from 'allure-js-commons';
import { TeamManagerPage } from './pages/TeamManagerPage.js';
import { createAuthenticatedContext } from '../Unduit/utils/browser-utils.js';

test.describe('Team Manager - Navigate', () => {

  test('Navigate to Team Manager App', async ({ browser, browserName }) => {
    test.skip(browserName !== 'chromium', 'This test is configured to run only on Chromium');
    test.setTimeout(90000);

    await allure.label('feature', 'Team Manager');
    await allure.story('Navigate');
    await allure.severity(Severity.MINOR); // Low priority

    const { context, page } = await createAuthenticatedContext(browser);
    const teamManagerPage = new TeamManagerPage(page);

    await test.step('Step 1: Navigate to Team Manager App', async () => {
      await teamManagerPage.navigate();
      console.log('✅ Successfully navigated to Team Manager App');
    });
    await page.pause();
    await expect(page).toHaveURL(/.*\/apps\/team-suite/);
    console.log('🎉 Test Completed Successfully');
  });
});
