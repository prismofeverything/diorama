var workshop = function() {
  var renderer, camera;
  var scene, element;
  var ambient, point;
  var sphere, material;
  var aspectRatio, windowHalf;
  var mouse, time;

  function init() {
    element = document.getElementById('workshop');
    scene = new THREE.Scene();
    ambient = new THREE.AmbientLight(0x001111);
    scene.add(ambient);

    point = new THREE.PointLight(0xffffff);
    point.position.set(10, 10, 10);
    scene.add(point);

    material = new THREE.MeshPhongMaterial({color: 0xcc2222});
    sphere = new THREE.Mesh(
      new THREE.SphereGeometry(5, 12, 12),
      material);

    sphere.position.set(0, 0, 0);
    scene.add(sphere);

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

  function animate() {
    requestAnimationFrame(animate);
    render();
  }

  function render() {
    sphere.position.x = mouse.x * 0.1;
    sphere.position.y = mouse.y * 0.1;
    time++;
    camera.position.x = 20 * Math.sin(time * Math.PI / 180);
    camera.position.y = 20 * Math.cos(time * Math.PI / 180);
    camera.lookAt(scene.position);
    renderer.render(scene, camera);
  }

  window.onload = function() {
    init();
    animate();
  }
} ();
