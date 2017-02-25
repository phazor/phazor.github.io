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

// FPS Component
const FPS = ({fps}) => (
  <p>fps: {fps}</p>
);

function renderScene() {
  let addToScene = (scene, object) => {
    let start = new THREE.Vector3(...object.start);
    let mesh = new THREE.Mesh(
      new (Function.prototype.bind.apply(object.geometryType, [null, ...object.geometry]))(),
      new (Function.prototype.bind.call(object.materialType, null, object.material))()
    // ).translateOnAxis(
    //   start.normalize(),
    //   start.length()
    )
    scene.add(mesh);
    mesh.position.set(...object.start);
  }

  let trappist_1 = {
    a: {
      geometryType: THREE.SphereGeometry,
      geometry: [ 0.6, 16, 16 ],
      materialType: THREE.MeshBasicMaterial,
      material: { color: 0xff0000 },
      start: [0, 0, 0]
    },
    b: {
      geometryType: THREE.SphereGeometry,
      geometry: [ 0.2, 16, 16 ],
      materialType: THREE.MeshBasicMaterial,
      material: { color: 0x00ff00 },
      start: [5, 0, 0]
    }
  }

  // Used for FPS Calcs
  let last = 0;
  let controls;
  var scene = new THREE.Scene();
  var camera = new THREE.PerspectiveCamera( 45, window.innerWidth / window.innerHeight, 0.1, 1000 );

  var renderer = new THREE.WebGLRenderer();
  renderer.setSize( window.innerWidth / 2, window.innerHeight / 2 );
  document.getElementById('canvasWrapper').appendChild( renderer.domElement );

  addToScene(scene, trappist_1.a);
  addToScene(scene, trappist_1.b);
  camera.position.z = 10;

  controls = new OrbitControls( camera, renderer.domElement );

  render();

  //Functions

  function render() {
  	requestAnimationFrame( render );
  	renderer.render( scene, camera );
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
