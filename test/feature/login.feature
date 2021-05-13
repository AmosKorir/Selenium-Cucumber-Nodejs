Feature: login Feature

  The user should be logged in success when the provide the
  correct credentials on shown an error when wrong credentials are provided

  Scenario Outline: Login with either correct or Incorrect credential
    Given the user has entered  "<email>" and "<password>"
    When the user click login button
    Then the user should "<result>"

    Examples: Credential table
      | email           | password           | result        |
      | correct email   | correct password   | logged in     |
      | incorrect email | correct password   | not logged in |
      | correct email   | incorrect password | not logged in |
      | incorrect email | incorrect password | not logged in |