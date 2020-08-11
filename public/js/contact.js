!function(){
	try{
		var submit_button = document.querySelector("#submit-container button");
		var token = document.querySelector('meta[name="csrf-token"]').getAttribute('content');
		var obligatory_inputs = document.querySelectorAll("#email, textarea");
		var pure_inputs = document.querySelectorAll(".form-fields-section input");
		var inputs = document.querySelectorAll(".form-fields-section input, textarea");
		var feedback_message = document.querySelector("#status-message");
		var error_text = "Desculpe, mas você preencheu algum(ns) campo(s) de forma invalida, poderia rever?";
		var success_text = "Sua mensagem foi enviada com sucesso! Muito obrigado!";
		var subject = document.querySelectorAll("option");

		var subject_identifier = function(){
			for (var i = 0; i < subject.length; i++) {
				if(subject[i].selected){
					return subject[i].value;
				}
			}
		}

		var ajax_call = function(_data){
			var xhttp = new XMLHttpRequest();

			xhttp.onreadystatechange = function() {
				if (this.readyState == 4 && this.status == 200) {
					if (this.responseText == "successful") {
						form_submission_feedback_style_manager("success", this.responseText);
					}else{
						form_submission_feedback_style_manager("failed", this.responseText);
					}
			    }
			}

			xhttp.open("POST", "/contact/request", true);
			xhttp.setRequestHeader('CSRF-Token', token);
			xhttp.setRequestHeader('Content-Type', 'application/json');
			xhttp.send(JSON.stringify(_data));

			form_inputs_cleaning();
			grecaptcha.reset();
		}

		var form_verification = function(){
			var email_regex = /^[a-z0-9áéíóúçâêôã]{1,22}((-|_|\.)[0-9a-záéíóúçâêôã]{2,16}){0,3}@([a-z]{2,8})(\.[a-z]{2,8}){1,3}$/;
			var message_regex = /^.{10,1500}$/;
			var regex_for_all = /^.{0,40}$/;
			var regexes = [email_regex, message_regex];
			var state_flag = true;

			inputs_style_blank_apply();

			for (var i = 0; i < regexes.length; i++) {
				if (!regexes[i].test(obligatory_inputs[i].value)) {
					state_flag = false;

					//styling for failed input attempt
					obligatory_inputs[i].style.borderColor = "red";
				}
			}

			for (var i = 0; i < pure_inputs.length; i++) {
				if (!regex_for_all.test(pure_inputs[i].value)) {
					state_flag = false;

					//styling for failed input attempt
					pure_inputs[i].style.borderColor = "red";
				}
			}

			// verifies gcaptcha

			if(!grecaptcha.getResponse()){
				form_submission_feedback_style_manager("error", "Você não completou a verificação do gcaptcha.");
				state_flag = false;
			}

			if(state_flag){
				return true;
			}
		}

		var inputs_style_blank_apply = function(){
			for (var i = 0; i < inputs.length; i++) {
				inputs[i].style.borderColor = "white";
			}

			feedback_message.style.visibility = "hidden";
			feedback_message.style.opacity = "0";
		}

		var form_submission_feedback_style_manager = function(state, opt_msg){
			feedback_message.style.visibility = "visible";
			feedback_message.style.opacity = "1";

			if(state == "success"){
				feedback_message.innerText = opt_msg || success_text;
			}else{
				feedback_message.innerText = opt_msg || error_text;
			}
		}

		var form_inputs_cleaning = function(){
			for (var i = 0; i < inputs.length; i++) {
				inputs[i].value = "";
			}
		}

		submit_button.onclick = function(event){
			event.preventDefault();

			if (form_verification()) {
				var data = {
					"name": inputs[0].value || "",
					"surname": inputs[1].value || "",
					"email": inputs[2].value || "",
					"tel_country_code": inputs[3].value || "",
					"tel_ddd": inputs[4].value || "",
					"tel_number": inputs[5].value || "",
					"message": inputs[6].value || "",
					"subject": subject_identifier(),
					"gtoken": grecaptcha.getResponse()
				};

				ajax_call(data);
			}
		}
	}catch(error){}
}();