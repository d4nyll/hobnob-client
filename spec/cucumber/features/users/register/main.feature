Feature: Register User

  User visits the Registration Page, fills in the form, and submits

  Background: Navigate to the Registration Page

    When user navigates to /

  Scenario: Password Too Short

    When user types in "valid@ema.il" in the "#email" element
    And user types in "shortpw" in the "#password" element
    Then the "#register-button" element should have a "disabled" attribute