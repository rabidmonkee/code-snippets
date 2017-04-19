$pl.didFieldChange = [];
$pl.composites = [];
$pl.errorClass = 'input-validation-error';
$pl.validClass = 'valid';
$pl.highlightCount = 0;

// On Page Load
$(function () {

	// Creates #valBox Element on Page Load
	$('.validation-summary-valid, .validation-summary-errors').attr("id", "valBox");

    // On Click Event - Opens/Closes Validation Bar
	$('body').on('click', '.validation-summary-errors, #valBox2', function () {
		var validationList =  $('.validation-summary-errors ul'),
            validationList2 = $('#valBox2 ul');

		if ((validationList.css('display') == 'block') || (validationList2.css('display') == 'block')) {
			validationList.hide();
			validationList2.hide();
			$('.validation-summary-errors').css('background', '#ff6600 url(../content/mobile/images/validation-downarrow.png) no-repeat center 30px');
			$('.validation-summary-errors').css('background-size', '15px 10px');
        } else {
			validationList.show();
			validationList2.show();
			$('.validation-summary-errors').css('background', '#ff6600 url(../content/mobile/images/validation-close.png) no-repeat center bottom');
			$('.validation-summary-errors').css('background-size', '250px 50px');
        }
	});
});

// Post Back Error
$pl.postbackError = function () {

	//console.log('Form Received From Postback Error');

	// Variable Declarations
	var seen =    {},
		valBox =  $("#valBox"),
		valBox2 = $('#valBox2');

	// Duplicates #valBox Into #valBox2, If #valBox2 Is Present - For Z-Index Creative Issues
	if (valBox2.length > 0) {
		valBox2.html(valBox.html());
		valBox2.show();
		valBox.hide();
	}

	// Show Validation Summary List
	$('.validation-summary-errors ul').show();

	// Validation Summary Helper
	$('.validation-summary-errors li').each(function () {

		/* If Any Validation Text Contains "Official Rules" This Text Is Replaced With A Link To The Official Rules.
		   This Regex Will Not Target Any Official Rules Text That Is Already Wrapped In A Link Tag. */
		var string = $(this).text().replace(/official rules(?!\s*<\/a>)/gi, "<a href='" + $pl.baseHref + "Rules' target='_blank'>$&</a>");
		$(this).html(string);

		var txt = $(this).text();
		if (seen[txt])
			$(this).remove();
		else
			seen[txt] = true;
	});

	if (typeof FB != 'undefined' && FB.Canvas) {
		FB.Canvas.scrollTo(0, 0);
	}
};

$.validator.addMethod('phonethreefields', function (value, element) {
	var elemId = $(element).attr('id');
	var active = isCompositeActive(element);
	return active || value.isValidPhone();
}, '');

$.validator.addMethod('validdate', function (value, element) {
	var elemId = $(element).attr('id');
	var active = false;
	$('select', $(element).parent('div')).each(function (x) {
		if ($(document.activeElement).attr('id') == $(this).attr('id'))
			active = true;
	});

	if (active)
		return true;

	var validDate;

	if (!value.isValidDate('M/d/yyyy') && !value.isValidDate('MM/dd/yyyy'))
		return false;

	// Removing this to allow us to remove Date.js from project dependancy.  The code below is irrelevant because we set date range in dropdowns.
	// We just need to verify the format is valid, which it is when its formatting and inserted into the hidden field.

	//var beforeTime = Date.parse('January 1st 1753');

	//if (validDate = Date.parseExact(value, 'M/d/yyyy')) {
	//    if (beforeTime.compareTo(validDate) > -1) {
	//        return false;
	//    }
	//}
	//if (validDate = Date.parseExact(value, 'MM/dd/yyyy')) {
	//    if (beforeTime.compareTo(validDate) > -1) {
	//        return false;
	//    }
	//}

	return true;
}, '');

$.validator.addMethod('at_least_one', function (val, el) {
	return $(el).closest('form').find('.at_least_one:filled').length;
});

$.validator.addMethod("zipcoderange", function (value, element, range) {
	var ranges = range.split(",");
	var isValid = true;
	$.map(ranges, function (val, i) {
		var getMinMax = val.split("|");
		if (value >= getMinMax[0] && value <= getMinMax[1]) {
			isValid = false;
		}
	});
	return isValid;
}, '');

$.validator.addMethod('requiredif', function (value, element, parameters) {
	var id = '#' + parameters['dependentproperty'];
	var name = 'input[name="' + parameters['dependentproperty'].replace('_', '.') + '"]';

	// get the target value (as a string, 
	// as that's what actual value will be)
	var targetvalue = parameters['targetvalue'];
	var targetvalues = (targetvalue == null ? '' : targetvalue).toString().split(',');

	// get the actual value of the target control
	// note - this probably needs to cater for more 
	// control types, e.g. radios
	var control = $(id);
	var actualvalue = null;
	if (control.length > 0) {
		var controltype = control.attr('type');
		actualvalue = controltype == 'checkbox' ? control.is(":checked").toString() : control.val();
	}
	control = $(name + ":checked");
	if (control.length > 0) {
		actualvalue = control.val();
	}
	// If The Condition Is True, Reuse The Existing Required Field Validator Functionality
	for (var j = 0; j < targetvalues.length; j++) {
		alert(targetvalues[j] + " -> " + actualvalue);
		if (((targetvalues[j] == "null" || targetvalues[j] == null) && actualvalue == null) || (targetvalues[j] == actualvalue.toLowerCase())) {
			return $.validator.methods.required.call(this, value, element, parameters);
		}
	}

	return true;
});

$.validator.addClassRules('at_least_one', { 'at_least_one': true });
$.validator.unobtrusive.adapters.addBool('daterange', 'validdate');
$.validator.unobtrusive.adapters.addBool('phonethreefields');
$.validator.unobtrusive.adapters.addBool('mandatory', 'required');
$.validator.unobtrusive.adapters.addSingleVal("zipcoderange", "range");
$.validator.unobtrusive.adapters.add('requiredif', ['dependentproperty', 'targetvalue'],
	function (options) {
		options.rules['requiredif'] = {
			dependentproperty: options.params['dependentproperty'],
			targetvalue: options.params['targetvalue']
		};
		options.messages['requiredif'] = options.message;
	}
);

$.validator.setDefaults({ ignore: '' });

$pl.validationStatus = false;

$.validator.setDefaults({

	// Highlight Event
	highlight: function (element) {

		$pl.highlightCount++;

		var $element = $(element),
			elemId =   $element.attr('id');

		if ($pl.composites[elemId] == null) {

			$(element)
				.addClass($pl.errorClass)
				.removeClass($pl.validClass)
				.closest('fieldset')
				.addClass($pl.errorClass)
				.removeClass($pl.validClass)
				.trigger('validateChange');

			$('label[for="' + elemId + '"]').addClass($pl.errorClass).removeClass($pl.validClass);
		}
		else {
			$(element).closest('fieldset').addClass($pl.errorClass).removeClass($pl.validClass).trigger('validateChange');
		}

		$(element).closest('fieldset').addClass($pl.errorClass).removeClass($pl.validClass);

		$pl.validationStatus = false;
	},
	// UnHighlight Event
	unhighlight: function (element) {
		var $element = $(element),
			elemId =   $element.attr('id');

		$element
			.removeAttr('title')
			.removeClass($pl.errorClass).addClass($pl.validClass)
			.closest('fieldset')
			.addClass($pl.validClass)
			.removeClass($pl.errorClass)
			.trigger('validateChange');

		if (!$(element).closest('fieldset').find('.' + $pl.errorClass).length) {
			$(element).closest('fieldset').addClass($pl.validClass).removeClass($pl.errorClass);
		}

		$('label[for="' + elemId + '"]').removeClass($pl.errorClass).addClass($pl.validClass);

		$pl.validationStatus = true;
	},
	// On Focus Out Event
	onfocusout: function (element, event) {
	    if (element.getAttribute('pl-trimWhiteSpace')) {
	        if (!this.checkable(element) && (element.name in this.submitted || !this.optional(element))) {
			    this.element(element);
		    }
		    if (element.tagName === "TEXTAREA" || (element.tagName === "INPUT" && element.type !== "password") && element.type !== "file") {
		        element.value = $.trim(element.value);
		    }
	    }
			$(element).valid();
	},
	// On Key Up Event
	onkeyup: function (element, event) {
	    if (element.getAttribute('pl-trimWhiteSpace')) {
		    if (event.which === 9 && this.elementValue(element) === "") {
			    return;
		    } else if (element.name in this.submitted || element === this.lastElement) {
			    this.element(element);
		    }
		    if (element.tagName === "TEXTAREA" || (element.tagName === "INPUT" && element.type !== "password") && element.type !== "file") {
		        element.value = element.value.replace(/^\s+/, "");
		    }
		}
	},
	// On Click Event
	onclick: function (element) {
		// Click On Selects, Radio Buttons And Checkboxes
		if (element.name in this.submitted && !$(element).is("select")) {
			this.element(element);
		}
		// Or Option Elements, Check Parent Select In That Case
		else if (element.parentNode.name in this.submitted) {
			this.element(element.parentNode);
		}
	},

	// Keeps Mobile From Scrolling To First Null Input On Validation
	focusInvalid: false
});

$pl.customValidation = function (form) {
	"use strict";

	// Variable Declarations
	var date3fields =  form.find('div[data-id=date3fields]'),
		phone3fields = form.find('div[data-id=phone3fields]');

	date3fields.each(function () {

		$pl.days = { 1: 31, 2: 29, 3: 31, 4: 30, 5: 31, 6: 30, 7: 31, 8: 31, 9: 30, 10: 31, 11: 30, 12: 31 };

		// Variable Declarations
		var thisDate =   $(this),
			hiddenDate = thisDate.find('input[data-id=hiddenDate]'),
			dMonth =     thisDate.find('div[data-id=month]').find('select'),
			dDay =       thisDate.find('div[data-id=day]').find('select'),
			dYear =      thisDate.find('div[data-id=year]').find('select'),
			boundDate =  hiddenDate.val().split(' ')[0],
			dates =      hiddenDate.val().split('/'),
			currMonth =  $pl.days[dMonth.val()], dayList = [];

		$pl.composites[hiddenDate.attr('id')] = true;

		if (boundDate != null && boundDate != '' && boundDate != '1/1/0001') {
			dates[2] = dates[2].split(' ')[0];

			dMonth.find('option').filter(
				function () {
					return $(this).text() == dates[0] || $(this).val() == dates[0];
				}
			).attr('selected', true);

			dDay.find('option').filter(
				function () {
					return $(this).text() == dates[1] || $(this).val() == dates[1];
				}
			).attr('selected', true);

			dYear.find('option').filter(
				function () {
					return $(this).text() == dates[2] || $(this).val() == dates[2];
				}
			).attr('selected', true);
		}

		$pl.dayList = dDay.find('option');

		// On Change Event - Date Month
		dMonth.on('change', function () {
			currMonth = $pl.days[dMonth.val()], dayList = [];

			for (var i = 0; i < currMonth + 1; i++) {
				dayList.push('<option value="' + i + '">' + i + '</option>');
			}

			dayList[0] = $pl.dayList[0];

			dDay.html(dayList).trigger('change');
		});

		// Focus/Click/Change/Keyup Event - Month, Day and Year
		dMonth.add(dDay).add(dYear).on('focusin focusout click change keyup', function () {
			hiddenDate.val(dMonth.val() + '/' + dDay.val() + '/' + dYear.val());

			if (!hiddenDate.val().isValidDate('M/d/yyyy') && !hiddenDate.val().isValidDate('MM/dd/yyyy')) {
				hiddenDate.val('1/1/0');
			}

			window.setTimeout(function () {
				// Do This In Timeout To Allow Skipping Over Form Focus
				form.validate().element(hiddenDate);
			}, 100);
		});

		if ($pl.customFields) {
			dMonth.add(dDay).add(dYear).each(function () {
				$(this).parent().find('.select').html($(this).find('option:selected').text());
			});
		}

		if (hiddenDate.hasClass($pl.errorClass)) {
			hiddenDate.parent('div').addClass($pl.errorClass);
		}
	});

	phone3fields.each(function () {

		// Variable Declarations
		var thisPhone =   $(this),
			inited =      $(this).attr('inited'),
			hiddenPhone = thisPhone.find('input[data-id=hiddenPhone]'),
			p_areacode =  thisPhone.find('div[data-id=p_areacode]').find('input'),
			p_prefix =    thisPhone.find('div[data-id=p_prefix]').find('input'),
			p_suffix =    thisPhone.find('div[data-id=p_suffix]').find('input'),
			elemId =      hiddenPhone.attr('id');

		if (inited != 'true') {
			thisPhone.attr('inited', 'true');

			$pl.composites[hiddenPhone.attr('id')] = true;

			if (hiddenPhone.val() != "") {
				try {
					p_areacode.val(hiddenPhone.val().replace(/[^\d]/g, '').substr(0, 3));
					p_prefix.val(hiddenPhone.val().replace(/[^\d]/g, '').substr(3, 3));
					p_suffix.val(hiddenPhone.val().replace(/[^\d]/g, '').substr(6, 4));
				} catch (err) {
					//console.log(err);
				}
			}

			p_areacode.add(p_prefix).add(p_suffix).on('keyup', function () {
				p_areacode.val(p_areacode.val().replace(/[^0-9]/g, '')).trigger('change');
				p_prefix.val(p_prefix.val().replace(/[^0-9]/g, '')).trigger('change');
				p_suffix.val(p_suffix.val().replace(/[^0-9]/g, '')).trigger('change');
			});

			p_areacode.add(p_prefix).add(p_suffix).on('focusin focusout click keyup change blur', function (e) {
				hiddenPhone.val(p_areacode.val() + p_prefix.val() + p_suffix.val());

				if (!isCompositeActive(hiddenPhone)) {
					window.setTimeout(function () {
						// Do This In Timeout To Allow Skipping Over Form Focus
						form.validate().element(hiddenPhone);
					}, 100);
				}
			});
		}
	});
};

function isCompositeActive(element) {
	var active = false;
	$('input', $(element).parent('div')).each(function (x) {
		if ($(document.activeElement).attr('id') == $(this).attr('id')) {
			active = true;
		}
	});

	return active;
}

var formSubmit = [];

$(function () {
	// Variable Declarations
	var htmlBody =     $('html,body'),
		forms =        $('form'),
		captchaField = $('#captcha-value'),
		valBox =       $("#valBox"),
		valBox2 =      $('#valBox2'),
		valSumValid =  $('.validation-summary-valid');

	// Initialize Form Validation If Form Is Present
	if (forms) {
		forms.each(function () {
			var thisForm = $(this);
			$pl.customValidation(thisForm);

			var thisForm = $(this);

			$pl.customValidation(thisForm);

			if ($('.' + $pl.errorClass).length) {
				captchaField.val('').parent('div').addClass('input-validation-error');
				captchaField.focus();
				valSumValid.removeClass('validation-summary-valid').addClass('validation-summary-errors');
				$pl.postbackError();
			}
		});
	}
	forms.submit(function () {
		// Upon Submit - Form Is Valid
		if ($(this).valid()) {
			if (formSubmit[$(this)]) {
				return false;
			}

			formSubmit[$(this)] = true;

			return true;
		}
		// Upon Submit - Form Is Not Valid - Before PostBack Error
		else {
			// Duplicates #valBox Into #valBox2, If #valBox2 Is Present - For Z-Index Creative Issues
			if (valBox2.length > 0) {
				valBox2.html(valBox.html());
				valBox2.show();
				valBox.hide();
			}
		}
		formSubmit[$(this)] = false;

		// Scroll To Top If Invalid
		htmlBody.scrollTop(0);

		// Scroll To Top Of FB Tab If Invalid And In Facebook
		if (typeof FB != 'undefined' && FB.Canvas) {
			FB.Canvas.scrollTo(0, 0);
		}

		return false;
	});
});

// Prevent Duplicates In The ValidationSummary
$(document).ready(function () {
	var listItemText =      '',
		itemsToRemoveList = [];

	$('.validation-summary-errors li').each(function () {
		var text = $(this).text();

		if (listItemText.indexOf('|' + text + '|') == -1) {
			listItemText += '|' + text + '|';
		} else {
			itemsToRemoveList.push($(this));
		}
	});

	$(itemsToRemoveList).each(function () {
		$(this).remove();
	});
});