/**
 * Team Manager Page Object Model
 * Contains page actions for the Team Manager app
 */

import { expect } from '@playwright/test';
import { TeamManagerPageLocators } from './TeamManagerPage.locators.js';
import { navigateViaApps } from '../../Unduit/utils/navigation-utils.js';

export class TeamManagerPage {
  constructor(page) {
    this.page = page;
    this.locators = new TeamManagerPageLocators(page);
  }

  /**
   * Navigate to Team Manager App
   * Uses Apps-first navigation pattern per project rules
   */
  async navigate() {
    await navigateViaApps(this.page, 'https://uat.unduit.com/apps/team-suite');
    await this.page.waitForTimeout(2000);
    await this.page.waitForLoadState('networkidle');
    await expect(this.page).toHaveURL(/.*\/apps\/team-suite/);

    // If app runs inside iframe (like POS), wait for frame content
    const iframe = this.page.locator('#iframePlatform');
    const iframeVisible = await iframe.isVisible({ timeout: 5000 }).catch(() => false);
    if (iframeVisible) {
      const frame = iframe.contentFrame();
      if (frame) {
        await frame.locator('body').waitFor({ state: 'visible', timeout: 15000 }).catch(() => null);
      }
    }

    console.log('✅ Successfully navigated to Team Manager App');
  }

  // ==================== Send Invitation Flow ====================

  async clickSendInvitation() {
    await this.locators.sendInvitationButton.click();
    console.log('✅ Clicked Send Invitation');
  }

  async fillEmail(email) {
    await this.locators.emailInput.waitFor({ state: 'visible', timeout: 10000 });
    await this.locators.emailInput.click();
    await this.locators.emailInput.fill(email);
    console.log(`✅ Filled email: ${email}`);
  }

  async selectRole(role) {
    await this.locators.selectRoleDropdown.waitFor({ state: 'visible', timeout: 10000 });
    await this.locators.selectRoleDropdown.click();
    await this.page.waitForTimeout(500);
    await this.locators.roleOption(role).waitFor({ state: 'visible', timeout: 5000 });
    await this.locators.roleOption(role).click();
    console.log(`✅ Selected role: ${role}`);
  }

  async selectCountry(country) {
    await this.locators.selectCountryDropdown.waitFor({ state: 'visible', timeout: 10000 });
    await this.locators.selectCountryDropdown.click();
    await this.page.waitForTimeout(500);
    await this.locators.countryOption(country).waitFor({ state: 'visible', timeout: 5000 });
    await this.locators.countryOption(country).click();
    console.log(`✅ Selected country: ${country}`);
  }

  async clickInvitedUsers() {
    await this.locators.invitedUsersButton.click();
    console.log('✅ Clicked Invited Users');
  }

  async searchByNameOrEmail(searchText) {
    await this.locators.searchByNameAndEmailInput.click();
    await this.locators.searchByNameAndEmailInput.fill(searchText);
    console.log(`✅ Searched for: ${searchText}`);
  }

  // ==================== Download Report Flow ====================

  async clickDownloadReport() {
    await this.locators.downloadReportButton.click();
    console.log('✅ Clicked Download Report');
  }

  async clickReportFirstField() {
    await this.locators.reportFirstField.click();
    console.log('✅ Clicked first report field');
  }

  async selectReportAllOptionFirst() {
    await this.locators.reportAllOptionFirst.click();
    console.log('✅ Selected All (first dropdown)');
  }

  async clickReportExpandMore() {
    await this.locators.reportExpandMore.click();
    console.log('✅ Clicked expand_more');
  }

  async selectReportAllOptionSecond() {
    await this.locators.reportAllOptionSecond.click();
    console.log('✅ Selected All (second dropdown)');
  }

  async selectCountryInReport() {
    await this.locators.selectCountryReportDropdown.click();
    await this.page.waitForTimeout(500);
    await this.locators.selectCountryFirstItem.click();
    console.log('✅ Selected country (first item)');
  }

  async selectSignupMethodAll() {
    await this.locators.selectSignupMethodDropdown.click();
    await this.page.waitForTimeout(500);
    await this.locators.signupMethodAllOption.click();
    console.log('✅ Selected Signup Method: All');
  }

  async clickDownloadSubmit() {
    await this.locators.downloadSubmitButton.click();
    console.log('✅ Clicked Download (submit)');
  }
}
