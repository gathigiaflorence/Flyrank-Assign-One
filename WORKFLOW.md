# Workflow Summary

## Correctness & Edge Cases
Round 1 missed several important validation requirements for the settings form. The initial version did not properly defend against invalid budget values, so a user could enter zero or a negative number and still move forward. That was a meaningful correctness issue because the budget cap is a core requirement of the form and should never be non-positive. Round 2 corrected this by validating the input with JavaScript before submission, blocking the submit action when the value was invalid, and showing an error message directly beneath the field. The updated approach also prevented invalid settings from being saved to localStorage, which made the behavior more reliable and closer to the intended product requirements.

## Accessibility
Round 1 used weaker semantic HTML for the form. The input controls were not clearly connected to descriptive labels, which reduced accessibility for screen-reader users and made the form less understandable overall. Round 2 improved the markup by linking every input and select to a matching label using the for and id attributes. This created a clearer relationship between the form fields and their instructions, improved keyboard and assistive technology support, and made the interface more professional and standards-friendly.

## Review & Debugging Effort
Round 1 required more manual review and debugging because the form behavior had to be tested by hand to discover issues. Missing validation, unclear error handling, and weak submit protection meant that a reviewer had to inspect the implementation carefully and test multiple scenarios. Round 2 was more efficient because automated tests immediately confirmed whether the form behaved correctly. The tests helped verify that a negative budget cap triggered an error and prevented storage, which saved time and gave stronger confidence that the feature worked as expected.


