// Simple helper function creates a new element from a name, so you don't have to add the brackets etc.
$.createElement = function(name)
{
    return $('<'+name+' />');
};

$.createAnswer = function (name)
{
return $('<output>\n<prompt selectionType="RANDOM">\n<'+name+' />\n</prompt>\n</output>');
}
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
var $root = $('<flow />');

$root.append
(
    // one method of adding a basic structure
    $('<flow />').append
    (
        $('<folder />').append
        (
			$('<output />').append
			(
				$('<propmt />').append
				(
					$('<item />').text('John Doe')
				)
			)
        )
    )
    // example of our plugin
    .appendNewElement('prompts')
);

// get a reference to report
var $flow = $root.find('flow');
// get a reference to students
var $prompts = $flow.find('prompts');
console.log($prompts);
// or find students from the $root like this: $root.find('report>students');

// create 'Alice'
var $newPrompt = $.createElement('prompt');
// add 'item' element using standard jQuery
$newPrompt.append($('<item />').text('Alice'));

// add 'Alice' to <students />
$prompts.append($newPrompt);

// create 'Bob'
$newPrompt = $.createElement('prompt');
// add 'item' element using our helper
$newPrompt.append($.createElement('item').text('80'));
$newPrompt.append($.createAnswer('item').text('abc'));

// add 'Bob' to <students />
$prompts.append($newPrompt);

// display the markup as text
alert($root.html());