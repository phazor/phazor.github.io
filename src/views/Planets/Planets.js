import React, { Component } from 'react';
import * as THREE from 'three';
import Three_OrbitControls from 'three-orbit-controls';
import Detector from '../../lib/three-detector';
import Overlay from './Overlay';
// Assets
import arrow from './assets/arrow.svg';
import sunmap from './assets/1a_map.jpg';
import skydome_med from './assets/eso0932a_med.jpg';
import './Planets.css';

THREE.OrbitControls = Three_OrbitControls(THREE); // AMD Module format coercion

let frames_per_sec = 0;
// TODOS:
// High res background image option
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
      return 'Load Galaxy (5MB)';
    },
    showSky: false,
    isLoading: false,
    fetchedSkybox: false
  },
  orbit: {
    id: 2,
    showOrbits: true,
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
  dpiScaling: {
    id: 5,
    showHighDPIScaling: false,
    handleClick: (setting) => {
      setting.showHighDPIScaling = !setting.showHighDPIScaling;
    },
    text: function() {
      return (this.showHighDPIScaling) ? 'Low DPI' : 'High DPI';
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

// This variable represents a horrible way of controlling the render loop.
// TODO: Refactor render loop to not require this hack.
// Store system's state in redux, or in dedicated component, and externalise
// requestAnimationFrame in component so that it can be interrupted from the
// outside of the render loop.
let active = false;

// Planets Component
class Planets extends Component {
  constructor(props) {
    super(props);
    this.updateFPS = this.updateFPS.bind(this);
  }

  state = {
    fps: null
  }

  handleFullScreenClick() {
    document.getElementById('canvasWrapper').scrollIntoView(true);
  }

  handleMoveToTopClick() {
    document.body.scrollIntoView(true);
  }

  updateFPS() {
    this.setState({ fps: frames_per_sec });
  }

  componentDidMount() {
    this.setState({ webGL: Detector.webgl });
    if (Detector.webgl) {
      active = true; // Tells the render loop that it can start (rather clumsily)
      renderScene();
    }
    this.fpsInterval = setInterval(this.updateFPS, 100);
  }

  componentWillUnmount() {
    active = false; // Kills the render loop (rather clumsily)
    clearInterval(this.fpsInterval);
  }

  render() {
    return (
      <div className="Planets" id="Planets">
        {/* Intro text */}
        <div className="container">
          <h3>Trappist-1</h3>
          <p>This page shows a model of the Trappist-1 solar system.</p>
          <p>It is a unique solar system because the planets are earth-like in size and have much closer orbits than ours. The star, planets and their orbital paths have been kept to scale to help to visualise this.</p>
          <p>The simulation's speed has been increased by a factor of 8,640 so that 1 earth day equals 10 simulation seconds.</p>
          <p>For more information about Trappist-1, see the <a href="https://www.nasa.gov/press-release/nasa-telescope-reveals-largest-batch-of-earth-size-habitable-zone-planets-around">NASA Press Release</a> or the <a href="https://en.wikipedia.org/wiki/TRAPPIST-1">Wikipedia article</a>.</p>
          <img className="Arrow Down" alt="Jump to simulation" src={arrow} onClick={this.handleFullScreenClick}/>
        </div>

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
// TODO: For the correct time-dependent solution, radial speed will need to be
// adjusted based on the bessel function:
// http://matlab-monkey.com/astro/keplerEquation/KeplerEquationPub.html
const _next = (body, delta_t, elements, period) => {
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

const _createTextLabel = (text) => {
    var div = document.createElement('div');
    div.className = 'text-label';
    div.style.position = 'absolute';
    div.style.width = 100;
    div.style.height = 100;
    div.innerHTML = text;
    div.style.top = -1000;
    div.style.left = -1000;

    return {
      element: div,
      parent: false,
      position: new THREE.Vector3(0,0,0),
      setHTML: function(html) {
        this.element.innerHTML = html;
      },
      setParent: function(threejsobj) {
        this.parent = threejsobj;
      },
      updatePosition: function(camera) {
        if(parent) {
          this.position.copy(this.parent.position);
        }

        var coords2d = this.get2DCoords(this.position, camera);
        this.element.style.left = coords2d.x + 'px';
        this.element.style.top = coords2d.y + 'px';
      },
      get2DCoords: function(position, camera) {
        var vector = position.project(camera);
        vector.x = (vector.x + 1)/2 * window.innerWidth;
        vector.y = -(vector.y - 1)/2 * window.innerHeight;
        return vector;
      }
    };
};

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
      start: [0, 0, 0],
      label: _createTextLabel('TRAPPIST-1a')
    },
    b: {
      geometryType: THREE.SphereGeometry,
      geometry: [ 1.086 * 6371, 32, 32 ],
      materialType: THREE.MeshBasicMaterial,
      material: { color: 0xf4a261 },
      start: [0, 0, 0.01111 * AU],
      elements: { a: 0.01111 * AU, e: 0.081 },
      period: 1.51087081,
      label: _createTextLabel('TRAPPIST-1b')
    },
    c: {
      geometryType: THREE.SphereGeometry,
      geometry: [ 1.056 * 6371, 32, 32 ],
      materialType: THREE.MeshBasicMaterial,
      material: { color: 0xffa69e },
      start: [0, 0, 0.01522 * AU],
      elements: { a: 0.01522 * AU, e: 0.083 },
      period: 2.4218233,
      label: _createTextLabel('TRAPPIST-1c')
    },
    d: {
      geometryType: THREE.SphereGeometry,
      geometry: [ 0.772 * 6371, 32, 32 ],
      materialType: THREE.MeshBasicMaterial,
      material: { color: 0x028090 },
      start: [0, 0, 0.021 * AU],
      elements: { a: 0.021 * AU, e: 0.070 },
      period: 4.049610,
      label: _createTextLabel('TRAPPIST-1d')
    },
    e: {
      geometryType: THREE.SphereGeometry,
      geometry: [ 0.918 * 6371, 32, 32 ],
      materialType: THREE.MeshBasicMaterial,
      material: { color: 0x05668d },
      start: [0, 0, 0.028 * AU],
      elements: { a: 0.028 * AU, e: 0.085 },
      period: 6.099615,
      label: _createTextLabel('TRAPPIST-1e')
    },
    f: {
      geometryType: THREE.SphereGeometry,
      geometry: [ 1.045 * 6371, 32, 32 ],
      materialType: THREE.MeshBasicMaterial,
      material: { color: 0x05668d },
      start: [0, 0, 0.037 * AU],
      elements: { a: 0.037 * AU, e: 0.063 },
      period: 9.206690,
      label: _createTextLabel('TRAPPIST-1f')
    },
    g: {
      geometryType: THREE.SphereGeometry,
      geometry: [ 1.127 * 6371, 32, 32 ],
      materialType: THREE.MeshBasicMaterial,
      material: { color: 0x05668d },
      start: [0, 0, 0.045 * AU],
      elements: { a: 0.045 * AU, e: 0.061 },
      period: 12.35294,
      label: _createTextLabel('TRAPPIST-1g')
    },
    h: {
      geometryType: THREE.SphereGeometry,
      geometry: [ 0.755 * 6371, 32, 32 ],
      materialType: THREE.MeshBasicMaterial,
      material: { color: 0x05668d },
      start: [0, 0, 0.063 * AU],
      elements: { a: 0.063 * AU, e: 0.1 },
      period: 20,
      label: _createTextLabel('TRAPPIST-1h')
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
  const wrapper = document.getElementById('canvasWrapper');
	// renderer.setPixelRatio( window.devicePixelRatio );

  wrapper.appendChild( renderer.domElement );
  resizeCanvas();
  resizeCanvas();
  renderer.autoClear = false;

  window.addEventListener('resize', resizeCanvas);
  window.addEventListener('orientationchange', resizeCanvas);

  // Add Planets and Stars
  const bodies = Object.keys(trappist_1).map(objKey => {
    let objDef = trappist_1[objKey];
    let mesh = createMesh(objDef);
    objDef.label.setParent(mesh);
    wrapper.appendChild(objDef.label.element);
    return mesh;
  });
  bodies.forEach(body => scene.add(body));

  // Set Camera
  camera.position.y = AU / 80;
  camera.position.z = AU / 20;
  camera.position.x = AU / 100
  camera.lookAt(bodies[0].position);

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

  // Main render loop
  function render() {
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
      bodies.filter((e, i) => i !== 0).forEach((body, index) => {
        const start = performance.now();
        let objDef = trappist_1[String.fromCharCode(index + 98)]
        let nextPos = _next(body, delta, objDef.elements, objDef.period);
        const end = performance.now();
        console.log('time taken: ', end - start);
        body.position.setFromSpherical(nextPos);
      });
    }

    // Update label positions
    bodies.forEach((body, index) => {
      let objDef = trappist_1[String.fromCharCode(index + 97)]
      objDef.label.updatePosition(camera);
    });

    // Apply high DPI (low performance) rendering
    if (settings.dpiScaling.showHighDPIScaling && (renderer.getPixelRatio() !== window.devicePixelRatio)) {
      renderer.setPixelRatio( window.devicePixelRatio );
    }

    // Apply low DPI (high performance) rendering
    if (!settings.dpiScaling.showHighDPIScaling && (renderer.getPixelRatio() !== 1)) {
      renderer.setPixelRatio( 1 );
    }

    // Set camera to watch a planet from the surface of another planet
    // camera.position.set(trappist_1c.position.x, trappist_1c.position.y + trappist_1.c.geometry[0] + 1, trappist_1c.position.z);
    // camera.lookAt(trappist_1b.position);

    fpsCalc();

    renderer.clear();
    renderer.render( skyboxScene, camera );
    renderer.clearDepth();
    renderer.render( scene, camera );

    if (active) { requestAnimationFrame( render ) }
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

  // Super basic fps calculator
  function fpsCalc() {
    let now = performance.now();
    let fps = 1000 / (now - last);
    last = now;

    frames_per_sec = Math.floor(fps, 10);
  }
}

export default Planets;
