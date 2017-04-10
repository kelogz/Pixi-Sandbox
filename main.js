// // Require pixi module 
// var pixi = require('pixi');
 
// // You can use either WebGLRenderer or CanvasRenderer 
// var renderer = pixi.WebGLRenderer(800, 600);
// document.body.appendChild(renderer.view);
 
// var stage = new pixi.Stage();
// var bunnyTexture = pixi.Texture.fromImage("bunny.png");
// var bunny = new pixi.Sprite(bunnyTexture);
 
// bunny.position.x = 400;
// bunny.position.y = 300;
// bunny.scale.x = 2;
// bunny.scale.y = 2;
 
// stage.addChild(bunny);
 
// requestAnimationFrame(animate);
 
// function animate() {
//     bunny.rotation += 0.01;
 
//     renderer.render(stage);
 
//     requestAnimationFrame(animate);
// }
const WIDTH = 800;
const HEIGHT = 600;

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
	playerCircle.radius = 50;

	// Initial Player Rendering
	playerCircle.beginFill(0xFF0000, 0.5);
	playerCircle.drawCircle(0, 0, playerCircle.radius);
	playerCircle.endFill();

	console.log(playerCircle);
	// Keyboard Controls
	var left = keyboard(KEY_LEFT),
		right = keyboard(KEY_RIGHT),
		up = keyboard(KEY_UP),
		down = keyboard(KEY_DOWN);

	left.press = function(){
		if(playerCircle.acc.y != 0){
			let diag = Math.sqrt(1/2);
			playerCircle.acc.y *= diag;
			playerCircle.acc.x = -diag;
		}else{
			playerCircle.acc.x = -1;
		}
	};
	right.press = function(){
		if(playerCircle.acc.y != 0){
			let diag = Math.sqrt(1/2);
			playerCircle.acc.y *= diag;
			playerCircle.acc.x = diag;
		}else{
			playerCircle.acc.x = 1;
		}
	};
	up.press = function(){
		if(playerCircle.acc.x != 0){
			let diag = Math.sqrt(1/2);
			playerCircle.acc.x *= diag;
			playerCircle.acc.y = -diag;
		}else{
			playerCircle.acc.y = -1;
		}
	};
	down.press = function(){
		if(playerCircle.acc.x != 0){
			let diag = Math.sqrt(1/2);
			playerCircle.acc.x *= diag;
			playerCircle.acc.y = diag;
		}else{
			playerCircle.acc.y = 1;
		}
	};

	left.release = function(){
		if(!right.isDown){
			playerCircle.acc.x = 0;
			let sign = (playerCircle.acc.y > 0) ? 1 : -1;
			playerCircle.acc.y /= playerCircle.acc.y !== 0 ? (playerCircle.acc.y * sign) : 1;
		}
	}
	right.release = function(){
		if(!left.isDown){
			playerCircle.acc.x = 0;
			let sign = (playerCircle.acc.y > 0) ? 1 : -1;
			playerCircle.acc.y /= playerCircle.acc.y !== 0 ? (playerCircle.acc.y * sign) : 1;
		}
	}
	up.release = function(){
		if(!down.isDown){
			playerCircle.acc.y = 0;
			let sign = (playerCircle.acc.x > 0) ? 1 : -1;
			playerCircle.acc.x /= playerCircle.acc.x !== 0 ? (playerCircle.acc.x * sign) : 1;
		}
	}
	down.release = function(){
		if(!up.isDown){
			playerCircle.acc.y = 0;
			let sign = (playerCircle.acc.x > 0) ? 1 : -1;
			playerCircle.acc.x /= playerCircle.acc.x !== 0 ? (playerCircle.acc.x * sign) : 1;
		}
	}

	var speedParams = new PIXI.Text("Acc: (" + playerCircle.acc.x.toFixed(2) + ", " + playerCircle.acc.y.toFixed(2) + "); Vel: (" + playerCircle.vel.x.toFixed(2) + ", " + playerCircle.vel.y.toFixed(2) + ")");
	console.log(speedParams);

	app.stage.addChild(playerCircle);
	app.stage.addChild(speedParams);

	app.ticker.add(function(){
		updateBoidLogic([playerCircle]);
		renderBoid([playerCircle]);
		speedParams.text = "Acc: (" + playerCircle.acc.x.toFixed(2) + ", " + playerCircle.acc.y.toFixed(2) + "); Vel: (" + playerCircle.vel.x.toFixed(2) + ", " + playerCircle.vel.y.toFixed(2) + ")";
	});
});