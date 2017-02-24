import React, { Component } from 'react';
import * as THREE from 'three';

let frames_per_sec = 5;

class Planets extends Component {
  constructor(props) {
    super(props);

    this.updateFPS = this.updateFPS.bind(this);
    this.state = {};
  }

  updateFPS() {
    this.setState({ fps: frames_per_sec });
    // frames_per_sec++;
  }

  componentDidMount() {
    renderScene()
    this.fpsID = setInterval(this.updateFPS, 100)
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

const FPS = ({fps}) => (
  <p>fps: {fps}</p>
);

function renderScene() {
  let last = 0;
  var scene = new THREE.Scene();
  var camera = new THREE.PerspectiveCamera( 75, window.innerWidth / window.innerHeight, 0.1, 1000 );

  var renderer = new THREE.WebGLRenderer();
  renderer.setSize( window.innerWidth / 2, window.innerHeight / 2 );
  document.getElementById('canvasWrapper').appendChild( renderer.domElement );

  var geometry = new THREE.BoxGeometry( 1, 1, 1 );
  var material = new THREE.MeshBasicMaterial( { color: 0x00ff00 } );
  var cube = new THREE.Mesh( geometry, material );
  scene.add( cube );

  camera.position.z = 5;

  function render() {
  	requestAnimationFrame( render );
    cube.rotation.x += 0.1;
    cube.rotation.y += 0.1;
  	renderer.render( scene, camera );
    fpsCalc();
  }
  render();

  function fpsCalc() {
    let now = performance.now();
    let fps = 1000 / (now - last);
    last = now;

    frames_per_sec = Math.floor(fps, 10);
  }
}

export default Planets;
