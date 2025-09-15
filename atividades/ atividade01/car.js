function drawCar(gl) {

  gl.viewport(150, 200, 300, 150);
  drawSquare1(gl);


  gl.viewport(200, 300, 200, 100);
  drawSquare2(gl);


  gl.viewport(150, 150, 100, 100);
  drawTriangleFan(gl); 

  gl.viewport(350, 150, 100, 100);
  drawTriangleFan(gl); 
}
