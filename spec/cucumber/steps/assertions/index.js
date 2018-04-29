import assert from 'assert';
import { Given, When, Then } from 'cucumber';
import { By } from 'selenium-webdriver';

When(/^the (?:"|')([\.#\w-]+)(?:"|') element should have a (?:"|')([\w_-]+)(?:"|') attribute$/, async function (selector, attributeName) {
  const element = await this.driver.findElement(By.css(selector));
  const attributeValue = await element.getAttribute(attributeName);
  assert.equal(attributeValue, 'true');
});
