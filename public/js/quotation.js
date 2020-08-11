!function(){
	try{
		var submit_button = document.querySelector("#submit-container button");
		var token = document.querySelector('meta[name="csrf-token"]').getAttribute('content');

		var ajax_call = function(){
			var xhttp = new XMLHttpRequest();

			xhttp.onreadystatechange = function() {
				if (this.readyState == 4 && this.status == 200) {
			    	console.log(this.responseText);
			    }
			}

			xhttp.open("POST", "/quotation/request", true);
			xhttp.setRequestHeader('CSRF-Token', token);
			xhttp.setRequestHeader('Content-Type', 'application/json');
			xhttp.send(JSON.stringify({"a": 3}));
		}

		submit_button.onclick = function(event){
			event.preventDefault();

			ajax_call();
		}
	}catch(error){}
}();