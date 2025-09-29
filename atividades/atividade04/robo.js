let step = 0;        
let speed = 0.05;    

function drawRobot(gl, step) {
  // corpo 
  gl.viewport(200, 250, 200, 200);
  drawSquare1(gl);

  // cabeça 
  gl.viewport(200, 400, 200, 200);
  drawSquare2(gl);

  // braços
  let armOffset = Math.sin(step) * 30;

  gl.viewport(50, 250 + armOffset, 150, 100);
  drawSquare1(gl);

  gl.viewport(400, 250 - armOffset, 150, 100);
  drawSquare1(gl);

  // pernas 
  let legOffset = Math.sin(step) * 40;

  gl.viewport(200, 50 + legOffset, 100, 200);
  drawSquare2(gl);

  gl.viewport(300, 50 - legOffset, 100, 200);
  drawSquare2(gl);
}

function animateRobot(gl) {
  gl.clear(gl.COLOR_BUFFER_BIT);

  drawRobot(gl, step);

  step += speed;

  requestAnimationFrame(() => animateRobot(gl));
}

function mainRobot() {
  const canvas = document.getElementById("webgl");
  const gl = canvas.getContext("webgl");

  if (!gl) {
    console.error("WebGL não suportado");
    return;
  }

  gl.clearColor(0.9, 0.95, 1.0, 1.0);

  animateRobot(gl);
}
