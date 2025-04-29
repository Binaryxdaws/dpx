import { useRef, useEffect } from "react"
import { Canvas, useFrame, useThree } from "@react-three/fiber"
import ParticleBackground from "./ParticleBackground"

const CameraController = () => {
  const { camera } = useThree()
  const cameraRef = useRef(camera)
  const lastScrollY = useRef(0)
  const targetZoom = useRef(10)

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY
      const scrollDirection = currentScrollY > lastScrollY.current ? "down" : "up"

      if (scrollDirection === "down") {
        targetZoom.current = Math.max(6, targetZoom.current - 0.05)
      } else {
        targetZoom.current = Math.min(14, targetZoom.current + 0.05)
      }

      lastScrollY.current = currentScrollY
    }

    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  useFrame(() => {
    cameraRef.current.position.z += (targetZoom.current - cameraRef.current.position.z) * 0.03
    cameraRef.current.updateProjectionMatrix()
  })

  return null
}

const ParticleBackgroundWrapper = () => {
  return (
    <div className="fixed inset-0 z-0">
      <Canvas camera={{ position: [0, 0, 10], fov: 75, near: 0.1, far: 1000 }}>
        <CameraController />
        <ParticleBackground />
      </Canvas>
    </div>
  )
}

export default ParticleBackgroundWrapper

