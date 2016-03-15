var container;

var camera, scene, renderer, effect;

var mesh, lightMesh, geometry;
var particles = [];

var directionalLight, pointLight;

var mouseX = 0, mouseY = 0;

var windowWidth = window.innerWidth;
var windowHeight = window.innerHeight;

var view = 3200;
var size = 500, step = 100;

init();
animate();

function init() {
  // Initialize ThreeJS
  container = document.createElement('div');
  document.body.appendChild(container);
  
  scene = new THREE.Scene();

  camera = new THREE.OrthographicCamera(-windowWidth/2, windowWidth/2, windowHeight/2, -windowHeight/2, -500, 1000);
  camera.position.x = 200;
  camera.position.y = 150;
  camera.position.z = 200;
  
  // Initialize Scene
  initializeGrid(size, step);
  initializeParticles(size, step);
  initializeLight();
  console.log(particles);

  renderer = new THREE.WebGLRenderer({
    'antialias': true,
    'alpha': true
  });
  renderer.setClearColor( 0xf0f0f0 );
  renderer.setSize(window.innerWidth, window.innerHeight);
  container.appendChild(renderer.domElement);
}


function animate() {
  requestAnimationFrame(animate);
  render();
}

function render() {
  var timer = Date.now() * 0.0001;

  rotateCamera(timer);
  updateWave(timer);
  camera.lookAt(scene.position); 
  renderer.render(scene, camera);
}


function updateWave(timer) {
  var height = 100;
  var speed = 20;
  var trailDist = 1.4
  for (var i = 0; i < particles.length; i++) {
    for (var j = 0; j < particles[i].length; j++) {
      var degree = timer * speed - (i + j) * trailDist / Math.PI;
      particles[j][i].position.y = height * Math.cos(degree);  // Diagonal
    }
  }
}

function rotateCamera(timer) {
  camera.position.x = Math.cos(timer) * 200;
  camera.position.z = Math.sin(timer) * 200;
}

// Initialize Steps

function initializeParticles(size, step) {
  var geometry = new THREE.BoxGeometry( step-10, step-10, step-10 );
  var material = new THREE.MeshLambertMaterial( { color: 0xffffff, overdraw: 0.5 } );
  var arr = [];

  for (var i = -size; i < size; i += step) {
    for (var j = -size; j < size; j += step) {
      var particle = new THREE.Mesh(geometry, material);

      particle.position.x = i + step/2;
      particle.position.y = 0;
      particle.position.z = j + step/2;

      arr.push(particle);
      scene.add(particle);
    }
    particles.push(arr);
    arr = [];
  }
}

function initializeGrid(size, step) {
  var gridGeometry = new THREE.Geometry();
  for (var i = - size; i <= size; i += step) {
    gridGeometry.vertices.push(new THREE.Vector3(-size, 0, i));
    gridGeometry.vertices.push(new THREE.Vector3(size, 0, i));
    gridGeometry.vertices.push(new THREE.Vector3(   i, 0, -size));
    gridGeometry.vertices.push(new THREE.Vector3(   i, 0, size));
  }

  var gridMaterial = new THREE.LineBasicMaterial({ color: color2Hex('black'), opacity: 0.2 });
  var line = new THREE.LineSegments(gridGeometry, gridMaterial);

  scene.add(line);
}

function initializeLight() {
  var ambientLight = new THREE.AmbientLight(Math.random() * 0x10);
  scene.add(ambientLight);

  var directionalLight = new THREE.DirectionalLight( Math.random() * 0xffffff );
  directionalLight.position.x = Math.random() - 0.5;
  directionalLight.position.y = Math.random() - 0.5;
  directionalLight.position.z = Math.random() - 0.5;
  directionalLight.position.normalize();
  scene.add(directionalLight);

  var directionalLight = new THREE.DirectionalLight( Math.random() * 0xffffff );
  directionalLight.position.x = Math.random() - 0.5;
  directionalLight.position.y = Math.random() - 0.5;
  directionalLight.position.z = Math.random() - 0.5;
  directionalLight.position.normalize();
  scene.add(directionalLight);
}