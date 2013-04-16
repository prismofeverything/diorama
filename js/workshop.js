var workshop = function() {
  var renderer, camera;
  var scene, element;
  var ambient, point;
  var sphere, material;
  var aspectRatio, windowHalf;
  var mouse, time;
  var subsphere, othersphere;
  var sphereRadius;
  var spheres;

  function init() {
    element = document.getElementById('workshop');
    scene = new THREE.Scene();
    ambient = new THREE.AmbientLight(0x001111);
    scene.add(ambient);

    point = new THREE.PointLight(0xffffff);
    point.position.set(10, 10, 10);
    scene.add(point);

    sphereRadius = 5;
    spheres = [];

    material = new THREE.MeshPhongMaterial({color: 0xcc2222});
    submaterial = new THREE.MeshPhongMaterial({color: 0x22ee77});
    sphere = new THREE.Mesh(
      new THREE.SphereGeometry(sphereRadius, 12, 12),
      material);

    sphere.position.set(0, 0, 0);
    subsphere = new THREE.Mesh(
      new THREE.SphereGeometry(3, 12, 12),
      submaterial);
    othersphere = subsphere.clone();
    subsphere.position.set(sphereRadius, 0, 0);
    othersphere.position.set(-sphereRadius, 0, 0);

    scene.add(sphere);
    sphere.add(subsphere);
    sphere.add(othersphere);

    time = 0;
    mouse = new THREE.Vector2(0, 0);
    windowHalf = new THREE.Vector2(window.innerWidth / 2, window.innerHeight / 2);
    aspectRatio = window.innerWidth / window.innerHeight;
    camera = new THREE.PerspectiveCamera(45, aspectRatio, 1, 1000);
    camera.position.z = 20;
    camera.lookAt(scene.position);

    renderer = new THREE.WebGLRenderer();
    renderer.setSize(window.innerWidth, window.innerHeight);
    element.appendChild(renderer.domElement);

    document.addEventListener('mousedown', onMouseDown, false);
    document.addEventListener('mousemove', onMouseMove, false);
    window.addEventListener('resize', onResize, false);
  }
  
  function onResize() {
    windowHalf = new THREE.Vector2(window.innerWidth / 2, window.innerHeight / 2);
    aspectRatio = window.innerWidth / window.innerHeight;
    camera.aspect = aspectRatio;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
  }

  function onMouseMove(event) {
    mouse.x = (event.clientX - windowHalf.x) / 2;
    mouse.y = (event.clientY - windowHalf.y) / 2;
  }

  function randomLeaf(object) {
    var count = object.children.length;
    if (count > 0 && Math.random() > 0.0001) {
      var index = THREE.Math.randInt(0, count - 1);
      return randomLeaf(object.children[index]);
    } else {
      return object;
    }
  }

  function onMouseDown(event) {
    growPod();
  }

  function growPod() {
    var leaf = randomLeaf(sphere);
    var radius = 3;
    // var radius = THREE.Math.randFloat(1, 5);
    var color = new THREE.Color().setRGB(Math.random(), Math.random(), Math.random());
    var material = new THREE.MeshPhongMaterial({color: color});
    var newsphere = new THREE.Mesh(
      new THREE.SphereGeometry(radius, 12, 12),
      material);
    var max = leaf.geometry.vertices.length;
    var which = THREE.Math.randInt(0, max - 1);
    var vertex = leaf.geometry.vertices[which];
    newsphere.scale.set(.999, .999, .999);
    newsphere.position.copy(vertex);
    leaf.add(newsphere);
  }

  function animate() {
    requestAnimationFrame(animate);
    render();
  }

  function render() {
    sphere.position.x = mouse.x * 0.1;
    sphere.position.y = mouse.y * 0.1;
    time++;

    growPod();
    growPod();
    growPod();

    camera.position.x = 200 * Math.sin(time * Math.PI / 180);
    camera.position.y = 200 * Math.cos(time * Math.PI / 180);
    camera.lookAt(scene.position);
    renderer.render(scene, camera);
  }

  window.onload = function() {
    init();
    animate();
  }
} ();
