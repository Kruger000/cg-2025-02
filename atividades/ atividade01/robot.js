function drawRobot(gl) {
  // corpo 
  drawSquare1(gl);

  // cabeça 
  gl.viewport(200, 400, 200, 200);
  drawSquare2(gl);

  // braços
  gl.viewport(50, 250, 150, 100);
  drawSquare1(gl);

  gl.viewport(400, 250, 150, 100);
  drawSquare1(gl);

  // pernas
  gl.viewport(200, 50, 100, 200);
  drawSquare2(gl);

  gl.viewport(300, 50, 100, 200);
  drawSquare2(gl);
}
