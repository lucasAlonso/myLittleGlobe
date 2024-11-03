'use client'
import React, { useRef } from 'react'
import * as THREE from 'three'
import { Suspense } from 'react'
import { Canvas, useFrame, useLoader } from '@react-three/fiber'
import { Center, OrbitControls, Stars } from '@react-three/drei'
import { TextureLoader } from 'three'

export function Earth({ night }) {
  const [colorMap, normalMap, specularMap, cloudsMap, nightMap] = useLoader(TextureLoader, [
    '/assets/8k_earth_daymap.jpg',
    '/assets/8k_earth_normal_map.jpg',
    '/assets/8k_earth_specular_map.jpg',
    '/assets/8k_earth_clouds.jpg',
    '/assets/8k_earth_nightmap.jpg',
  ])

  const normalEarthRef = useRef(null)
  const cloudsRef = useRef(null)
  useFrame(({ clock }) => {
    const elapsedTime = clock.getElapsedTime()
    normalEarthRef.current.rotation.y = elapsedTime / 24
    cloudsRef.current.rotation.y = elapsedTime / 18
    cloudsRef.current.rotation.x = elapsedTime / 32
  })

  return (
    <>
      <ambientLight intensity={0.4} />
      <pointLight color='#f6f6f6' intensity={2} position={[2, 0, 2]} />
      <Stars radius={100} depth={50} count={5000} factor={12} saturation={0} fade />
      <mesh ref={cloudsRef}>
        <sphereGeometry args={[1.01, 32, 32]} />
        <meshPhongMaterial map={cloudsMap} opacity={0.4} side={THREE.DoubleSide} depthWrite={true} transparent={true} />
      </mesh>
      <mesh ref={normalEarthRef}>
        <sphereGeometry args={[1, 32, 32]} />
        <meshPhongMaterial specularMap={specularMap} />
        <meshStandardMaterial
          map={night ? nightMap : colorMap}
          normalMap={normalMap}
          metalness={0.25}
          roughness={0.5}
        />
      </mesh>
      <OrbitControls
        enableZoom={true}
        enablePan={true}
        enableRotate={true}
        rotateSpeed={0.5}
        zoomSpeed={0.8}
        panSpeed={0.8}
        minDistance={1}
        maxDistance={5}
      />
    </>
  )
}
