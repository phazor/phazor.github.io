import React, { Component } from 'react';
import * as THREE from 'three';
import Three_OrbitControls from 'three-orbit-controls';
import Detector from '../../lib/three-detector';
import arrow from './arrow.svg';

const OrbitControls = Three_OrbitControls(THREE); // AMD Module format coercion
let frames_per_sec = 0;

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
    this.fpsID = setInterval(this.updateFPS, 500);
  }

  componentWillUnmount() {
    clearInterval(this.fpsID);
  }

  render() {
    return (
      <div id="Planets" style={{
        textAlign: 'center',
        marginTop: '2rem'
      }}>
        <h3>Trappist-1</h3>
        <p>This page shows a scale model of the Trappist-1 system. The speed has been increased by a factor of 8,640 so that 1 earth day equals 10 simulation seconds.</p>
        <button
           onClick={this.handleFullScreenClick}
           style={{ marginBottom: '2rem' }}>
           Full Screen
         </button>
        <p>For more information about the Trappist-1 system, see the <a href="https://www.nasa.gov/press-release/nasa-telescope-reveals-largest-batch-of-earth-size-habitable-zone-planets-around">NASA Press Release</a>.</p>
        <div id="canvasWrapper" style={{
          display: 'inline-block',
          position: 'relative'
        }}>
        {(this.state.webGL) &&
          <div>
            <FPS fps={this.state.fps} />
            <img
              src={arrow}
              onClick={this.handleMoveToTopClick}
              style={{
                width: '80px',
                height: 'auto',
                cursor: 'pointer',
                padding: '1rem',
                position: 'absolute',
                right: '1rem'
              }}/>
          </div>
        }
        </div>

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

// FPS Component
const FPS = ({fps}) => (
  <p
  style={{
    color: 'white',
    position: 'absolute',
    top: '1rem',
    left: '1rem'
  }}>fps: {fps}</p>
);

function renderScene() {
  const AU = 149597870.7;
  let addToScene = (scene, object) => {
    let mesh = new THREE.Mesh(
      new (Function.prototype.bind.apply(object.geometryType, [null, ...object.geometry]))(),
      new (Function.prototype.bind.call(object.materialType, null, object.material))()
    )
    scene.add(mesh);
    mesh.position.set(...object.start);
    return mesh;
  }

  let trappist_1 = {
    a: {
      geometryType: THREE.SphereGeometry,
      geometry: [ 0.114 * 695700, 32, 32 ],
      materialType: THREE.MeshBasicMaterial,
      material: { color: 0xe76f51 },
      start: [0, 0, 0]
    },
    b: {
      geometryType: THREE.SphereGeometry,
      geometry: [ 1.086 * 6371, 32, 32 ],
      materialType: THREE.MeshBasicMaterial,
      material: { color: 0xf4a261 },
      start: [0, 0, 0.01111 * AU],
      period: 1.51087081
    },
    c: {
      geometryType: THREE.SphereGeometry,
      geometry: [ 1.056 * 6371, 32, 32 ],
      materialType: THREE.MeshBasicMaterial,
      material: { color: 0xffa69e },
      start: [0, 0, 0.01522 * AU],
      period: 2.4218233
    },
    d: {
      geometryType: THREE.SphereGeometry,
      geometry: [ 0.772 * 6371, 32, 32 ],
      materialType: THREE.MeshBasicMaterial,
      material: { color: 0x028090 },
      start: [0, 0, 0.021 * AU],
      period: 4.049610
    },
    e: {
      geometryType: THREE.SphereGeometry,
      geometry: [ 0.918 * 6371, 32, 32 ],
      materialType: THREE.MeshBasicMaterial,
      material: { color: 0x05668d },
      start: [0, 0, 0.028 * AU],
      period: 6.099615
    },
    f: {
      geometryType: THREE.SphereGeometry,
      geometry: [ 1.045 * 6371, 32, 32 ],
      materialType: THREE.MeshBasicMaterial,
      material: { color: 0x05668d },
      start: [0, 0, 0.037 * AU],
      period: 9.206690
    },
    g: {
      geometryType: THREE.SphereGeometry,
      geometry: [ 1.127 * 6371, 32, 32 ],
      materialType: THREE.MeshBasicMaterial,
      material: { color: 0x05668d },
      start: [0, 0, 0.045 * AU],
      period: 12.35294
    },
    h: {
      geometryType: THREE.SphereGeometry,
      geometry: [ 0.755 * 6371, 32, 32 ],
      materialType: THREE.MeshBasicMaterial,
      material: { color: 0x05668d },
      start: [0, 0, 0.063 * AU],
      period: 20
    }
  }

  // Used for FPS Calcs
  let last = 0;
  let clock = new THREE.Clock();
  var scene = new THREE.Scene();
  var camera = new THREE.PerspectiveCamera( 40, window.innerWidth / window.innerHeight, 0.00001, 3000000000 );

  var renderer = new THREE.WebGLRenderer({ antialias: true });
  renderer.setSize( window.innerWidth, window.innerHeight );
  document.getElementById('canvasWrapper').appendChild( renderer.domElement );

  let trappist_1a = addToScene(scene, trappist_1.a);
  let trappist_1b = addToScene(scene, trappist_1.b);
  let trappist_1c = addToScene(scene, trappist_1.c);
  let trappist_1d = addToScene(scene, trappist_1.d);
  let trappist_1e = addToScene(scene, trappist_1.e);
  let trappist_1f = addToScene(scene, trappist_1.f);
  let trappist_1g = addToScene(scene, trappist_1.g);
  let trappist_1h = addToScene(scene, trappist_1.h);
  camera.position.y = AU / 80;
  camera.position.z = AU / 20;
  camera.position.x = AU / 100
  camera.lookAt(trappist_1a.position);

  new OrbitControls( camera, renderer.domElement );

  render();

  //Functions

  function render() {
  	requestAnimationFrame( render );
  	renderer.render( scene, camera );

    let delta = clock.getDelta();

    let nextPos = next(trappist_1b, delta, { a: trappist_1.b.start[2] , e: 0.081 }, trappist_1.b.period);
    trappist_1b.position.setFromSpherical(nextPos);

    nextPos = next(trappist_1c, delta, { a: trappist_1.c.start[2] , e: 0.083 }, trappist_1.c.period);
    trappist_1c.position.setFromSpherical(nextPos);

    nextPos = next(trappist_1d, delta, { a: trappist_1.d.start[2] , e: 0.070 }, trappist_1.d.period);
    trappist_1d.position.setFromSpherical(nextPos);

    nextPos = next(trappist_1e, delta, { a: trappist_1.e.start[2] , e: 0.085 }, trappist_1.e.period);
    trappist_1e.position.setFromSpherical(nextPos);

    nextPos = next(trappist_1f, delta, { a: trappist_1.f.start[2] , e: 0.063 }, trappist_1.f.period);
    trappist_1f.position.setFromSpherical(nextPos);

    nextPos = next(trappist_1g, delta, { a: trappist_1.g.start[2] , e: 0.061 }, trappist_1.g.period);
    trappist_1g.position.setFromSpherical(nextPos);

    nextPos = next(trappist_1h, delta, { a: trappist_1.h.start[2] , e: 0.081 }, trappist_1.h.period);
    trappist_1h.position.setFromSpherical(nextPos);

    fpsCalc();
  }

  function fpsCalc() {
    let now = performance.now();
    let fps = 1000 / (now - last);
    last = now;

    frames_per_sec = Math.floor(fps, 10);
  }
}

export default Planets;
