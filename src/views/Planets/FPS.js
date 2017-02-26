import React from 'react';

// FPS Component
const FPS = ({fps}) => (
  <p
  style={{
    position: 'absolute',
    bottom: '1rem',
    left: '1rem',
    color: 'lightgrey'
  }}>fps: {fps}</p>
);

export default FPS;
