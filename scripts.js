$(document).ready(function(){
	
	function generateBoard() {
		// Score possibilities
		scores = new Array('2000','2000','1000','1000','1000','500','500','500','300','300','300','200','200','200','200','200','100','100','100','100','100','100','0','0');
		$('a.score').each(function(){
			// pick a random score from the array
			var rand = Math.floor(Math.random() * (scores.length-1));
			$(this).html(scores[rand]);
			scores.splice(rand,1);
		});
	}
	
	function updateScore() {
		var team1_score = 0;
		var team2_score = 0;
		$('a.score').each(function(){
			if ($(this).hasClass('team1') && !isNaN($(this).text())) team1_score = team1_score + parseFloat($(this).text());
			else if ($(this).hasClass('team2') && !isNaN($(this).text())) team2_score = team2_score + parseFloat($(this).text());
		});
		$('#team1 .team_score').text(team1_score);
		$('#team2 .team_score').text(team2_score);
	}
	
	// Square (Letter) click
	$('.square a.number').click(function(){
		// reveal the points
		var scoreblock = $(this).parent().children('a.score');
		
		$(this).fadeOut(function(){
			scoreblock.css('display','block').css('opacity','0.0');
			scoreblock.animate({opacity:1},500);
		});
		// add appropriate class for background color
		scoreblock.addClass($('.currentteam').attr('id'));
		
		// add score to appropriate team
		updateScore();
	});
	
	$('.square a.score').click(function(){
		// hide and remove team class
		$(this).hide().removeClass('team1').removeClass('team2');
		
		// show the letter
		$(this).parent().children('a.number').show();
		
		// add score to appropriate team
		updateScore();
	});
	
	// Set current team
	$('.team').click(function(){
		$('.team').removeClass('currentteam').css('opacity','1.0');
		$(this).addClass('currentteam');
	});
	
	// Document keystrokes
	// elements that can be clicked and their corresponding keyCodes
	var triggers = new Array();
	triggers['49'] = 'team1';
	triggers['50'] = 'team2';
	triggers['97'] = 'square-a';
	triggers['98'] = 'square-b';
	triggers['99'] = 'square-c';
	triggers['100'] = 'square-d';
	triggers['101'] = 'square-e';
	triggers['102'] = 'square-f';
	triggers['103'] = 'square-g';
	triggers['104'] = 'square-h';
	triggers['105'] = 'square-i';
	triggers['106'] = 'square-j';
	triggers['107'] = 'square-k';
	triggers['108'] = 'square-l';
	triggers['109'] = 'square-m';
	triggers['110'] = 'square-n';
	triggers['111'] = 'square-o';
	triggers['112'] = 'square-p';
	triggers['113'] = 'square-q';
	triggers['114'] = 'square-r';
	triggers['115'] = 'square-s';
	triggers['116'] = 'square-t';
	triggers['117'] = 'square-u';
	triggers['118'] = 'square-v';
	triggers['119'] = 'square-w';
	triggers['120'] = 'square-x';

	$(document).keypress(function(event){
		var code = event.which ? event.which : event.keyCode;
		
		// trigger the click handler for the appropriate element if it exists
		if (code == 49 || code == 50) $('#' + triggers[code]).click();
		else if (97 <= code && code <= 120) {
			if ($('#' + triggers[code] + ' a.number').css('display') == 'none') {
				$('#' + triggers[code] + ' a.score').click();
			} else {
				$('#' + triggers[code] + ' a.number').click();
			}
		}
		else if (code == 61 || code == 43) {
			if ($('#triple').hasClass('active')) return;
			if ($('#double').hasClass('active')) $('#triple').click();
			else $('#double').click();
		}
	});
	
	// Double and Triple points
	$('#double').click(function() {
		if ($(this).hasClass('active')) return;
		if ($('#triple').hasClass('active')) {
			$('.square a.score').each(function(){
				if (!$(this).hasClass('team1') && !$(this).hasClass('team2')) {
					var score = parseFloat($(this).text());
					score = Math.round((score / 3) * 2);
					$(this).text(score);
				}
			});
		} else {
			$('.square a.score').each(function(){
				if (!$(this).hasClass('team1') && !$(this).hasClass('team2')) {
					var score = parseFloat($(this).text());
					score = Math.round(score * 2);
					$(this).text(score);
				}
			});	
		}
		$(this).addClass('active');
		$('#triple').removeClass('active');
	});
	
	$('#triple').click(function() {
		if ($(this).hasClass('active')) return;
		if ($('#double').hasClass('active')) {
			$('.square a.score').each(function(){
				if (!$(this).hasClass('team1') && !$(this).hasClass('team2')) {
					var score = parseFloat($(this).text());
					score = Math.round((score / 2) * 3);
					$(this).text(score);
				}
			});
		} else {
			$('.square a.score').each(function(){
				if (!$(this).hasClass('team1') && !$(this).hasClass('team2')) {
					var score = parseFloat($(this).text());
					score = Math.round(score * 3);
					$(this).text(score);
				}
			});	
		}
		$(this).addClass('active');
		$('#double').removeClass('active');
	});
	
	// on game load, generate new random board
	generateBoard();
	
});