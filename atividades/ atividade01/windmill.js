function drawWindmill(gl) {
  
  gl.viewport(280, 0, 40, 300);
  drawSquare1(gl);


  gl.viewport(250, 300, 100, 100);
  drawSquare2(gl);


  gl.viewport(250, 400, 100, 100); 
  drawTriangle1(gl);

  gl.viewport(250, 200, 100, 100); 
  drawTriangle2(gl);

  gl.viewport(150, 300, 100, 100);
  drawTriangle1(gl);

  gl.viewport(350, 300, 100, 100); 
  drawTriangle2(gl);
}
