import { test, expect } from '@playwright/test';
import * as allure from 'allure-js-commons';
import { Severity } from 'allure-js-commons';
import { TeamManagerPage } from './pages/TeamManagerPage.js';
import { createAuthenticatedContext } from '../Unduit/utils/browser-utils.js';

test.describe('Team Manager - Send Invitation', () => {

  test('Send invitation and verify in Invited Users', async ({ browser, browserName }) => {
    test.skip(browserName !== 'chromium', 'This test is configured to run only on Chromium');
    test.setTimeout(120000);

    await allure.label('feature', 'Team Manager');
    await allure.story('Send Invitation');
    await allure.severity(Severity.MINOR);

    const { context, page } = await createAuthenticatedContext(browser);
    const teamManagerPage = new TeamManagerPage(page);

    // Unique email each run (timestamp + random for uniqueness)
    const uniqueEmail = `abdullah.invite${Date.now()}${Math.floor(Math.random() * 1000)}@unduit.com`;

    await test.step('Step 1: Navigate to Team Manager App', async () => {
      await teamManagerPage.navigate();
    });

    await test.step('Step 2: Click Send Invitation to open form', async () => {
      await teamManagerPage.clickSendInvitation();
      await page.waitForTimeout(1000);
    });

    await test.step('Step 3: Fill email with unique value', async () => {
      await teamManagerPage.fillEmail(uniqueEmail);
    });

    await test.step('Step 4: Select role Admin', async () => {
      await teamManagerPage.selectRole('Admin');
    });

    await test.step('Step 5: Select country Australia', async () => {
      await teamManagerPage.selectCountry('Australia');
    });

    await test.step('Step 6: Click Send Invitation to submit', async () => {
      await teamManagerPage.clickSendInvitation();
      await page.waitForTimeout(3000);
    });

    await test.step('Step 7: Click Invited Users', async () => {
      await teamManagerPage.clickInvitedUsers();
      await page.waitForTimeout(2000);
    });

    await test.step('Step 8: Search by name and email with same email', async () => {
      await teamManagerPage.searchByNameOrEmail(uniqueEmail);
      await page.waitForTimeout(2000);
      console.log(`✅ Searched for invited user: ${uniqueEmail}`);
    });
    await page.pause();
    console.log('🎉 Test Completed Successfully');
  });
});
