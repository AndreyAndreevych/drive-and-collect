var roadArrey = [[], [], [], []];
var currentCarPosition = 0;
var scoreCoin = 0;
var time = 300;
var move;

function init() {
	$.each(roadArrey, function(line_index, line) {
		for(var i = 0; i < 15; i++) {
			line.push(0);
		}
	});
	reBuild();
	start();
	carPosition();
	visibility();
	sound();
}

function reinit() {
	roadArrey = [[], [], [], []];
	currentCarPosition = 0;
	scoreCoin = 0;
	time = 300;
	$("#car").removeClass();
	$("#car").addClass("car_position_index_" + currentCarPosition);
	$("#fire").removeClass();
  	$("#fire").addClass("car_position_index_" + currentCarPosition);
  	$("#fire").css("display", "none");
	$("#score").text("0");
	$.each(roadArrey, function(line_index, line) {
		for(var i = 0; i < 15; i++) {
			line.push(0);
		}
	});
	if ($(".panel_hp-heart").length == 4) {
		$("<div/>", {
    		class: "panel_hp-heart"
		}).appendTo("#panel_hp");
	}
	if ($(".panel_hp-heart").length == 3) {
		$("<div/>", {
    		class: "panel_hp-heart"
		}).appendTo("#panel_hp");
		$("<div/>", {
    		class: "panel_hp-heart"
		}).appendTo("#panel_hp");
	}
	if ($(".panel_hp-heart").length == 2) {
		$("<div/>", {
    		class: "panel_hp-heart"
		}).appendTo("#panel_hp");
		$("<div/>", {
    		class: "panel_hp-heart"
		}).appendTo("#panel_hp");
		$("<div/>", {
    		class: "panel_hp-heart"
		}).appendTo("#panel_hp");
	}
	if ($(".panel_hp-heart").length == 1) {
		$("<div/>", {
    		class: "panel_hp-heart"
		}).appendTo("#panel_hp");
		$("<div/>", {
    		class: "panel_hp-heart"
		}).appendTo("#panel_hp");
		$("<div/>", {
    		class: "panel_hp-heart"
		}).appendTo("#panel_hp");
		$("<div/>", {
    		class: "panel_hp-heart"
		}).appendTo("#panel_hp");
	}
	if ($(".panel_hp-heart").length == 0) {
		$("<div/>", {
    		class: "panel_hp-heart"
		}).appendTo("#panel_hp");
		$("<div/>", {
    		class: "panel_hp-heart"
		}).appendTo("#panel_hp");
		$("<div/>", {
    		class: "panel_hp-heart"
		}).appendTo("#panel_hp");
		$("<div/>", {
    		class: "panel_hp-heart"
		}).appendTo("#panel_hp");
		$("<div/>", {
    		class: "panel_hp-heart"
		}).appendTo("#panel_hp");
	}
	reBuild();
	start();
	carPosition();
}

function reBuild() {
	$.each(roadArrey, function(line_index, line) {
		$.each(line, function(cell_index, cell) {
			var id = "#line_" + line_index + "_cell_" + cell_index;
			$(id).removeClass();
			$(id).addClass('cell_type_' + cell);
		});
	});
	score();
} 

function getRandom() {
   var num = Math.random();
   if(num < 0.60) return 0;
   else if(num < 0.73) return 1;
   else if(num < 0.86) return 2;
   else if(num < 0.99) return 3;
   else return 4;
}

function start () {
	$('html').keydown(function(ev){
  		if (ev.keyCode == 13) {
    		timeout();
    		$("#start-page").css("display", "none");
    		$("#car").css("left", "1.6%");
  		}
	});
}

function timeout () {
	move = setTimeout(function() {
		timer1();
		switch (scoreCoin) {
			case 10:
				time = 275;
				$("#fire").css("display", "block");
				break;
			case 20:
				time = 250;
				break;
			case 30:
				time = 225;
				break;
			case 40:
				time = 200;	
				break;
			case 50:
				time = 175;	
				break;
			case 60:
				time = 150;	
				break;
			case 70:
				time = 125;	
				break;
			case 80:
				time = 100;	
				break;					
			default:
				break;
		}
	}, time);
}

function stop () {
	clearTimeout(move);
	endGame();
}

function carPosition () {
	$('html').keydown(function(ev){
  		switch (ev.keyCode) {
  			case 38:
  				if (currentCarPosition !== 0) currentCarPosition--;
  				$("#car").removeClass();
  				$("#car").addClass("car_position_index_" + currentCarPosition);
  				$("#fire").removeClass();
  				$("#fire").addClass("car_position_index_" + currentCarPosition);
  				break;	
  			case 40:
  				if (currentCarPosition !== 3) currentCarPosition++;
  				$("#car").removeClass();
  				$("#car").addClass("car_position_index_" + currentCarPosition);
  				$("#fire").removeClass();
  				$("#fire").addClass("car_position_index_" + currentCarPosition);
  				break;	
  		}
	});
}

function timer1 () {
	roadArrey[0].shift();
	roadArrey[1].shift();
	roadArrey[2].shift();
	roadArrey[3].shift();
	roadArrey[0].push(getRandom());
	roadArrey[1].push(getRandom());
	roadArrey[2].push(getRandom());
	roadArrey[3].push(getRandom());
	timeout();
	checkCombination();
	reBuild();
}

function checkCombination() {
	if((roadArrey[0][14] == roadArrey[1][14]) && (roadArrey[0][14] == roadArrey[2][14]) && (roadArrey[0][14] == roadArrey[3][14]) && (roadArrey[1][14] == roadArrey[2][14]) && (roadArrey[1][14] == roadArrey[3][14]) && (roadArrey[2][14] == roadArrey[3][14])) {
		roadArrey[0][14] = 0;
		roadArrey[1][14] = 0;
		roadArrey[2][14] = 0;
		roadArrey[3][14] = 0;
	}
	var blockArray = [];
	for (var i = 0; i <= 3; i++) {
		if(roadArrey[i][13] == 2 || roadArrey[i][13] == 3)
		blockArray.push(i);
	}
	$.each(blockArray, function(block_index, block) {
		switch (block) {
			case 0:
				roadArrey[0][14] = 0;
				roadArrey[1][14] = 0;
				break;
			case 1:
				roadArrey[1][14] = 0;
				roadArrey[2][14] = 0;
				roadArrey[0][14] = 0;
				break;
			case 2:
				roadArrey[2][14] = 0;
				roadArrey[3][14] = 0;
				roadArrey[1][14] = 0;
				break;
			case 3:
				roadArrey[3][14] = 0;
				roadArrey[2][14] = 0;
				break;			
		}
	});			
}

function score () {
	switch (roadArrey[currentCarPosition][0]) {
		case 1:
			scoreCoin++;
			$("#score").text(scoreCoin);
			break;
		case 2:
			stop();
			$("html").off("keydown");
			break;
		case 3:
			$("#panel_hp").find("div:last-child").remove();
			if (($("div").is(".panel_hp-heart")) == false) {
				stop();
			}
			break;
		case 4:
			if ($(".panel_hp-heart").length < 5) {
				$("<div/>", {
    				class: "panel_hp-heart"
				}).appendTo("#panel_hp");
			}
			break;					
	}
}

function visibility () {
	window.timerId2 = window.setInterval(timer2, 400);
}

function timer2 () {
	$("#inscription_start").toggleClass("visible");
}

function endGame () {
	$("#end-page").css("display", "block");
	var result = $("#score").text();
	$("#end_coins").text(result);
}

function restart () {
	$("#end-page").css("display", "none");
	$("#start-page").css("display", "block");
	reinit();
}

function sound () {
	$(".sound").on("click", function () {
		if ($(".sound").hasClass('mute')) {
			$(".sound").removeClass('mute');
			$("#iframeAudio").attr({
				"src" : "css/audio/nazad-v-buduschee-ost-tadam-tadadam-tadadam.mp3"
			});
		}
		else {
			$(".sound").addClass('mute');
			$("#iframeAudio").removeAttr('src');
		}
	});
}

$(function() {
	init();
});