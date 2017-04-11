const WIDTH = 800;
const HEIGHT = 600;

const ACC = 0.10;

$(function(){
	var app = new PIXI.Application(WIDTH, HEIGHT, { antialias: true });
	app.renderer.backgroundColor = 0xAAAAAA;
	app.stage.interactive = true;

	document.body.appendChild(app.view);

	console.log("App: ", app);

	var playerCircle = new PIXI.Graphics();

	// Player Attributes
	playerCircle.x = WIDTH / 2;
	playerCircle.y = HEIGHT / 2;
	playerCircle.acc = { x: 0, y: 0};
	playerCircle.vel = { x: 0, y: 0};
	playerCircle.radius = 10;

	// Initial Player Rendering
	playerCircle.beginFill(0xFF0000, 0.5);
	playerCircle.drawCircle(0, 0, playerCircle.radius);
	playerCircle.endFill();

	console.log(playerCircle);
	// Keyboard Controls
	setupKeyboardControls();

	var speedParams = new PIXI.Text("Acc: (" + playerCircle.acc.x.toFixed(2) + ", " + playerCircle.acc.y.toFixed(2) + "); Vel: (" + playerCircle.vel.x.toFixed(2) + ", " + playerCircle.vel.y.toFixed(2) + ")");
	console.log(speedParams);

	app.stage.addChild(playerCircle);
	app.stage.addChild(speedParams);

	app.ticker.add(function(){
		updateBoidLogic([playerCircle]);
		renderBoid([playerCircle]);
		speedParams.text = "Coord: (" + playerCircle.x.toFixed(2) +", " + playerCircle.y.toFixed(2) +"); Acc: (" + playerCircle.acc.x.toFixed(2) + ", " + playerCircle.acc.y.toFixed(2) + "); Vel: (" + playerCircle.vel.x.toFixed(2) + ", " + playerCircle.vel.y.toFixed(2) + ")";
		// console.log(playerCircle);
	});

	function setupKeyboardControls(){
	var left = keyboard(KEY_LEFT),
		right = keyboard(KEY_RIGHT),
		up = keyboard(KEY_UP),
		down = keyboard(KEY_DOWN);

	left.press = function(){
		if(right.isDown){
			playerCircle.acc.x = 0;
			if(playerCircle.acc.y != 0){
				let sign = playerCircle.acc.y > 0 ? 1 : -1;
				playerCircle.acc.y /= playerCircle.acc.y * sign;
				playerCircle.acc.y *= ACC;
			}
		}else if(playerCircle.acc.y != 0){
			let diag = Math.sqrt(ACC * ACC /2);
			let sign = (playerCircle.acc.y > 0) ? 1 : -1;
			playerCircle.acc.y /= playerCircle.acc.y * sign;
			playerCircle.acc.y *= diag;
			playerCircle.acc.x = -diag;
		}else{
			playerCircle.acc.x = -ACC;
		}
	};
	right.press = function(){
		if(left.isDown){
			playerCircle.acc.x = 0;
			if(playerCircle.acc.y != 0){
				let sign = playerCircle.acc.y > 0 ? 1 : -1;
				playerCircle.acc.y /= playerCircle.acc.y * sign;
				playerCircle.acc.y *= ACC;
			}
		}else if(playerCircle.acc.y != 0){
			let diag = Math.sqrt(ACC * ACC /2);
			let sign = (playerCircle.acc.y > 0) ? 1 : -1;
			playerCircle.acc.y /= playerCircle.acc.y * sign;
			playerCircle.acc.y *= diag;
			playerCircle.acc.x = diag;
		}else{
			playerCircle.acc.x = ACC;
		}
	};
	up.press = function(){
		if(down.isDown){
			playerCircle.acc.y = 0;
			if(playerCircle.acc.x != 0){
				let sign = playerCircle.acc.x > 0 ? 1 : -1;
				playerCircle.acc.x /= playerCircle.acc.x * sign;
				playerCircle.acc.x *= ACC;
			}
		}else if(playerCircle.acc.x != 0){
			let diag = Math.sqrt(ACC * ACC /2);
			let sign = (playerCircle.acc.x > 0) ? 1 : -1;
			playerCircle.acc.x /= playerCircle.acc.x * sign;
			playerCircle.acc.x *= diag;
			playerCircle.acc.y = -diag;
		}else{
			playerCircle.acc.y = -ACC;
		}
	};
	down.press = function(){
		if(up.isDown){
			playerCircle.acc.y = 0;
			if(playerCircle.acc.x != 0){
				let sign = playerCircle.acc.x > 0 ? 1 : -1;
				playerCircle.acc.x /= playerCircle.acc.x * sign;
				playerCircle.acc.x *= ACC;
			}
		}else if(playerCircle.acc.x != 0){
			let diag = Math.sqrt(ACC * ACC /2);
			let sign = (playerCircle.acc.x > 0) ? 1 : -1;
			playerCircle.acc.x /= playerCircle.acc.x * sign;
			playerCircle.acc.x *= diag;
			playerCircle.acc.y = diag;
		}else{
			playerCircle.acc.y = ACC;
		}
	};

	left.release = function(){
		if(!right.isDown){
			playerCircle.acc.x = 0;
			let sign = (playerCircle.acc.y > 0) ? 1 : -1;
			playerCircle.acc.y /= playerCircle.acc.y !== 0 ? (playerCircle.acc.y * sign) : 1;
			playerCircle.acc.y *= ACC;
		}else{
			playerCircle.acc.x = (playerCircle.acc.y === 0) ? ACC : Math.sqrt(ACC * ACC / 2);
			playerCircle.acc.y = (playerCircle.acc.y === 0) ? 0 : (playerCircle.acc.y * Math.sqrt(ACC * ACC / 2)) / Math.abs(playerCircle.acc.y);
		}
	};
	right.release = function(){
		if(!left.isDown){
			playerCircle.acc.x = 0;
			let sign = (playerCircle.acc.y > 0) ? 1 : -1;
			playerCircle.acc.y /= playerCircle.acc.y !== 0 ? (playerCircle.acc.y * sign) : 1;
			playerCircle.acc.y *= ACC;
		}else{
			playerCircle.acc.x = (playerCircle.acc.y === 0) ? -ACC : -Math.sqrt(ACC * ACC / 2);
			playerCircle.acc.y = (playerCircle.acc.y === 0) ? 0 : (playerCircle.acc.y * Math.sqrt(ACC * ACC / 2)) / Math.abs(playerCircle.acc.y);
		}
	};
	up.release = function(){
		if(!down.isDown){
			playerCircle.acc.y = 0;
			let sign = (playerCircle.acc.x > 0) ? 1 : -1;
			playerCircle.acc.x /= playerCircle.acc.x !== 0 ? (playerCircle.acc.x * sign) : 1;
			playerCircle.acc.x *= ACC;
		}else{
			playerCircle.acc.y = (playerCircle.acc.x === 0) ? ACC : Math.sqrt(ACC * ACC / 2);
			playerCircle.acc.x = (playerCircle.acc.x === 0) ? 0 : (playerCircle.acc.x * Math.sqrt(ACC * ACC / 2)) / Math.abs(playerCircle.acc.x);
		}
	};
	down.release = function(){
		if(!up.isDown){
			playerCircle.acc.y = 0;
			let sign = (playerCircle.acc.x > 0) ? 1 : -1;
			playerCircle.acc.x /= playerCircle.acc.x !== 0 ? (playerCircle.acc.x * sign) : 1;
			playerCircle.acc.x *= ACC;
		}else{
			playerCircle.acc.y = (playerCircle.acc.x === 0) ? -ACC : -Math.sqrt(ACC * ACC / 2);
			playerCircle.acc.x = (playerCircle.acc.x === 0) ? 0 : (playerCircle.acc.x * Math.sqrt(ACC * ACC / 2)) / Math.abs(playerCircle.acc.x);
		}
	};
};
});

