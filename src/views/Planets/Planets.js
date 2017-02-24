import React, { Component } from 'react';
import * as THREE from 'three';

class Planets extends Component {

  componentDidMount() {
    renderScene()
  }

  render() {
    return (
      <div id="canvasWrapper" style={{
        textAlign: 'center'
      }}>
        <p>Trappist</p>
        <div id="canvasWrapper" style={{
          display: 'inline-block'
        }}></div>
      </div>
    )
  }
}

function renderScene() {
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
  }
  render();
}

export default Planets;
