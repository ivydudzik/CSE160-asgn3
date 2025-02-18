// HelloCube.js (c) 2012 matsuda
// Vertex shader program
var VSHADER_SOURCE = `
  uniform mat4 u_ModelMatrix;
  uniform mat4 u_ViewMatrix;
  uniform mat4 u_ProjectionMatrix;

  attribute vec4 a_Position;
  attribute vec2 a_UV;

  varying vec2 v_UV;
  void main() {
    v_UV = a_UV;
    gl_Position = u_ViewMatrix * u_ModelMatrix * u_ProjectionMatrix * a_Position;
  }`

// Fragment shader program
var FSHADER_SOURCE = `
  precision mediump float;
  
  uniform sampler2D u_Texture0;

  uniform vec4 u_FragColor;

  uniform float u_ColorWeight;

  varying vec2 v_UV;

  void main() {
    vec4 image0 = texture2D(u_Texture0, v_UV);

    gl_FragColor = (u_FragColor * u_ColorWeight) + ((1.0 - u_ColorWeight) * image0);
  }
  `;

// Global Vars
let canvas;
let gl;
let a_Position;
let u_FragColor;
let u_ModelMatrix;
let u_ProjectionMatrix;
let u_ViewMatrix;
let a_UV;
let u_Texture0;
let u_ColorWeight;

let cubes = [];
let camera;

// INIT FUNCTIONS //
function setupWebGL() {
  // Retrieve <canvas> element
  canvas = document.getElementById('webgl');

  // Get the rendering context for WebGL
  gl = canvas.getContext("webgl", { preserveDrawingBuffer: true });
  if (!gl) {
    console.log('Failed to get the rendering context for WebGL');
    return;
  }

  gl.viewport(0, 0, canvas.width, canvas.height);

  window.addEventListener("resize", (e) => {
    gl.canvas.width = window.innerWidth;
    gl.canvas.height = window.innerHeight;

    gl.viewport(0, 0, gl.canvas.width, gl.canvas.height);
  });

  gl.enable(gl.DEPTH_TEST);
}

function connectVariablesToGLSL() {
  // Initialize shaders
  if (!initShaders(gl, VSHADER_SOURCE, FSHADER_SOURCE)) {
    console.log('Failed to intialize shaders.');
    return;
  }

  // Get the storage location of a_Position
  a_Position = gl.getAttribLocation(gl.program, 'a_Position');
  if (a_Position < 0) {
    console.log('Failed to get the storage location of a_Position');
    return;
  }

  // Get the storage location of u_FragColor
  u_FragColor = gl.getUniformLocation(gl.program, 'u_FragColor');
  if (!u_FragColor) {
    console.log('Failed to get the storage location of u_FragColor');
    return;
  }

  // Get the storage location of u_ColorWeight
  u_ColorWeight = gl.getUniformLocation(gl.program, 'u_ColorWeight');
  if (!u_ColorWeight) {
    console.log('Failed to get the storage location of u_ColorWeight');
    return;
  }

  // Get the storage location of u_ModelMatrix
  u_ModelMatrix = gl.getUniformLocation(gl.program, 'u_ModelMatrix');
  if (!u_ModelMatrix) {
    console.log('Failed to get the storage location of u_ModelMatrix');
    return;
  }

  // Get the storage location of u_ModelMatrix
  u_ProjectionMatrix = gl.getUniformLocation(gl.program, 'u_ProjectionMatrix');
  if (!u_ProjectionMatrix) {
    console.log('Failed to get the storage location of u_ProjectionMatrix');
    return;
  }

  // Get the storage location of u_ModelMatrix
  u_ViewMatrix = gl.getUniformLocation(gl.program, 'u_ViewMatrix');
  if (!u_ViewMatrix) {
    console.log('Failed to get the storage location of u_ViewMatrix');
    return;
  }

  // Get the storage location of u_Texture0
  u_Texture0 = gl.getUniformLocation(gl.program, 'u_Texture0');
  if (!u_Texture0) {
    console.log('Failed to get the storage location of u_Texture0');
    return;
  }

  // Get the storage location of a_UV
  a_UV = gl.getAttribLocation(gl.program, 'a_UV');
  if (!a_UV) {
    console.log('Failed to get the storage location of a_UV');
    return;
  }
}

// HTML FUNCTIONS //

// UI Globals
let g_viewAngleY = 45;
let g_viewAngleX = -5;

// Set up actions for HTML UI elements
function addActionsForHtmlUI() {
  // Button Events
  document.getElementById('animOn').onclick = function () { };

  // Scene Manipulation Sliders
  document.getElementById('viewAngleYSlide').addEventListener("mousemove", function () { g_viewAngleY = this.value; renderScene(); });
  document.getElementById('viewAngleXSlide').addEventListener("mousemove", function () { g_viewAngleX = this.value; renderScene(); });
}

function main() {
  // Set up canvas and gl vars
  setupWebGL();

  // Set up GLSL shader program and connect vars
  connectVariablesToGLSL();

  // Add HTML UI Actions
  addActionsForHtmlUI();

  // Register function (event handler) to be called on a mouse press
  canvas.onclick = click;
  document.onkeydown = keydown;
  canvas.onmousemove = function (ev) { if (ev.buttons == 1) { click(ev) } };

  // Specify the color for clearing <canvas>
  gl.clearColor(0.0, 0.0, 0.0, 1.0);

  camera = new Camera();

  var imagePath = './Sunspots.png';
  cubes.push(new Cube());
  cubes[0].setImage(gl, imagePath, u_Texture0);
  cubes[0].color = [1.0, 1.0, 1.0, 1.0];
  cubes[0].solidColorWeight = 0.5;

  requestAnimationFrame(tick);
}

function tick() {
  renderScene();

  requestAnimationFrame(tick);
}

function updatePerformanceIndicator(frameStartTime) {
  let perfText = document.getElementById('performanceText');
  perfText.innerHTML = "MS: " + Math.floor((performance.now() - frameStartTime) * 10) / 10 + " | FPS: " + Math.floor(10000 / (performance.now() - frameStartTime) / 10);
}

function click(ev) {

}

function keydown(ev) {
  switch (ev.keyCode) {
    case 87: camera.moveForward(); console.log("keydown!"); break;
    case 65: camera.moveLeft(); break;
    case 68: camera.moveRight(); break;
    case 83: camera.moveBackwards(); break;
    case 81: camera.panHorizontal(1); break;
    case 69: camera.panHorizontal(-1); break;
  }
}

function convertCoordinatesEventToGL(ev) {
  var x = ev.clientX; // x coordinate of a mouse pointer
  var y = ev.clientY; // y coordinate of a mouse pointer
  var rect = ev.target.getBoundingClientRect();

  x = ((x - rect.left) - canvas.width / 2) / (canvas.width / 2);
  y = (canvas.height / 2 - (y - rect.top)) / (canvas.height / 2);

  return ([x, y]);
}


function renderScene() {
  let tickStartTime = performance.now();

  // Clear <canvas>
  gl.clear(gl.COLOR_BUFFER_BIT);
  gl.clear(gl.DEPTH_BUFFER_BIT);

  cubes[0].render(gl, camera);

  updatePerformanceIndicator(tickStartTime)
}

