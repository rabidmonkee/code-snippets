<!-- ERROR POPUP SCRIPT -->
<script type="text/javascript">
    $(function () {
        $('#valBox').append('<button id="closeVal" class="btn white">CLOSE</button>');
        $('#valBox').on('click', function () {
            if ($('#closeVal').hasClass('hideMe')) {
                $('#closeVal').removeClass('hideMe');
                $('.validation-summary-errors span').html('! PLEASE CORRECT THE HIGHLIGHTED<br /> FIELD(S) TO CONTINUE');
            }
            else {
                $('#closeVal').addClass('hideMe');
                $('.validation-summary-errors span').html('! PLEASE CORRECT THE HIGHLIGHTED<br /> FIELD(S) TO CONTINUE<br />CLICK TO VIEW MORE DETAILS');
            }
        });
    });
</script>