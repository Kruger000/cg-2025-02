function drawFlower(gl) {
  
  gl.viewport(250, 250, 100, 100);
  drawSquare1(gl);

  
  gl.viewport(250, 400, 100, 100); 
  drawSquare2(gl);

  gl.viewport(250, 100, 100, 100);
  drawSquare2(gl);

  gl.viewport(100, 250, 100, 100); 
  drawSquare2(gl);

  gl.viewport(400, 250, 100, 100); 
  drawSquare2(gl);

  
  gl.viewport(150, 350, 100, 100); 
  drawTriangle1(gl);

  gl.viewport(350, 350, 100, 100);
  drawTriangle2(gl);

  gl.viewport(150, 150, 100, 100); 
  drawTriangle2(gl);

  gl.viewport(350, 150, 100, 100); 
  drawTriangle1(gl);

  
  gl.viewport(280, 0, 40, 200);
  drawSquare1(gl);
}
