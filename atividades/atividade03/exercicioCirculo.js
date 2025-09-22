const canvas = document.getElementById("canvas");
const gl = canvas.getContext("webgl");

const vsSource = `
  attribute vec2 aPosition;
  void main(void) {
    gl_PointSize = 3.0;
    gl_Position = vec4(aPosition, 0.0, 1.0);
  }
`;

const fsSource = `
  precision mediump float;
  uniform vec3 uColor;
  void main(void) {
    gl_FragColor = vec4(uColor, 1.0);
  }
`;

function createShader(gl, type, source) {
  const shader = gl.createShader(type);
  gl.shaderSource(shader, source);
  gl.compileShader(shader);
  return shader;
}

const vertexShader = createShader(gl, gl.VERTEX_SHADER, vsSource);
const fragmentShader = createShader(gl, gl.FRAGMENT_SHADER, fsSource);

const program = gl.createProgram();
gl.attachShader(program, vertexShader);
gl.attachShader(program, fragmentShader);
gl.linkProgram(program);
gl.useProgram(program);

const aPosition = gl.getAttribLocation(program, "aPosition");
const uColor = gl.getUniformLocation(program, "uColor");

const buffer = gl.createBuffer();
gl.bindBuffer(gl.ARRAY_BUFFER, buffer);
gl.enableVertexAttribArray(aPosition);
gl.vertexAttribPointer(aPosition, 2, gl.FLOAT, false, 0, 0);

gl.clearColor(1.0, 1.0, 1.0, 1.0);
gl.clear(gl.COLOR_BUFFER_BIT);

gl.uniform3fv(uColor, [0.0, 0.0, 0.0]);

let clickPoints = [];

canvas.addEventListener("click", (event) => {
  const rect = canvas.getBoundingClientRect();
  const x = ((event.clientX - rect.left) / canvas.width) * 2 - 1;
  const y = -(((event.clientY - rect.top) / canvas.height) * 2 - 1);

  clickPoints.push([x, y]);

  if (clickPoints.length === 2) {
    const cx = clickPoints[0][0];
    const cy = clickPoints[0][1];
    const dx = clickPoints[1][0] - cx;
    const dy = clickPoints[1][1] - cy;
    const r = Math.sqrt(dx * dx + dy * dy);

    drawCircle(cx, cy, r);
    clickPoints = [];
  }
});

function drawCircle(cx, cy, r) {
  let x = 0;
  let y = Math.round(r * 250);
  let d = 3 - 2 * y;

  let points = [];

  function plotCirclePoints(cx, cy, x, y) {
    const scale = 1 / 250;
    points.push([cx + x * scale, cy + y * scale]);
    points.push([cx - x * scale, cy + y * scale]);
    points.push([cx + x * scale, cy - y * scale]);
    points.push([cx - x * scale, cy - y * scale]);
    points.push([cx + y * scale, cy + x * scale]);
    points.push([cx - y * scale, cy + x * scale]);
    points.push([cx + y * scale, cy - x * scale]);
    points.push([cx - y * scale, cy - x * scale]);
  }

  while (x <= y) {
    plotCirclePoints(cx, cy, x, y);
    if (d < 0) {
      d += 4 * x + 6;
    } else {
      d += 4 * (x - y) + 10;
      y--;
    }
    x++;
  }

  gl.clear(gl.COLOR_BUFFER_BIT);
  gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(points.flat()), gl.STATIC_DRAW);
