import { useRef, useMemo } from "react"
import { useFrame } from "@react-three/fiber"
import { Points, PointMaterial } from "@react-three/drei"
import * as THREE from "three"

const ParticleBackground = ({ count = 4000 }) => {
  const points = useRef<THREE.Points>(null!)

  const particlesPosition = useMemo(() => {
    const positions = new Float32Array(count * 3)
    for (let i = 0; i < count; i++) {
      positions[i * 3] = (Math.random() - 0.5) * 10
      positions[i * 3 + 1] = (Math.random() - 0.5) * 10
      positions[i * 3 + 2] = (Math.random() - 0.5) * 10
    }
    return positions
  }, [count])

  const particleColors = useMemo(() => {
    const colors = new Float32Array(count * 3)
    const color1 = new THREE.Color("#22c55e") // Green
    const color2 = new THREE.Color("#3b82f6") // Blue
    const greyColor = new THREE.Color("#808080") // Grey

    for (let i = 0; i < count; i++) {
      let finalColor
      if (Math.random() < 0.3) {
        // 30% chance of grey
        finalColor = greyColor
      } else {
        // 70% chance of blue-green gradient
        finalColor = color1.clone().lerp(color2, Math.random())
      }
      colors[i * 3] = finalColor.r
      colors[i * 3 + 1] = finalColor.g
      colors[i * 3 + 2] = finalColor.b
    }
    return colors
  }, [count])

  useFrame((state) => {
    const { clock, camera } = state
    for (let i = 0; i < count; i++) {
      const i3 = i * 3
      points.current.geometry.attributes.position.array[i3] += Math.sin(clock.elapsedTime + i3) * 0.0001
      points.current.geometry.attributes.position.array[i3 + 1] += Math.cos(clock.elapsedTime + i3 + 1) * 0.0001
      points.current.geometry.attributes.position.array[i3 + 2] += Math.sin(clock.elapsedTime + i3 + 2) * 0.0001
    }
    points.current.geometry.attributes.position.needsUpdate = true

    // Adjust point size based on camera position
    points.current.material.size = 0.002 * camera.position.z
  })

  return (
    <Points ref={points} positions={particlesPosition} stride={3} frustumCulled={false}>
      <PointMaterial
        transparent
        vertexColors
        size={0.002}
        sizeAttenuation={true}
        depthWrite={false}
        blending={THREE.AdditiveBlending}
      />
      <bufferAttribute attach="geometry-attributes-color" count={count} array={particleColors} itemSize={3} />
    </Points>
  )
}

export default ParticleBackground

