// Simple helper function creates a new element from a name, so you don't have to add the brackets etc.
$.createElement = function(name)
{
    return $('<'+name+' />');
};

// JQ plugin appends a new element created from 'name' to each matched element.
$.fn.appendNewElement = function(name)
{
    this.each(function(i)
    {
        $(this).append('<'+name+' />');
    });
    return this;
}

/* xml root element - because html() does not include the root element and we want to 
 * include <report /> in the output. There may be a better way to do this.
 */
var $root = $('<XMLDocument />');

$root.append
(
    // one method of adding a basic structure
    $('<report />').append
    (
        $('<submitter />').append
        (
            $('<name />').text('John Doe')
        )
    )
    // example of our plugin
    .appendNewElement('students')
);

// get a reference to report
var $report = $root.find('report');

// get a reference to students
var $students = $report.find('students');
// or find students from the $root like this: $root.find('report>students');

// create 'Alice'
var $newStudent = $.createElement('student');
// add 'name' element using standard jQuery
$newStudent.append($('<name />').text('Alice'));
// add 'grade' element using our helper
$newStudent.append($.createElement('grade').text('80'));

// add 'Alice' to <students />
$students.append($newStudent);

// create 'Bob'
$newStudent = $.createElement('student');
$newStudent.append($('<name />').text('Bob'));
$newStudent.append($.createElement('grade').text('90'));

// add 'Bob' to <students />
$students.append($newStudent);

// display the markup as text
alert($root.html());