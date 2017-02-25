import React, { Component } from 'react';
import * as THREE from 'three';
import Three_OrbitControls from 'three-orbit-controls';
// AMD Module format hackery
const OrbitControls = Three_OrbitControls(THREE);

let frames_per_sec = 5;

// Planets Component
class Planets extends Component {
  constructor(props) {
    super(props);

    this.updateFPS = this.updateFPS.bind(this);
    this.state = {};
  }

  updateFPS() {
    this.setState({ fps: frames_per_sec });
  }

  componentDidMount() {
    renderScene()
    this.fpsID = setInterval(this.updateFPS, 500)
  }

  componentWillUnmount() {
    clearInterval(this.fpsID);
  }

  render() {
    return (
      <div id="canvasWrapper" style={{
        textAlign: 'center',
        marginTop: '2rem'
      }}>
        <h3>Trappist</h3>
        <FPS fps={this.state.fps} />
        <div id="canvasWrapper" style={{
          display: 'inline-block'
        }}>
        </div>
      </div>
    )
  }
}

// Orbital path
//
// r(theta) = a * (1 - e^2) / (1 + e * cos(theta))

// Conversion to cartesian
// x = r * cos(theta)
// y = r * sin(theta)

// Vector = new THREE.Vector3(x, 0, y)

const next = (mesh, delta_t, elements) => {
  let radialSpeed = 1; // radians per millisecond
  // Consider using time as an input, make it more functional
  const {a, e} = elements;
  let pos = mesh.position.clone();
  let startPos = (new THREE.Spherical()).setFromVector3(pos);
  let deltaTheta = radialSpeed * delta_t;
  let startTheta = startPos.theta;
  let theta = startTheta + deltaTheta;
  let r = a * (1 - ( e ** 2 ) ) / (1 + ( e * Math.cos(theta) ) );

  let nextPosSpherical = new THREE.Spherical(r, Math.PI / 2, theta);
  // let nextPosVector = new THREE.Vector3().setFromSpherical(new THREE.Spherical(r, Math.PI / 2, theta));
  // debugger;
  return nextPosSpherical;
}

// FPS Component
const FPS = ({fps}) => (
  <p>fps: {fps}</p>
);

function renderScene() {
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
      geometry: [ 0.6, 16, 16 ],
      materialType: THREE.MeshBasicMaterial,
      material: { color: 0xe76f51 },
      start: [0, 0, 0]
    },
    b: {
      geometryType: THREE.SphereGeometry,
      geometry: [ 0.2, 32, 32 ],
      materialType: THREE.MeshBasicMaterial,
      material: { color: 0xf4a261 },
      start: [2, 2, 2]
    },
    c: {
      geometryType: THREE.SphereGeometry,
      geometry: [ 0.2, 32, 32 ],
      materialType: THREE.MeshBasicMaterial,
      material: { color: 0xffa69e },
      start: [-1.5, 0, -1]
    },
    d: {
      geometryType: THREE.SphereGeometry,
      geometry: [ 0.2, 16, 16 ],
      materialType: THREE.MeshBasicMaterial,
      material: { color: 0x028090 },
      start: [0, 0, 4]
    },
    e: {
      geometryType: THREE.SphereGeometry,
      geometry: [ 0.2, 16, 16 ],
      materialType: THREE.MeshBasicMaterial,
      material: { color: 0x05668d },
      start: [5, 0, 0]
    }
  }

  // Used for FPS Calcs
  let last = 0;
  let clock = new THREE.Clock();
  // THREE.Object3D.DefaultMatrixAutoUpdate = true;
  var scene = new THREE.Scene();
  var camera = new THREE.PerspectiveCamera( 45, window.innerWidth / window.innerHeight, 0.1, 1000 );

  var renderer = new THREE.WebGLRenderer();
  renderer.setSize( window.innerWidth / 2, window.innerHeight / 2 );
  document.getElementById('canvasWrapper').appendChild( renderer.domElement );

  let trappist_1a = addToScene(scene, trappist_1.a);
  let trappist_1b = addToScene(scene, trappist_1.b);
  let trappist_1c = addToScene(scene, trappist_1.c);
  let trappist_1d = addToScene(scene, trappist_1.d);
  let trappist_1e = addToScene(scene, trappist_1.e);
  camera.position.z = 10;

  new OrbitControls( camera, renderer.domElement );

  render();

  //Functions

  function render() {
  	requestAnimationFrame( render );
  	renderer.render( scene, camera );

    let nextPos =  next(trappist_1b, clock.getDelta(), { a: 2, e: 0.5 });
    trappist_1b.position.setFromSpherical(nextPos);

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
