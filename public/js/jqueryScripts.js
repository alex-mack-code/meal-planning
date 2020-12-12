
// source: https://stackoverflow.com/questions/14853779/adding-input-elements-dynamically-to-form 
$(document).ready(function() {
    var max_fields = 10;
    var x = 1;
    var wrapper = $("#mealItemDiv");
    var add_button = $("#addRow");
    var delete_button = $("#deleteRow");

    $(add_button).click(function(e) {
        e.preventDefault();
        if (x < max_fields) {
            appendHtml = '<label id="mealItemLabel' + x + '" for="mealItem">Meal Item ' + x + ':</label>';
            appendHtml += '<input id="mealItemInput' + x + '" type="text" name="mealItem[]" class="form-control" placeholder="Enter Meal Item">';
            appendHtml += '</input>';
            $(wrapper).append(appendHtml);
            x++; //add input box
        } else {
            alert('You Reached the limits')
        }
    });

    $(delete_button).click(function(e) {
        e.preventDefault();
        var y = x - 1;
        findLabelId = '#mealItemLabel' + y;
        findInputId = '#mealItemInput' + y;
        $(findLabelId).remove();
        $(findInputId).remove();
    })
});
