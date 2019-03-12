
const myApp =(function() {
	const canvas = document.querySelector('#game');
	const ctx = canvas.getContext('2d');

	canvas.width = 1000;
	canvas.height = 500;

	const cw = canvas.width;
	const ch = canvas.height;

	let ballx = cw/2+3;
	let bally = ch/2-3;

	const racketH = 70;
	const racketW = 6;

	let racketPlayerx = 70;
	let racketPlayery = ch/2-35;

	let racketAipx = cw-racketH;
	let racketAipy = ch/2-35;

	let timePlay = 1;
	let ballSpeedx = 3;
	let ballSpeedy = 3 ;

	let playerY = racketPlayery;

	let aipSpeed = 2;

	let playerPoints = 0;
	let aiPoints = 0;

	let speedUp = 1;

	const gameArea = function(){
		ctx.fillStyle = 'green';
		ctx.fillRect(0, 0, cw, ch);
	}

	const ball = function(){
		ctx.fillStyle = 'white';
		ctx.fillRect(ballx, bally, 6 ,6);

		ballx += ballSpeedx;
		bally += ballSpeedy;
		
		if((ballx <= racketPlayerx+racketW && ballx > racketPlayerx && bally>racketPlayery && bally<racketPlayery+70) ||
			(ballx >= racketAipx-10 && ballx <= racketAipx +racketW+2 && bally>racketAipy && bally<racketAipy+70))
		{		
				ballSpeedx = -ballSpeedx;
				speedUp += 1	

				switch (speedUp){
					case 5:
						(ballSpeedx > 0) ? ballSpeedx += 1 : ballSpeedx -= 1;
						(ballSpeedy > 0) ? ballSpeedy += 1 : ballSpeedy -= 1;
					break;
					case 10:
						(ballSpeedx > 0) ? ballSpeedx += 1 : ballSpeedx -= 1;
						(ballSpeedy > 0) ? ballSpeedy += 1 : ballSpeedy -= 1;
					break;
					case 15:
						(ballSpeedx > 0) ? ballSpeedx += 1 : ballSpeedx -= 1;
						(ballSpeedy > 0) ? ballSpeedy += 1 : ballSpeedy -= 1;
					break;
					case 20:
						(ballSpeedx > 0) ? ballSpeedx += 1 : ballSpeedx -= 1;
						(ballSpeedy > 0) ? ballSpeedy += 1 : ballSpeedy -= 1;
					break;
				}			
		}else
			{
				if(bally >= ch-6){
				ballSpeedy = -ballSpeedy;
			}
			else if(ballx >= cw-6){
				ballx = cw/2+3;
				bally = ch/2-3;
				playerPoints += 1;
				$('#playerPoints').text(playerPoints);	
			}
			else if(bally <= 0){
				ballSpeedy = -ballSpeedy;
			}
			else if(ballx <= 0){
				ballx = cw/2+3;
				bally = ch/2-3;
				aiPoints += 1;	
				$('#aiPoints').text(aiPoints);
			}		
		}
 
}

	const whoWin = function(){
		if(playerPoints==10)
		{
			clearInterval(game);
			$("#canvasDiv").hide();
			$("#buttonStartGameDiv").show();
			$("#buttonStartGame").hide();
			$("#buttonWinGame").text("wygrałeś zagraj ponownie");
			$("#buttonWinGame").show();
			
		}
		else if(aiPoints==10)
		{
			clearInterval(game);
			$("#canvasDiv").hide();
			$("#buttonStartGameDiv").show();
			$("#buttonStartGame").hide();
			$("#buttonWinGame").text("Przegrałeś zagraj ponownie");
			$("#buttonWinGame").show();
		}
	}

	const racketPlayer = function (element) {
		ctx.fillStyle = 'white';
		ctx.fillRect(racketPlayerx, racketPlayery, racketW ,racketH);

		racketPlayery = playerY;
		if(racketPlayery<=0)
		{
			racketPlayery = 0;
		}
		else if(racketPlayery>=ch-racketH)
		{
			racketPlayery = ch-racketH;
		}
	}


	const aip = function (element) {
		ctx.fillStyle = 'white';
		ctx.fillRect(racketAipx, racketAipy, racketW ,racketH);
	}

	const aipMotion = function () {
		const racketCenter = racketAipy + racketH/2;
		const ballCenter = bally;

		if(ballx>500)
		{
			if(racketCenter-ballCenter>200)
			{
				racketAipy -= 14;
			}
			else if(racketCenter-ballCenter<-200)
			{
				racketAipy += 14;
			}
	
			if(racketCenter-ballCenter>30 && racketCenter-ballCenter<200)
			{
				racketAipy -= 8;
			}
			else if(racketCenter-ballCenter<-30 && racketCenter-ballCenter> -200)
			{
				racketAipy += 8;
			}
			if(racketCenter-ballCenter>20 && racketCenter-ballCenter<30)
			{
				racketAipy -= 2;
			}
			else if(racketCenter-ballCenter<20 && racketCenter-ballCenter> -30)
			{
				racketAipy += 2;
			}
		}

		if(racketAipy<=0) 
		{
			racketAipy=0;
		}
		else if(racketAipy>=ch-racketH)
		{
			racketAipy = ch-racketH;
		}	
	}

	const player = function(element){
		playerY = element-canvas.getBoundingClientRect().top-35;

	}


	const game = function(){
		const interval = setInterval(function(){
			if(playerPoints<10 && aiPoints<10)
			{
				gameArea();
				ball();
				racketPlayer();
				aipMotion();
				aip();
				whoWin();
			}
			else if(playerPoints==10 || aiPoints==10){
				clearInterval(interval);
			}	
		}, 1000/60);
		
	}

	return {
		game : game,
		canvas : canvas,
		player : player,
	};

})(); 


document.addEventListener("DOMContentLoaded", function(event) {
	$("#canvasDiv").hide();
	$("#buttonWinGame").hide();

	$('#buttonStartGame').on('click', function(){
		$("#buttonStartGameDiv").hide();
		$("#canvasDiv").show();
		myApp.game();
	});

	$('#buttonWinGame').on('click', function(){
		location.reload();
		$("#buttonWinGame").hide();
		myApp.game();
	});

});
	

myApp.canvas.addEventListener("mousemove", function(event) {
	myApp.player(event.clientY);
});


