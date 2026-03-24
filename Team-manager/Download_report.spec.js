import { test, expect } from '@playwright/test';
import * as allure from 'allure-js-commons';
import { Severity } from 'allure-js-commons';
import { TeamManagerPage } from './pages/TeamManagerPage.js';
import { createAuthenticatedContext } from '../Unduit/utils/browser-utils.js';

test.describe('Team Manager - Download Report', () => {

  test('Download report with filters', async ({ browser, browserName }) => {
    test.skip(browserName !== 'chromium', 'This test is configured to run only on Chromium');
    test.setTimeout(120000);

    await allure.label('feature', 'Team Manager');
    await allure.story('Download Report');
    await allure.severity(Severity.MINOR);

    const { context, page } = await createAuthenticatedContext(browser);
    const teamManagerPage = new TeamManagerPage(page);

    await test.step('Step 1: Navigate to Team Manager App', async () => {
      await teamManagerPage.navigate();
    });

    await test.step('Step 2: Click Download Report', async () => {
      await teamManagerPage.clickDownloadReport();
      await page.waitForTimeout(1000);
    });

    await test.step('Step 3: Click first field', async () => {
      await teamManagerPage.clickReportFirstField();
      await page.waitForTimeout(500);
    });

    await test.step('Step 4: Select All (first dropdown)', async () => {
      await teamManagerPage.selectReportAllOptionFirst();
    });

    await test.step('Step 5: Click expand_more', async () => {
      await teamManagerPage.clickReportExpandMore();
      await page.waitForTimeout(500);
    });

    await test.step('Step 6: Select All (second dropdown)', async () => {
      await teamManagerPage.selectReportAllOptionSecond();
    });

    await test.step('Step 7: Select Country (first item)', async () => {
      await teamManagerPage.selectCountryInReport();
    });

    await test.step('Step 8: Select Signup Method All', async () => {
      await teamManagerPage.selectSignupMethodAll();
      await page.waitForTimeout(500);
    });

    await test.step('Step 9: Click Download and wait for file', async () => {
      const downloadPromise = page.waitForEvent('download');
      await teamManagerPage.clickDownloadSubmit();
      const download = await downloadPromise;
      console.log(`✅ Download started: ${download.suggestedFilename()}`);
    });

    console.log('🎉 Test Completed Successfully');
  });
});
