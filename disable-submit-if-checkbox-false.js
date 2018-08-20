$(function () {
    // disable button on page load
    $('.btn-submit').prop('disabled', true);

    var $checkbox = $('input[name="Certify"]');

    // on clicking checkbox
    $checkbox.change(function () {

        var checked = $(this).prop('checked'),
            submit = $('.btn-submit');

        // check for checked = true to remove disabled
        if (checked === true) {
            $(submit).prop('disabled', false);
        } else {
            $(submit).prop('disabled', true);
        };
    });
});