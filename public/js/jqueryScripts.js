



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
            x++; //add input box
            appendHtml = '<label id="mealItemLabel' + x + '" for="mealItem">Meal Item ' + x + ':</label>';
            appendHtml += '<input id="mealItemInput' + x + '" type="text" name="mealItem[]" class="form-control" placeholder="Enter Meal Item">';
            appendHtml += '</input>';
            $(wrapper).append(appendHtml);
        } else {
            alert('You reached the limit of ten meal items');
        }
    });

    $(delete_button).click(function(e) {
        e.preventDefault();
        if (x === 1) {
            alert('There is currently only one item');
        } else {
            //var y = x - 1;
            findLabelId = '#mealItemLabel' + x;
            findInputId = '#mealItemInput' + x;
            $(findLabelId).remove();
            $(findInputId).remove();
            x--;
        }
    });

    $('#dateSelector').datepicker({
        dateFormat: "yy-mm-dd"
    });
});
