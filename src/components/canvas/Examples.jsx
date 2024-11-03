'use client'

import { OrbitControls, Stars, useGLTF } from '@react-three/drei'
import { useFrame, useLoader } from '@react-three/fiber'
import * as THREE from 'three'
import { useMemo, useRef, useState } from 'react'
import { Line, useCursor, MeshDistortMaterial } from '@react-three/drei'
import { useRouter } from 'next/navigation'

export const Blobs = ({ route = '/', ...props }) => {
  const router = useRouter()
  const [hovered, hover] = useState(false)
  useCursor(hovered)
  return (
    <mesh
      onClick={() => router.push(route)}
      onPointerOver={() => hover(true)}
      onPointerOut={() => hover(false)}
      {...props}
    >
      <sphereGeometry args={[1, 64, 64]} />
      <MeshDistortMaterial roughness={0.5} color={hovered ? 'hotpink' : '#1fb2f5'} />
    </mesh>
  )
}

export const Blob = ({ route = '/blob', ...props }) => {
  const [colorMap, normalMap, specularMap, cloudsMap, nightMap] = useLoader(THREE.TextureLoader, [
    '/assets/8k_earth_daymap.jpg',
    '/assets/8k_earth_normal_map.jpg',
    '/assets/8k_earth_specular_map.jpg',
    '/assets/8k_earth_clouds.jpg',
    '/assets/8k_earth_nightmap.jpg',
  ])

  const normalEarthRef = useRef()
  useFrame(({ clock }) => {
    const elapsedTime = clock.getElapsedTime()
  })
  return (
    <>
      <ambientLight intensity={0.4} />
      <pointLight color='#f6f6f6' intensity={2} position={[2, 0, 2]} />
      <Stars radius={100} depth={50} count={5000} factor={12} saturation={0} fade />
      <mesh>
        <sphereGeometry args={[1.01, 32, 32]} />
        <meshPhongMaterial map={cloudsMap} opacity={0.4} side={THREE.DoubleSide} depthWrite={true} transparent={true} />
      </mesh>
      <mesh ref={normalEarthRef}>
        <sphereGeometry args={[1, 32, 32]} />
        <meshPhongMaterial specularMap={specularMap} />
        <meshStandardMaterial map={colorMap} normalMap={normalMap} metalness={0.25} roughness={0.5} />
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

export function Duck(props) {
  const { scene } = useGLTF('/globe.glb')

  useFrame((state, delta) => (scene.rotation.y += delta))

  return <primitive object={scene} {...props} />
}
export function Dog(props) {
  const { scene } = useGLTF('/dog.glb')

  return <primitive object={scene} {...props} />
}
