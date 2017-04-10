const BOID_DECEL = 0.9;

function updateBoidLogic(boidArray){
	for(let i = 0; i < boidArray.length; i++){
		let boid = boidArray[i];

		// boid.acc.x *= BOID_DECEL;
		// boid.acc.y *= BOID_DECEL;

		boid.vel.x += boid.acc.x;
		boid.vel.y += boid.acc.y;

		boid.vel.x *= BOID_DECEL;
		boid.vel.y *= BOID_DECEL;

		boid.vel.x = Number(boid.vel.x.toFixed(4)) === 0 ? 0 : boid.vel.x;
		boid.vel.y = Number(boid.vel.y.toFixed(4)) === 0 ? 0 : boid.vel.y;

		// boid.vel.x = Number(boid.vel.x.toFixed(2));
		// boid.vel.y = Number(boid.vel.y.toFixed(2));

		boid.x += boid.vel.x;
		boid.y += boid.vel.y;

		// boid.x = Number(boid.x.toFixed(2));
		// boid.y = Number(boid.y.toFixed(2));

		boid.rotation = Math.atan(boid.vel.x / boid.vel.y);
	}
}

function renderBoid(boidArray){
	for(let i = 0; i < boidArray.length; i++){
		let boid = boidArray[i];

		// Clear previous Render
		boid.clear();

		// Draw Circle
		boid.beginFill(0xFF0000, 0.5);
		boid.drawCircle(0, 0, boid.radius);
		boid.endFill();

		// Draw Directional Line
		// boid.lineStyle(5, 0x000000, 0.5);
		// boid.beginFill(0x000000, 0.5);
		// boid.moveTo(0, 0);
		// boid.lineTo(boid.vel.x, boid.vel.y);
		// boid.endFill();
	}
}