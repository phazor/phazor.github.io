import React, { Component } from 'react';
import Overlay from './Overlay';
import * as THREE from 'three';
import Three_OrbitControls from 'three-orbit-controls';
import Detector from '../../lib/three-detector';
import arrow from './arrow.svg';
import sunmap from './1a_map.jpg';
import skydome_med from './eso0932a_med.jpg';
// import skydome_lrg from './eso0932a_lrg.jpg';
import './Planets.css';

THREE.OrbitControls = Three_OrbitControls(THREE); // AMD Module format coercion

let frames_per_sec = 0;

// TODOS:
// High res background image option
// Remove orbits
// Hide background
// Speed slider
// High DPI render mode (for retina screens)
// View from other planets

// TODO: Use redux for state
const settings = {
  background: {
    id: 3,
    handleClick: (setting) => {
      setting.showSky = !setting.showSky;
    },
    text: function() {
      if (this.showSky) {
        return 'Hide Galaxy';
      }
      if (!this.showSky && this.fetchedSkybox) {
        return 'Show Galaxy';
      }
      return 'Load Galaxy';
    },
    showSky: false,
    isLoading: false,
    fetchedSkybox: false
  },
  orbit: {
    id: 2,
    showOrbits: false,
    text: function() {
      return (this.showOrbits) ? 'Hide Orbits' : 'Show Orbits';
    },
    handleClick: (setting) => {
      setting.showOrbits = !setting.showOrbits;
    }
  },
  tips: {
    id: 1,
    text: () => 'Show Tips',
    handleClick: (setting, context) => {
      context.setState({ showTips: true });
      setTimeout(() => {context.setState({ showTips: false })}, 3000);
    }
  },
  fps: {
    id: 0,
    showFPS: false,
    text: function() {
      return (this.showFPS) ? 'Hide FPS' : 'Show FPS';
    },
    handleClick: (setting) => {
      setting.showFPS = !setting.showFPS;
    }
  },
  pause: {
    id: 4,
    isPaused: false,
    handleClick: function(setting) {
      setting.isPaused = !setting.isPaused;
    },
    text: function() {
      return (this.isPaused) ? 'Un-Pause' : 'Pause'
    }
  }
};

// Planets Component
class Planets extends Component {
  constructor(props) {
    super(props);
    this.updateFPS = this.updateFPS.bind(this);
    this.state = {};
  }

  handleFullScreenClick() {
    document.getElementById('canvasWrapper').lastChild.scrollIntoView(true);
  }

  handleMoveToTopClick() {
    document.body.scrollIntoView(true);
  }

  updateFPS() {
    this.setState({ fps: frames_per_sec });
  }

  componentDidMount() {
    this.setState({ webGL: Detector.webgl });
    if (Detector.webgl) { renderScene(); }
    this.fpsID = setInterval(this.updateFPS, 100);
  }

  componentWillUnmount() {
    clearInterval(this.fpsID);
  }

  render() {
    return (
      <div className="Planets" id="Planets">

        {/* Intro text */}
        <h3>Trappist-1</h3>
        <p>This page shows a scale model of the Trappist-1 solar system. It is a unique solar system because the planets are so small but orbit so close together.</p>
        <p>The simulation's speed has been increased by a factor of 8,640 so that 1 earth day equals 10 simulation seconds.</p>
        <p>For more information about Trappist-1, see the <a href="https://www.nasa.gov/press-release/nasa-telescope-reveals-largest-batch-of-earth-size-habitable-zone-planets-around">NASA Press Release</a> or the <a href="https://en.wikipedia.org/wiki/TRAPPIST-1">Wikipedia article</a>.</p>
        <img className="Arrow Down" alt="Jump to simulation" src={arrow}onClick={this.handleFullScreenClick}/>

        {/* Draw area */}
        <div className="CanvasWrapper" id="canvasWrapper">
          {(this.state.webGL) &&
          <Overlay fps={this.state.fps} showFPS={settings.fps.showFPS} handleClick={this.handleMoveToTopClick} settings={settings} />
          }
        </div>

        {/* WebGL Error message */}
        {(!this.state.webGL) &&
          <p className="web-gl-error">Error: WebGL Not Found</p>
        }
      </div>
    )
  }
}

// Kepler Equations
//
// Parameters:
// a = semimajor axis
// e = eccentricity
// theta = angle
//
// Relationship:
// r(theta) = a * (1 - e^2) / (1 + e * cos(theta))
//
// Conversion to cartesian
// x = r * cos(theta)
// z = r * sin(theta)
//
// TODO: For the correct time-dependant solution, radial speed will need to be
// adjusted based on the bessel function:
// http://matlab-monkey.com/astro/keplerEquation/KeplerEquationPub.html
const next = (body, delta_t, elements, period) => {
  const {a, e} = elements;
  let radialSpeed = 2 * Math.PI / period; // radians per second
  let adJustedRadialSpeed = radialSpeed / 10; // 1 real day = 10 simulation seconds
  let startPos = (new THREE.Spherical()).setFromVector3(body.position);
  let theta = startPos.theta + adJustedRadialSpeed * delta_t;
  let r = a * (1 - ( e ** 2 ) ) / (1 + ( e * Math.cos(theta) ) );

  // This assumes an orbit along the solar plane. Matrix transform will be
  // required here for a non-zero inclination
  return new THREE.Spherical(r, Math.PI / 2, theta);
}

function renderScene() {
  const AU = 149597870.7;
  let createMesh = (object) => {
    let mesh = new THREE.Mesh(
      new (Function.prototype.bind.apply(object.geometryType, [null, ...object.geometry]))(),
      new (Function.prototype.bind.call(object.materialType, null, object.material))()
    )
    mesh.position.set(...object.start);
    return mesh;
  }

  let trappist_1 = {
    a: {
      geometryType: THREE.SphereGeometry,
      geometry: [ 0.114 * 695700, 32, 32 ],
      materialType: THREE.MeshBasicMaterial,
      material: { map: new THREE.TextureLoader().load(sunmap) },
      start: [0, 0, 0]
    },
    b: {
      geometryType: THREE.SphereGeometry,
      geometry: [ 1.086 * 6371, 32, 32 ],
      materialType: THREE.MeshBasicMaterial,
      material: { color: 0xf4a261 },
      start: [0, 0, 0.01111 * AU],
      elements: { a: 0.01111 * AU, e: 0.081 },
      period: 1.51087081
    },
    c: {
      geometryType: THREE.SphereGeometry,
      geometry: [ 1.056 * 6371, 32, 32 ],
      materialType: THREE.MeshBasicMaterial,
      material: { color: 0xffa69e },
      start: [0, 0, 0.01522 * AU],
      elements: { a: 0.01522 * AU, e: 0.083 },
      period: 2.4218233
    },
    d: {
      geometryType: THREE.SphereGeometry,
      geometry: [ 0.772 * 6371, 32, 32 ],
      materialType: THREE.MeshBasicMaterial,
      material: { color: 0x028090 },
      start: [0, 0, 0.021 * AU],
      elements: { a: 0.021 * AU, e: 0.070 },
      period: 4.049610
    },
    e: {
      geometryType: THREE.SphereGeometry,
      geometry: [ 0.918 * 6371, 32, 32 ],
      materialType: THREE.MeshBasicMaterial,
      material: { color: 0x05668d },
      start: [0, 0, 0.028 * AU],
      elements: { a: 0.028 * AU, e: 0.085 },
      period: 6.099615
    },
    f: {
      geometryType: THREE.SphereGeometry,
      geometry: [ 1.045 * 6371, 32, 32 ],
      materialType: THREE.MeshBasicMaterial,
      material: { color: 0x05668d },
      start: [0, 0, 0.037 * AU],
      elements: { a: 0.037 * AU, e: 0.063 },
      period: 9.206690
    },
    g: {
      geometryType: THREE.SphereGeometry,
      geometry: [ 1.127 * 6371, 32, 32 ],
      materialType: THREE.MeshBasicMaterial,
      material: { color: 0x05668d },
      start: [0, 0, 0.045 * AU],
      elements: { a: 0.045 * AU, e: 0.061 },
      period: 12.35294
    },
    h: {
      geometryType: THREE.SphereGeometry,
      geometry: [ 0.755 * 6371, 32, 32 ],
      materialType: THREE.MeshBasicMaterial,
      material: { color: 0x05668d },
      start: [0, 0, 0.063 * AU],
      elements: { a: 0.063 * AU, e: 0.1 },
      period: 20
    }
  }

  const lines = [];
  // Used for FPS Calcs
  let last = 0;
  // Used to see whether the skybox has been set or not
  let sky;
  let clock = new THREE.Clock();
  var skyboxScene = new THREE.Scene();
  var scene = new THREE.Scene();
  var camera = new THREE.PerspectiveCamera( 40, document.body.clientWidth / window.innerHeight, 0.00001, 3000000000 );
  var renderer = new THREE.WebGLRenderer({ antialias: true, logarithmicDepthBuffer: true });
	// renderer.setPixelRatio( window.devicePixelRatio );

  document.getElementById('canvasWrapper').appendChild( renderer.domElement );
  resizeCanvas();
  resizeCanvas();
  renderer.autoClear = false;


  window.addEventListener('resize', resizeCanvas);
  window.addEventListener('orientationchange', resizeCanvas);

  // Add Planets
  let trappist_1a = createMesh(trappist_1.a);
  let trappist_1b = createMesh(trappist_1.b);
  let trappist_1c = createMesh(trappist_1.c);
  let trappist_1d = createMesh(trappist_1.d);
  let trappist_1e = createMesh(trappist_1.e);
  let trappist_1f = createMesh(trappist_1.f);
  let trappist_1g = createMesh(trappist_1.g);
  let trappist_1h = createMesh(trappist_1.h);

  scene.add(trappist_1a);
  scene.add(trappist_1b);
  scene.add(trappist_1c);
  scene.add(trappist_1d);
  scene.add(trappist_1e);
  scene.add(trappist_1f);
  scene.add(trappist_1g);
  scene.add(trappist_1h);

  // Set Camera
  camera.position.y = AU / 80;
  camera.position.z = AU / 20;
  camera.position.x = AU / 100
  camera.lookAt(trappist_1a.position);

  // Add Ellipses
  function createOrbitLine(elements) {
    var material = new THREE.LineBasicMaterial({ color: 0xffffff, transparent: true, opacity: 0.25 });
    const {a, e} = elements;
    const b = a * Math.sqrt( 1 - ( e ** 2 ) );
    const c = - Math.sqrt( ( a ** 2 ) - ( b ** 2 ) );

    var ellipse = new THREE.EllipseCurve(0, 0, a, b, 0, 2.0 * Math.PI, false);
    var ellipsePath = new THREE.CurvePath();
    ellipsePath.add(ellipse);
    var ellipseGeometry = ellipsePath.createPointsGeometry(100).rotateX(Math.PI / 2).translate(0, 0, c);
    let line = new THREE.Line(ellipseGeometry, material);
    line.visible = false;
    return line;
  }

  Object.keys(trappist_1)
    .filter((key) => (trappist_1[key].elements !== undefined))
    .forEach((key) => {
      let line = createOrbitLine(trappist_1[key].elements)
      lines.push(line);
      scene.add(line);
    }
  );

  // Add Mouse Controls
  const controls = new THREE.OrbitControls( camera, renderer.domElement );
  controls.maxDistance = 10 * AU;

  render();

  //Functions

  function render() {
    requestAnimationFrame( render );
    let delta = clock.getDelta();

    // Add sky when load background button is clicked
    if (settings.background.showSky && !settings.background.isLoading && sky === undefined) {
      addSkybox();
    }

    // Show/hide sky
    if (sky !== undefined && settings.background.showSky && sky.material.opacity < 1) {
      sky.visible = true;
      sky.material.transparent = true;
      sky.material.opacity += delta;
    }
    if (sky !== undefined && sky.material.opacity > 1) {
      sky.material.opacity = 1;
      sky.material.transparent = false;
    }
    if (sky !== undefined && !settings.background.showSky && sky.material.opacity > 0 ) {
      sky.material.transparent = true;
      sky.material.opacity -= delta / 2;
    }
    if (sky !== undefined && !settings.background.showSky && sky.material.opacity <= 0) {
      sky.visible = false;
    }

    if (settings.orbit.showOrbits && !lines[0].visible) {
      lines.forEach((line) => {line.visible = true})
    }
    if (!settings.orbit.showOrbits && lines[0].visible) {
      lines.forEach((line) => {line.visible = false})
    }

    if (!settings.pause.isPaused) {
      let nextPos = next(trappist_1b, delta, trappist_1.b.elements, trappist_1.b.period);
      trappist_1b.position.setFromSpherical(nextPos);

      nextPos = next(trappist_1c, delta, trappist_1.c.elements, trappist_1.c.period);
      trappist_1c.position.setFromSpherical(nextPos);

      nextPos = next(trappist_1d, delta, trappist_1.d.elements, trappist_1.d.period);
      trappist_1d.position.setFromSpherical(nextPos);

      nextPos = next(trappist_1e, delta, trappist_1.e.elements, trappist_1.e.period);
      trappist_1e.position.setFromSpherical(nextPos);

      nextPos = next(trappist_1f, delta, trappist_1.f.elements, trappist_1.f.period);
      trappist_1f.position.setFromSpherical(nextPos);

      nextPos = next(trappist_1g, delta, trappist_1.g.elements, trappist_1.g.period);
      trappist_1g.position.setFromSpherical(nextPos);

      nextPos = next(trappist_1h, delta, trappist_1.h.elements, trappist_1.h.period);
      trappist_1h.position.setFromSpherical(nextPos);
    }

    // Set camera to watch a planet from the surface of another planet
    // camera.position.set(trappist_1c.position.x, trappist_1c.position.y + trappist_1.c.geometry[0] + 1, trappist_1c.position.z);
    // camera.lookAt(trappist_1b.position);

    fpsCalc();

    renderer.clear();
    renderer.render( skyboxScene, camera );
    renderer.clearDepth();
    renderer.render( scene, camera );
  }

  function addSkybox() {
    settings.background.isLoading = true;
    let textureLoader = new THREE.TextureLoader();
    textureLoader.load(skydome_med, function(texture) {
      let material = new THREE.MeshBasicMaterial({ map: texture });
      let skyGeo = new THREE.SphereGeometry(AU * 10000, 25, 25);
      sky = new THREE.Mesh(skyGeo, material);
      sky.material.side = THREE.BackSide;
      sky.material.depthFunc = THREE.NeverDepth;
      sky.material.transparent = true;
      sky.material.opacity = 0;
      skyboxScene.add(sky);

      settings.background.isLoading = false;
      settings.background.fetchedSkybox = true;
    });
  }

  function resizeCanvas(){
    renderer.setSize( document.body.clientWidth, window.innerHeight );
    camera.aspect = document.body.clientWidth / window.innerHeight;
    camera.updateProjectionMatrix();
  }

  function fpsCalc() {
    let now = performance.now();
    let fps = 1000 / (now - last);
    last = now;

    frames_per_sec = Math.floor(fps, 10);
  }
}

export default Planets;
