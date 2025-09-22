const canvas = document.getElementById("glcanvas");
const gl = canvas.getContext("webgl");


const vsSource = `
  attribute vec2 aPosition;
  uniform vec3 uColor;
  uniform float uPointSize;
  varying vec3 vColor;
  void main(void) {
    gl_PointSize = uPointSize;
    gl_Position = vec4(aPosition, 0.0, 1.0);
    vColor = uColor;
  }
`;
const fsSource = `
  precision mediump float;
  varying vec3 vColor;
  void main(void) {
    gl_FragColor = vec4(vColor, 1.0);
  }
`;

function compileShader(type, source) {
  const shader = gl.createShader(type);
  gl.shaderSource(shader, source);
  gl.compileShader(shader);
  if (!gl.getShaderParameter(shader, gl.COMPILE_STATUS)) {
    console.error(gl.getShaderInfoLog(shader));
    return null;
  }
  return shader;
}

const vertexShader = compileShader(gl.VERTEX_SHADER, vsSource);
const fragmentShader = compileShader(gl.FRAGMENT_SHADER, fsSource);

const shaderProgram = gl.createProgram();
gl.attachShader(shaderProgram, vertexShader);
gl.attachShader(shaderProgram, fragmentShader);
gl.linkProgram(shaderProgram);

gl.useProgram(shaderProgram);


const aPosition = gl.getAttribLocation(shaderProgram, "aPosition");
const uColor = gl.getUniformLocation(shaderProgram, "uColor");
const uPointSize = gl.getUniformLocation(shaderProgram, "uPointSize");

let color = [0.0, 0.0, 1.0]; 
let pointSize = 4.0;         
let mode = "line";          

let clickPoints = [];
let figurePoints = [];


function bresenham(x0, y0, x1, y1) {
  let points = [];
  let dx = Math.abs(x1 - x0);
  let dy = Math.abs(y1 - y0);
  let sx = (x0 < x1) ? 1 : -1;
  let sy = (y0 < y1) ? 1 : -1;
  let err = dx - dy;

  while (true) {
    points.push([x0, y0]);
    if (x0 === x1 && y0 === y1) break;
    let e2 = 2 * err;
    if (e2 > -dy) { err -= dy; x0 += sx; }
    if (e2 < dx) { err += dx; y0 += sy; }
  }
  return points;
}

function toClipSpace(x, y) {
  return [
    (x / canvas.width) * 2 - 1,
    -((y / canvas.height) * 2 - 1)
  ];
}

function drawFigure() {
  if (figurePoints.length === 0) return;
  gl.clear(gl.COLOR_BUFFER_BIT);
  gl.uniform3fv(uColor, color);
  gl.uniform1f(uPointSize, pointSize);

  const buffer = gl.createBuffer();
  gl.bindBuffer(gl.ARRAY_BUFFER, buffer);
  gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(figurePoints.flat()), gl.STATIC_DRAW);

  gl.enableVertexAttribArray(aPosition);
  gl.vertexAttribPointer(aPosition, 2, gl.FLOAT, false, 0, 0);

  gl.drawArrays(gl.POINTS, 0, figurePoints.length);
}

canvas.addEventListener("click", (e) => {
  if (mode !== "line" && mode !== "triangle") return;

  const rect = canvas.getBoundingClientRect();
  const x = Math.floor(e.clientX - rect.left);
  const y = Math.floor(e.clientY - rect.top);

  clickPoints.push([x, y]);

  if (mode === "line" && clickPoints.length === 2) {
    const [x0, y0] = clickPoints[0];
    const [x1, y1] = clickPoints[1];
    const pixelPoints = bresenham(x0, y0, x1, y1);

    figurePoints = pixelPoints.map(([px, py]) => toClipSpace(px, py));
    drawFigure();
    clickPoints = [];
  }

  if (mode === "triangle" && clickPoints.length === 3) {
    const [x0, y0] = clickPoints[0];
    const [x1, y1] = clickPoints[1];
    const [x2, y2] = clickPoints[2];

    const edge1 = bresenham(x0, y0, x1, y1);
    const edge2 = bresenham(x1, y1, x2, y2);
    const edge3 = bresenham(x2, y2, x0, y0);

    const allPoints = [...edge1, ...edge2, ...edge3];
    figurePoints = allPoints.map(([px, py]) => toClipSpace(px, py));

    drawFigure();
    clickPoints = [];
  }
});


const colorMap = {
  0: [1.0, 0.0, 0.0], 
  1: [0.0, 1.0, 0.0], 
  2: [0.0, 0.0, 1.0], 
  3: [1.0, 1.0, 0.0], 
  4: [1.0, 0.0, 1.0], 
  5: [0.0, 1.0, 1.0],
  6: [1.0, 0.5, 0.0], 
  7: [0.5, 0.0, 0.5], 
  8: [0.5, 0.5, 0.5], 
  9: [1.0, 1.0, 1.0]  
};


document.addEventListener("keydown", (e) => {
  
  if (e.key === "r" || e.key === "R") {
    mode = "line";
    clickPoints = [];
    figurePoints = [];
    gl.clear(gl.COLOR_BUFFER_BIT);
    console.log("Modo: Reta");
  }
  if (e.key === "t" || e.key === "T") {
    mode = "triangle";
    clickPoints = [];
    figurePoints = [];
    gl.clear(gl.COLOR_BUFFER_BIT);
    console.log("Modo: Triângulo");
  }

  
  if (e.key === "k" || e.key === "K") {
    mode = "color";
    console.log("Modo: Mudar Cor");
  }

  
  if (e.key === "e" || e.key === "E") {
    mode = "thickness";
    console.log("Modo: Espessura");
  }

  
  if (mode === "color" && e.key in colorMap) {
    color = colorMap[e.key];
    drawFigure();
    console.log("Cor alterada");
  }

  
  if (mode === "thickness" && /^[1-9]$/.test(e.key)) {
    pointSize = parseInt(e.key);
    drawFigure();
    console.log("Espessura = " + pointSize);
  }
});


gl.clearColor(0.0, 0.0, 0.0, 1.0);
gl.clear(gl.COLOR_BUFFER_BIT);


figurePoints = [toClipSpace(0, 0)];
drawFigure();
