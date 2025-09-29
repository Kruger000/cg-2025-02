let angle = 0;    
let speed = 0.02;  

function drawFlower(gl, angle) {
  const centerX = 250;
  const centerY = 250;
  const radius = 150; 

 
  gl.viewport(centerX - 50, centerY - 50, 100, 100);
  drawSquare1(gl);

  // Pétalas
  for (let i = 0; i < 4; i++) {
    const theta = angle + i * (Math.PI / 2);
    const x = centerX + Math.cos(theta) * radius;
    const y = centerY + Math.sin(theta) * radius;
    gl.viewport(x - 50, y - 50, 100, 100);
    drawSquare2(gl);
  }

  // Pétalas
  for (let i = 0; i < 4; i++) {
    const theta = angle + i * (Math.PI / 2) + Math.PI / 4;
    const x = centerX + Math.cos(theta) * radius;
    const y = centerY + Math.sin(theta) * radius;
    gl.viewport(x - 50, y - 50, 100, 100);

    if (i % 2 === 0) {
      drawTriangle1(gl);
    } else {
      drawTriangle2(gl);
    }
  }

  // Caule
  gl.viewport(centerX - 20, 0, 40, 200);
  drawSquare1(gl);
}

function animateFlower(gl) {
  gl.clear(gl.COLOR_BUFFER_BIT);

  drawFlower(gl, angle);

  angle += speed; 

  requestAnimationFrame(() => animateFlower(gl));
}

function mainFlower() {
  const canvas = document.getElementById("webgl");
  const gl = canvas.getContext("webgl");

  if (!gl) {
    console.error("WebGL não suportado");
    return;
  }

  gl.clearColor(0.95, 0.95, 1.0, 1.0);

  animateFlower(gl);
}
