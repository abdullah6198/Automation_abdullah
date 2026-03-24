/**
 * Team Manager Page Locators
 * Contains locator definitions for the Team Manager app
 */

export class TeamManagerPageLocators {
  constructor(page) {
    this.page = page;
  }

  /** Frame containing the Team Manager app content (if app runs in iframe) */
  get frame() {
    return this.page.locator('#iframePlatform').contentFrame();
  }

  /** Main body for visibility check when app loads in iframe */
  get frameBody() {
    return this.frame.locator('body');
  }

  /** Context for elements - Team Manager app loads in main page (not iframe) */
  get ctx() {
    return this.page;
  }

  // ==================== Send Invitation ====================

  get sendInvitationButton() {
    return this.ctx.getByRole('button', { name: 'Send Invitation' });
  }

  get emailInput() {
    return this.ctx.getByPlaceholder('username@unduit.com');
  }

  get selectRoleDropdown() {
    return this.ctx.locator('label').filter({ hasText: 'Select Roleexpand_more' }).locator('i');
  }

  roleOption(role) {
    return this.ctx.locator('div').filter({ hasText: role }).nth(5);
  }

  get selectCountryDropdown() {
    return this.ctx.locator('label').filter({ hasText: 'Select Countryexpand_more' }).locator('i');
  }

  countryOption(country) {
    return this.ctx.locator('div').filter({ hasText: country }).nth(5);
  }

  get invitedUsersButton() {
    return this.ctx.getByRole('button', { name: 'Invited Users' });
  }

  get searchByNameAndEmailInput() {
    return this.ctx.getByPlaceholder('Search by name and email');
  }

  // ==================== Download Report ====================

  get downloadReportButton() {
    return this.ctx.getByRole('button', { name: 'Download Report' });
  }

  get reportFirstField() {
    return this.ctx.locator('.q-field__native.row').first();
  }

  get reportAllOptionFirst() {
    return this.ctx.locator('div').filter({ hasText: /^All$/ }).nth(2);
  }

  get reportExpandMore() {
    return this.ctx.getByText('expand_more').nth(3);
  }

  get reportAllOptionSecond() {
    return this.ctx.locator('div').filter({ hasText: /^All$/ }).nth(4);
  }

  get selectCountryReportDropdown() {
    return this.ctx.locator('div').filter({ hasText: /^Select Country$/ }).first();
  }

  get selectCountryFirstItem() {
    return this.ctx.locator('.q-item__label').first();
  }

  get selectSignupMethodDropdown() {
    return this.ctx.locator('div').filter({ hasText: /^Select Signup Method$/ }).first();
  }

  get signupMethodAllOption() {
    return this.ctx.getByRole('option', { name: 'All' });
  }

  get downloadSubmitButton() {
    return this.ctx.getByRole('button', { name: 'Download', exact: true });
  }
}
