"use client"

import { useEffect, useState, useRef } from "react"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import {
  Search,
  Gift,
  Rocket,
  ArrowUpRight,
  ArrowDownRight,
  Moon,
  FishIcon as Whale,
  BarChart3,
  Eye,
  Zap,
  MessageSquare,
  ListPlus,
  TrendingUp,
  Signal,
  GraduationCap,
} from "lucide-react"
import { motion, useAnimation, useScroll, useInView } from "framer-motion"
import ParticleBackgroundWrapper from "../components/ParticleBackgroundWrapper"

const fadeInUp = {
  initial: { opacity: 0, y: 50 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.8, ease: [0.6, -0.05, 0.01, 0.99] },
}

const fadeInLeft = {
  initial: { opacity: 0, x: -50 },
  animate: { opacity: 1, x: 0 },
  transition: { duration: 0.8, ease: [0.6, -0.05, 0.01, 0.99] },
}

const fadeInRight = {
  initial: { opacity: 0, x: 50 },
  animate: { opacity: 1, x: 0 },
  transition: { duration: 0.8, ease: [0.6, -0.05, 0.01, 0.99] },
}

const stagger = {
  animate: {
    transition: {
      staggerChildren: 0.1,
    },
  },
}

const AnimatedSection = ({ children, variants }) => {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, amount: 0.3 })

  return (
    <motion.div ref={ref} initial="initial" animate={isInView ? "animate" : "initial"} variants={variants}>
      {children}
    </motion.div>
  )
}

export default function Home() {
  const controls = useAnimation()
  const { scrollYProgress } = useScroll()
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50)
    }

    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  useEffect(() => {
    controls.start("animate")
  }, [controls])

  return (
    <div className="min-h-screen bg-gradient-to-b from-black via-gray-900 to-black text-white">
      <ParticleBackgroundWrapper />
      <motion.div className="fixed top-0 left-0 right-0 h-2 bg-green-500" style={{ scaleX: scrollYProgress }} />

      {/* Header */}
      <motion.header
        className={`fixed w-full z-50 transition-all duration-300 ${scrolled ? "bg-black/80 backdrop-blur-md" : ""}`}
        initial={{ opacity: 0, y: -50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <div className="container mx-auto px-4 py-4">
          <div className="flex justify-between items-center">
            <div className="flex items-center gap-2">
              <Image
                src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/icondpv2-atPK2d9f4JTFl7R6R051XnYnvNCNMm.png"
                alt="DeepPockets Logo"
                width={40}
                height={40}
                className="rounded-full"
              />
              <span className="text-2xl font-bold">
                DEEP <span className="text-gradient-animated">POCKETS</span>
              </span>
            </div>
            <nav className="hidden md:flex items-center gap-6">
              <a href="#features" className="text-gray-400 hover:text-green-500 transition-colors">
                Features
              </a>
              <a href="#analysis" className="text-gray-400 hover:text-green-500 transition-colors">
                Analysis
              </a>
              <a href="#security" className="text-gray-400 hover:text-green-500 transition-colors">
                Security
              </a>
              <Button variant="ghost" size="icon">
                <Moon className="h-5 w-5" />
              </Button>
            </nav>
            <Button className="bg-gradient-to-r from-green-400 to-blue-500 hover:from-green-500 hover:to-blue-600 transition-all duration-300">
              Launch App
            </Button>
          </div>
        </div>
      </motion.header>

      {/* Hero Section */}
      <section className="py-32 border-b border-gray-800 relative overflow-hidden">
        <div className="container mx-auto px-4 relative z-10">
          <div className="flex flex-col md:flex-row items-center gap-12">
            <AnimatedSection variants={fadeInLeft}>
              <div className="flex-1 space-y-6">
                <h1 className="text-6xl font-bold leading-tight text-gradient-animated">
                  Advanced Crypto Analytics & Trading Intelligence
                </h1>
                <p className="text-xl text-gray-400">
                  Track whale movements, analyze market trends, and discover new opportunities with our comprehensive
                  crypto intelligence platform.
                </p>
                <div className="flex gap-4">
                  <Button
                    size="lg"
                    className="bg-gradient-to-r from-green-400 to-blue-500 hover:from-green-500 hover:to-blue-600 transition-all duration-300 animate-pulse"
                  >
                    Get Started
                  </Button>
                  <Button
                    size="lg"
                    variant="outline"
                    className="border-green-500 text-green-500 hover:bg-green-500/10 transition-all duration-300"
                  >
                    View Demo
                  </Button>
                </div>
              </div>
            </AnimatedSection>
            <AnimatedSection variants={fadeInRight}>
              <div className="flex-1">
                <Image
                  src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/1-KKBlboDaFtHvoEGp18QfuZQABd8eyV.png"
                  alt="DeepPockets Dashboard"
                  width={600}
                  height={400}
                  className="rounded-lg border border-gray-800 animate-float shadow-2xl shadow-green-500/20"
                />
              </div>
            </AnimatedSection>
          </div>
        </div>
        <div className="absolute inset-0 bg-grid-pattern opacity-10" />
      </section>

      {/* Features Grid */}
      <section id="features" className="py-20 relative">
        <div className="container mx-auto px-4 relative z-10">
          <AnimatedSection variants={fadeInUp}>
            <h2 className="text-4xl font-bold text-center mb-12 text-gradient-animated">Platform Features</h2>
          </AnimatedSection>
          <AnimatedSection variants={stagger}>
            <motion.div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              <FeatureCard
                title="Cryptocurrency Search"
                description="Find and analyze any cryptocurrency with ease"
                icon={<Search className="w-8 h-8 text-green-500" />}
                image="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Screenshot_2025-01-29-05-38-43-482_com.appypie.webapp-edit.jpg-eLQjooMBTjzJo6hSTrq8PsurdlA3Qd.jpeg"
                needsScroll={true}
              />
              <FeatureCard
                title="Whale Order Tracking"
                description="Monitor large transactions and market movements in real-time"
                icon={<Whale className="w-8 h-8 text-green-500" />}
                image="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/2-atHnMtkWSKez4GE0kP7LHs0uEvLtmE.png"
              />
              <FeatureCard
                title="Market Analysis"
                description="Comprehensive market data and trend analysis"
                icon={<BarChart3 className="w-8 h-8 text-green-500" />}
                image="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/3-lrWiVvTC76ETuFixr4XblTRTbTmvIq.png"
              />
              <FeatureCard
                title="Token Inspection"
                description="Deep dive into token metrics and security analysis"
                icon={<Eye className="w-8 h-8 text-green-500" />}
                image="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/4-EnxPR8ACGY2NrVxoVv5OGxLAZyz4Dq.png"
              />
              <FeatureCard
                title="Hot ICOs"
                description="Stay updated with the latest and most promising ICOs"
                icon={<Zap className="w-8 h-8 text-green-500" />}
                image="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/55-n7QTDxfBOf2eqGM3nHoN8UREB8r1kL.png"
              />
              <FeatureCard
                title="Community Hub"
                description="Connect with traders and share insights in real-time"
                icon={<MessageSquare className="w-8 h-8 text-green-500" />}
                image="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Screenshot_2025-01-29-05-40-37-133_com.appypie.webapp.jpg-QfnZNW9csOFy0fAEEB7cXMWe23V1Lr.jpeg"
                needsScroll={true}
              />
              <FeatureCard
                title="Airdrops"
                description="Discover and participate in upcoming crypto airdrops"
                icon={<Gift className="w-8 h-8 text-green-500" />}
                image="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/45-J9t2ij9uPiL1GW6nvoPLnIrQB68lKP.png"
              />
              <FeatureCard
                title="New Listings"
                description="Stay updated with the latest token listings and their performance"
                icon={<ListPlus className="w-8 h-8 text-green-500" />}
                image="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/3454-QfE9qSI4TKvDDcsidY3fgt7el4i4LF.png"
              />
              <FeatureCard
                title="Crypto Feed"
                description="Get the latest news and updates from the crypto world"
                icon={<Rocket className="w-8 h-8 text-green-500" />}
                image="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Screenshot_2025-01-29-05-41-14-144_com.appypie.webapp-edit.jpg-ENTMLE6G80MhaavsOmUOzbLhoUixji.jpeg"
                needsScroll={true}
              />
              <FeatureCard
                title="Trading Ideas"
                description="Access curated trading strategies and market insights"
                icon={<TrendingUp className="w-8 h-8 text-green-500" />}
                image="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Screenshot_2025-01-29-05-40-43-739_com.appypie.webapp.jpg-D9rQ2e71xdNObkR23uIG7lGpwKcRB7.jpeg"
                needsScroll={true}
              />
              <FeatureCard
                title="Signal Providers"
                description="Follow top-performing traders and their market signals"
                icon={<Signal className="w-8 h-8 text-green-500" />}
                image="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Screenshot_2025-01-29-05-40-46-615_com.appypie.webapp.jpg-CW2MxKXa0KHqCdGUdFIyqMfg29n0MR.jpeg"
                needsScroll={true}
              />
              <FeatureCard
                title="Education"
                description="Learn crypto trading with comprehensive courses and resources"
                icon={<GraduationCap className="w-8 h-8 text-green-500" />}
                image="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Screenshot_2025-01-29-05-40-51-432_com.appypie.webapp.jpg-UENMS91xEKLKazvhYyyaB85Uc2kgCJ.jpeg"
                needsScroll={true}
              />
            </motion.div>
          </AnimatedSection>
        </div>
        <div className="absolute inset-0 bg-circuit-pattern opacity-5" />
      </section>

      {/* Live Trading Section */}
      <section id="analysis" className="py-20 bg-gradient-to-b from-gray-900 to-black relative overflow-hidden">
        <div className="container mx-auto px-4 relative z-10">
          <AnimatedSection variants={fadeInUp}>
            <h2 className="text-4xl font-bold text-center mb-12 text-gradient-animated">Live Market Intelligence</h2>
          </AnimatedSection>
          <AnimatedSection variants={stagger}>
            <motion.div className="grid md:grid-cols-2 gap-8">
              <motion.div variants={fadeInLeft}>
                <Card className="bg-black/50 backdrop-blur-md border-gray-800 hover:border-green-500/50 transition-all duration-300">
                  <CardContent className="p-6">
                    <h3 className="text-2xl font-bold mb-4 text-gradient">Recent Whale Movements</h3>
                    <div className="space-y-4">
                      <WhaleTransaction exchange="Binance" token="BTC" amount="$85,19,664" type="buy" />
                      <WhaleTransaction exchange="Kraken" token="ETH" amount="$24,11,457" type="sell" />
                      <WhaleTransaction exchange="Huobi" token="BNB" amount="$1,08,82,832" type="buy" />
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
              <motion.div variants={fadeInRight}>
                <Card className="bg-black/50 backdrop-blur-md border-gray-800 hover:border-green-500/50 transition-all duration-300">
                  <CardContent className="p-6">
                    <h3 className="text-2xl font-bold mb-4 text-gradient">Token Security Metrics</h3>
                    <Image
                      src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/5-tXszUEpXmP3Wpgv9z8j3GUE7cEm04e.png"
                      alt="Security Metrics"
                      width={500}
                      height={300}
                      className="rounded-lg"
                    />
                  </CardContent>
                </Card>
              </motion.div>
            </motion.div>
          </AnimatedSection>
        </div>
        <div className="absolute inset-0 bg-data-pattern opacity-5" />
      </section>

      {/* Security Section */}
      <section id="security" className="py-20 relative overflow-hidden">
        <div className="container mx-auto px-4 text-center relative z-10">
          <AnimatedSection variants={fadeInUp}>
            <h2 className="text-4xl font-bold mb-6 text-gradient-animated">Enterprise-Grade Security Analysis</h2>
            <p className="text-xl text-gray-400 mb-12">
              Make informed decisions with our comprehensive risk assessment tools
            </p>
            <Image
              src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/4-EnxPR8ACGY2NrVxoVv5OGxLAZyz4Dq.png"
              alt="Risk Assessment"
              width={900}
              height={500}
              className="rounded-lg border border-gray-800 mx-auto shadow-2xl shadow-green-500/20 hover:scale-105 transition-transform duration-300"
            />
          </AnimatedSection>
        </div>
        <div className="absolute inset-0 bg-security-pattern opacity-5" />
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-r from-green-500/10 to-blue-500/10 relative overflow-hidden">
        <AnimatedSection variants={fadeInUp}>
          <div className="container mx-auto px-4 text-center relative z-10">
            <h2 className="text-4xl font-bold mb-6 text-gradient-animated">Ready to Start Trading Smarter?</h2>
            <p className="text-xl text-gray-400 mb-8">
              Join thousands of traders using DeepPockets for market intelligence
            </p>
            <Button
              size="lg"
              className="bg-gradient-to-r from-green-400 to-blue-500 hover:from-green-500 hover:to-blue-600 transition-all duration-300 animate-pulse"
            >
              Create Free Account
            </Button>
          </div>
        </AnimatedSection>
        <div className="absolute inset-0 bg-cta-pattern opacity-5" />
      </section>

      {/* Footer */}
      <footer className="border-t border-gray-800 py-8 relative overflow-hidden">
        <div className="container mx-auto px-4 text-center text-gray-400 relative z-10">
          <p>© 2025 Deep Pockets. All rights reserved.</p>
        </div>
        <div className="absolute inset-0 bg-footer-pattern opacity-5" />
      </footer>
    </div>
  )
}

function FeatureCard({ title, description, icon, image, needsScroll = false }) {
  return (
    <motion.div variants={fadeInUp}>
      <Card className="bg-gray-900 border border-gray-700 hover:border-green-500 transition-all duration-300 group overflow-hidden">
        <CardContent className="p-6 space-y-4">
          <div className="text-green-500 group-hover:scale-110 transition-transform duration-300">{icon}</div>
          <h3 className="text-xl font-bold text-white group-hover:text-green-500 transition-colors">{title}</h3>
          <p className="text-gray-300">{description}</p>
          <div className="relative h-48 overflow-hidden rounded-lg">
            {needsScroll ? (
              <div className="animate-scroll absolute w-full h-[200%] group-hover:pause">
                <Image src={image || "/placeholder.svg"} alt={title} layout="fill" objectFit="cover" />
              </div>
            ) : (
              <Image
                src={image || "/placeholder.svg"}
                alt={title}
                layout="fill"
                objectFit="cover"
                className="group-hover:scale-105 transition-transform duration-300"
              />
            )}
          </div>
        </CardContent>
      </Card>
    </motion.div>
  )
}

function WhaleTransaction({ exchange, token, amount, type }) {
  return (
    <motion.div
      className="flex items-center justify-between p-3 border border-gray-800 rounded-lg hover:bg-green-500/10 transition-colors duration-300"
      whileHover={{ scale: 1.05 }}
      transition={{ type: "spring", stiffness: 400, damping: 10 }}
    >
      <div className="flex items-center gap-3">
        <div className={`p-2 rounded-full ${type === "buy" ? "bg-green-500/20" : "bg-red-500/20"}`}>
          {type === "buy" ? (
            <ArrowUpRight className={`w-4 h-4 ${type === "buy" ? "text-green-500" : "text-red-500"}`} />
          ) : (
            <ArrowDownRight className={`w-4 h-4 ${type === "buy" ? "text-green-500" : "text-red-500"}`} />
          )}
        </div>
        <div>
          <p className="font-medium">{exchange}</p>
          <p className="text-sm text-gray-400">{token}</p>
        </div>
      </div>
      <div className="text-right">
        <p className="font-medium">{amount}</p>
        <Badge variant={type === "buy" ? "success" : "destructive"}>{type.toUpperCase()}</Badge>
      </div>
    </motion.div>
  )
}

function AutoScrollImage({ src, alt, width, height }) {
  return (
    <div className="relative h-48 overflow-hidden rounded-lg">
      <div className="animate-scroll absolute w-full h-[200%] group-hover:pause">
        <Image src={src || "/placeholder.svg"} alt={alt} layout="fill" objectFit="cover" />
      </div>
    </div>
  )
}

