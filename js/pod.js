var pod = function() {
  var element, renderer, camera;
  var scene, ambient;
  var windowHalf, mouse;
  var foveaAngle, aspectRatio, near, far;
  var radius, segments, rings, sphereMaterial, sphere, archetype;
  var extremeness, vertices, eccentricity, time;
  var pointLight;

  var init = function() {
    element = document.createElement('div');
    document.body.appendChild(element);

    scene = new THREE.Scene();
    ambient = new THREE.AmbientLight(0x002020);
    scene.add(ambient);

    pointLight = new THREE.PointLight(0xFFFFFF);
    pointLight.position.set(10, 10, 10);
    scene.add(pointLight);

    time = 0;
    extremeness = 0.01;
    radius = 5;
    segments = 16;
    rings = 16;
    sphereMaterial = new THREE.MeshLambertMaterial({color: 0xff3333});
    archetype = createSphere(radius, segments, rings, sphereMaterial);
    sphere = createSphere(radius, segments, rings, sphereMaterial);
    vertices = sphere.geometry.vertices.length;
    eccentricity = 1 / vertices;
    momentum = [];
    for (var m = 0; m < vertices; m++) {
      momentum.push(new THREE.Vector2(0.1, 0));
    }
    sphere.position.set(0, 0, 0);
    scene.add(sphere);

    foveaAngle = 45;
    near = 1;
    far = 1000;
    fillDimensions();
    camera = new THREE.PerspectiveCamera(foveaAngle, aspectRatio, near, far);
    camera.position.z = 20;
    camera.lookAt(scene.position);

    renderer = new THREE.WebGLRenderer();
    renderer.setSize(window.innerWidth, window.innerHeight);
    element.appendChild(renderer.domElement);

    mouse = new THREE.Vector2(0, 0);
    document.addEventListener('mousemove', onMouseMove, false);
    window.addEventListener('resize', onResize, false);
  }

  var createSphere = function(radius, segments, rings, material) {
    var sphere = new THREE.Mesh(
      new THREE.SphereGeometry(radius, segments, rings),
      material);
    return sphere;
  }

  var fillDimensions = function() {
    windowHalf = new THREE.Vector2(window.innerWidth / 2, window.innerHeight / 2);
    aspectRatio = window.innerWidth / window.innerHeight;
  }

  var onResize = function() {
    fillDimensions();
    camera.aspect = aspectRatio;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
  }

  var onMouseMove = function(event) {
    mouse.x = (event.clientX - windowHalf.x) / 2;
    mouse.y = (event.clientY - windowHalf.y) / 2;
  }

  var animate = function() {
    requestAnimationFrame(animate);
    render();
  }

  var undulate = function(sphere, n) {
    var angle = (n + time) * eccentricity * 10;
    sphere.geometry.vertices[n].x = archetype.geometry.vertices[n].x + Math.sin(angle * 3);
    sphere.geometry.vertices[n].y = archetype.geometry.vertices[n].y + Math.cos(angle * 2);
    sphere.geometry.vertices[n].z = archetype.geometry.vertices[n].z + Math.tan(angle * 1);
  }

  // var undulate = function(sphere, n) {
  //   var diff = sphere.geometry.vertices[n].x - archetype.geometry.vertices[n].x;
  //   momentum[n].y += (diff > 0) ? -extremeness : extremeness;
  //   momentum[n].x += momentum[n].y;
  //   var m = momentum[n];
  //   sphere.geometry.vertices[n].x += m.x;
  //   sphere.geometry.vertices[n].y += m.x;
  //   sphere.geometry.vertices[n].z += m.x;
  // }

  var undulateAll = function(sphere) {
    for (var m = 0; m < sphere.geometry.vertices.length; m++) {
      undulate(sphere, m);
    }
    sphere.geometry.verticesNeedUpdate = true;
  }

  var render = function() {
    time++;
    // sphere.rotation.x += 0.01;
    // sphere.rotation.y += 0.02;
    camera.position.x = (mouse.x * 0.05);
    camera.position.y = (- mouse.y * 0.05);
    camera.lookAt(scene.position);

    undulateAll(sphere);

    renderer.render(scene, camera);
  }

  window.onload = function () {
    init();
    animate();
  }

  return {
    createSphere: createSphere,
    getSphere: function() {return sphere;}
  }
} ();
