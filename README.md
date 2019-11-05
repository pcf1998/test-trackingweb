# Assignment 1 - Agile Software Practice.

Name: ... your name ...

## Overview.

...... A statement of the API's context and objectives (just a paragraph)........

## API endpoints.

 . . . . . List the API's endpoints and state the purpose of each . . . . 
 
 e.g.

 + GET /students - Get all students.
 + GET /students/course/:id - Get all students on a particular course.
 + POT /students/:id/absent - Update specific student's list of sick certificates.
 + etc
 + etc

## Data model.

. . . . Describe the structure of the database being used by your API. An image (see example below) or JSON represerntation is acceptable . . . . 

![][datamodel]


## Sample Test execution.

. . . . . In this section include a listing of the output from running your tests. Simply copy the output from your terminal and past it into a fenced block, as shown below. Do not use a screenshot.

~~~
  Catalogue
    findProductByName
      ✓ should find a valid product name
      ✓ should return null for invalid product name
    removeProductByName
      ✓ should remove product with a valid name
      ✓ should return -1 when asked to remove invalid product
    checkReorder
      ✓ should return an empty array when no products need reordering
      ✓ should report those products that need reordering when present
      ✓ should include products just on their reorder level
      ✓ should handle an empty catalogue
    updateStock
      ✓ should update catalogue when invoice is fully valid
      ✓ should return invalid product lines, while still applying the valid ones
      ✓ should throw an error when a line is missing a product name
      ✓ should throw an error when a line is missing a quantity
    search
      ✓ should return products whose name contains the substring
      ✓ should return products whose price is below the limit
      ✓ should throw an error when criteria is not valid option
      boundry cases
        ✓ should return empty array for no name matches
        ✓ should return empty array for no products below the limit
        ✓ should return products whose price is below or on the limit


  18 passing (18ms)
~~~

[ Markdown Tip: By wrapping the test results in fences (~~~), GitHub will display it in a 'box' and preserve any formatting.]

## Extra features.

. . . . Briefly state any extra features of your assignment work that you feel should be high-lighted. This relates to 'independent learning' you have undertaken during the assignment . . . . .


[datamodel]: ./img/sample_data_model.gif




git checkout master

git checkout -b get-tasks-test


git add -A

git commit -m "Get the task in a specific project tested"

git commit -m "Invalid project id of add team tested"

git checkout master

git merge update-teamName-test