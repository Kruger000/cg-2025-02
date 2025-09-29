let offsetX = 0; 
let speed = 2;   

function drawCar(gl, offsetX) {
  // Corpo
  gl.viewport(150 + offsetX, 200, 300, 150);
  drawSquare1(gl);

  // Parte de cima
  gl.viewport(200 + offsetX, 300, 200, 100);
  drawSquare2(gl);

  // Rodas
  gl.viewport(150 + offsetX, 150, 100, 100);
  drawTriangleFan(gl); 

  gl.viewport(350 + offsetX, 150, 100, 100);
  drawTriangleFan(gl); 
}

function animate(gl) {
  gl.clear(gl.COLOR_BUFFER_BIT);

  drawCar(gl, offsetX);

  
  offsetX += speed;
  if (offsetX > 400) { 
    offsetX = -400;
  }

  requestAnimationFrame(() => animate(gl));
}


function main() {
  const canvas = document.getElementById("webgl");
  const gl = canvas.getContext("webgl");

  if (!gl) {
    console.error("WebGL não suportado");
    return;
  }

  gl.clearColor(0.9, 0.9, 0.9, 1.0);

  animate(gl);
}
