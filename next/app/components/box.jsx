'use client'
import { createRoot } from 'react-dom/client'
import React, { useRef, useState } from 'react'
import { Canvas, useFrame } from '@react-three/fiber'
import { CameraControls, OrbitControls, Stats } from '@react-three/drei'
import * as THREE from 'three'
import react from 'react'
import * as BufferGeometryUtils from "three/examples/jsm/utils/BufferGeometryUtils.js"
function EthModel(props) {

 
  function makePart(pts){
    let g = new THREE.BufferGeometry().setFromPoints(pts.map(p => {return new THREE.Vector3(p[0], p[1], p[2])}));


    let index = [
      0, 1, 2,
      0, 2, 3,
      0, 3, 4,
      0, 4, 1
    ];
    g.setIndex(index);
    g.computeVertexNormals();
    return g;
  }
  
  let gPartTop = makePart([
    [0, 1, 1], // pinnacle
    [0, -1, 0],
    [2, 0, 0],
    [0, 3, 0],
    [-2, 0, 0]
  ]);
  
  let gPartBottom = makePart([
    [0, -1.125, 0.5], // pinnacle
    [0, -3, 0],
    [2, 0, 0],
    [0, -1, 0],
    [-2, 0, 0]
  ]);
  gPartBottom.translate(0, -0.5, 0);
  let gFront = BufferGeometryUtils.mergeBufferGeometries([gPartTop, gPartBottom]);
  let gBack = gFront.clone();
  gBack.rotateY(Math.PI);
  let g = BufferGeometryUtils.mergeBufferGeometries([gFront, gBack]);
  g = g.toNonIndexed();
  g.computeVertexNormals();

  // This reference will give us direct access to the mesh
  const mesh = useRef()



  return (
    <mesh
    geometry={g}
      {...props}
      ref={mesh}>
      <meshLambertMaterial color={'#4b7aab'}  />
    </mesh>
  )
}

export const Sphere = () => {
  return(
    <Canvas>
      <Stats showPanel={0} className="stats"  />
      <OrbitControls />
  <ambientLight />
  <pointLight position={[10, 10, 10]} />
  <EthModel position={[0, 0, 0]} />
</Canvas>
  )
}
