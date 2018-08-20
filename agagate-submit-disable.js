// Enable/Disable submit button on form fill
$(function () {
	var 	$month = $("#PL_AgeGate_Birthdate_month"),
			$day = $("#PL_AgeGate_Birthdate_day"),
			$year = $("#PL_AgeGate_Birthdate_year");

	//When any of the age gate selects change...
	$(document.body).on("change", ($month, $day, $year), function () {

		//grab their values
		var monthText = $month.val();
		var dayText = $day.val();
		var yearText = $year.val();

		//run this function
		switchAgeGateSubmit();

		//If the all values are NOT equal to 0 (default), remove disabled attribute, otherwise add attribute disabled=disabled
		function switchAgeGateSubmit() {

			if (monthText != 0 && dayText != 0 && yearText != 0) {
				$(".btn-submit").removeAttr('disabled')
			} else {
				$(".btn-submit").attr('disabled', 'disabled')
			}
		}

	});

});
