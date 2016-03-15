var camera, scene, renderer, effect;

var mesh, lightMesh, geometry;
var spheres = [];

var directionalLight, pointLight;

var mouseX = 0, mouseY = 0;

var windowHalfX = window.innerWidth / 2;
var windowHalfY = window.innerHeight / 2;

document.addEventListener('mousemove', onDocumentMouseMove, false);
var view = 3200;

init();
animate();

function init() {
  scene = new THREE.Scene();

  camera = new THREE.PerspectiveCamera(60, window.innerWidth / window.innerHeight, 1, 100000);
  camera.position.z = view;

  var yAxisGeometry = new THREE.Geometry();
  var zAxisGeometry = new THREE.Geometry();
  var xAxisGeometry = new THREE.Geometry();

  var xAxisMaterial = new THREE.LineBasicMaterial({
    color: color2Hex("red")
  });
  var yAxisColor = new THREE.LineBasicMaterial({
    color: color2Hex("green")
  });
  var zAxisColor = new THREE.LineBasicMaterial({
    color: color2Hex("blue")
  });
  
  xAxisGeometry.vertices.push(
    new THREE.Vector3(0, 0, 0),
    new THREE.Vector3(view, 0, 0)
  );
  yAxisGeometry.vertices.push(
    new THREE.Vector3(0, 0, 0),
    new THREE.Vector3(0, view, 0)
  );

  zAxisGeometry.vertices.push(
    new THREE.Vector3(0, 0, 0),
    new THREE.Vector3(0, 0, view)
  );

  var xAxis = new THREE.Line(xAxisGeometry, xAxisMaterial);
  var yAxis = new THREE.Line(yAxisGeometry, yAxisColor);
  var zAxis = new THREE.Line(zAxisGeometry, zAxisColor);

  scene.add(xAxis);
  scene.add(yAxis);
  scene.add(zAxis);

  renderer = new THREE.WebGLRenderer({ 'antialias': true });
  // renderer.setPixelRatio(window.devicePixelRatio);
  renderer.setSize(window.innerWidth, window.innerHeight);
  document.body.appendChild( renderer.domElement )
}

function onDocumentMouseMove(event) {
  mouseX = (event.clientX - windowHalfX) * 10;
  mouseY = (event.clientY - windowHalfY) * 10;
}

function animate() {
  requestAnimationFrame( animate );
  render();
}

function render() {
  camera.position.x += ( mouseX - camera.position.x ) * .05;
  camera.position.y += ( - mouseY - camera.position.y ) * .05;
  camera.lookAt( scene.position );
  renderer.render(scene, camera);
}
