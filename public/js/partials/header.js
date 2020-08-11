!function(){

	// Mobile Navigation toggling 
	var mob_nav_list = document.querySelector("nav ul");
	var mob_nav_ul_li = document.querySelectorAll("nav ul li");
	var mob_close_toggler = document.querySelector("#mob-close-toggler");
	var header_mob_toggler = document.querySelector("#header-mob-toggler");

	header_mob_toggler.addEventListener("click", function(){
		mob_nav_list.style.width = "240px";
		mob_nav_list.style.padding = "20px";

		setTimeout(function(){
			for (var i = 0; i < mob_nav_ul_li.length; i++) {
				mob_nav_ul_li[i].style.display = "block";
			}
		}, 600);
	});

	mob_close_toggler.addEventListener("click", function(){
		for (var i = 0; i < mob_nav_ul_li.length; i++) {
			mob_nav_ul_li[i].style.display = "none";
		}

		mob_nav_list.style.width = "0px";
		mob_nav_list.style.padding = "0px";
	});
}();