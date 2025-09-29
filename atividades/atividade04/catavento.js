let angleWindmill = 0;   
let speedWindmill = 0.03; 

function drawWindmill(gl, angle) {
  const centerX = 300;
  const centerY = 350;
  const radius = 100;

  // Torre
  gl.viewport(280, 0, 40, 300);
  drawSquare1(gl);

  // Centro
  gl.viewport(centerX - 50, centerY - 50, 100, 100);
  drawSquare2(gl);

  
  for (let i = 0; i < 4; i++) {
    const theta = angle + i * (Math.PI / 2);
    const x = centerX + Math.cos(theta) * radius;
    const y = centerY + Math.sin(theta) * radius;

    gl.viewport(x - 50, y - 50, 100, 100);

    if (i % 2 === 0) {
      drawTriangle1(gl);
    } else {
      drawTriangle2(gl);
    }
  }
}

function animateWindmill(gl) {
  gl.clear(gl.COLOR_BUFFER_BIT);

  drawWindmill(gl, angleWindmill);

  angleWindmill += speedWindmill;

  requestAnimationFrame(() => animateWindmill(gl));
}

function mainWindmill() {
  const canvas = document.getElementById("webgl");
  const gl = canvas.getContext("webgl");

  if (!gl) {
    console.error("WebGL não suportado");
    return;
  }

  gl.clearColor(0.95, 0.95, 1.0, 1.0);

  animateWindmill(gl);
}
