import Head from 'next/head'
import Header from '../components/header'
import Footer from '../components/footer'
import Link from 'next/link'
import { useEffect, useRef } from 'react'

export default function Home() {
  const canvasRef = useRef(null)

  useEffect(() => {
    const canvas = canvasRef.current
    const ctx = canvas.getContext('2d')
    let animationFrameId
    let particles = []
    const mouse = { x: null, y: null, radius: 150 }

    // Canvas boyutunu ayarla
    const resizeCanvas = () => {
      canvas.width = window.innerWidth
      canvas.height = window.innerHeight
    }
    resizeCanvas()
    window.addEventListener('resize', resizeCanvas)

    // Mouse pozisyonunu takip et
    const handleMouseMove = (e) => {
      mouse.x = e.x
      mouse.y = e.y
    }
    window.addEventListener('mousemove', handleMouseMove)

    // Particle sınıfı
    class Particle {
      constructor() {
        this.x = Math.random() * canvas.width
        this.y = Math.random() * canvas.height
        this.size = Math.random() * 2 + 1
        this.baseX = this.x
        this.baseY = this.y
        this.density = (Math.random() * 30) + 1
        this.color = `rgba(${Math.random() * 50 + 200}, ${Math.random() * 50 + 200}, ${Math.random() * 50 + 200}, ${Math.random() * 0.3 + 0.1})`
      }

      draw() {
        ctx.fillStyle = this.color
        ctx.beginPath()
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2)
        ctx.closePath()
        ctx.fill()
      }

      update() {
        let dx = mouse.x - this.x
        let dy = mouse.y - this.y
        let distance = Math.sqrt(dx * dx + dy * dy)
        let forceDirectionX = dx / distance
        let forceDirectionY = dy / distance
        let maxDistance = mouse.radius
        let force = (maxDistance - distance) / maxDistance
        let directionX = forceDirectionX * force * this.density
        let directionY = forceDirectionY * force * this.density

        if (distance < mouse.radius) {
          this.x -= directionX
          this.y -= directionY
        } else {
          if (this.x !== this.baseX) {
            let dx = this.x - this.baseX
            this.x -= dx/10
          }
          if (this.y !== this.baseY) {
            let dy = this.y - this.baseY
            this.y -= dy/10
          }
        }
      }
    }

    // Particle'ları oluştur
    const init = () => {
      particles = []
      const numberOfParticles = (canvas.width * canvas.height) / 9000
      for (let i = 0; i < numberOfParticles; i++) {
        particles.push(new Particle())
      }
    }
    init()

    // Animasyon döngüsü
    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height)
      particles.forEach(particle => {
        particle.update()
        particle.draw()
      })
      animationFrameId = requestAnimationFrame(animate)
    }
    animate()

    // Cleanup
    return () => {
      window.removeEventListener('resize', resizeCanvas)
      window.removeEventListener('mousemove', handleMouseMove)
      cancelAnimationFrame(animationFrameId)
    }
  }, [])

  return (
    <div className="min-h-screen bg-gradient-to-b from-white to-gray-50">
      <Head>
        <title>SudeFit - Kişisel Fitness Antrenörü</title>
        <meta name="description" content="Profesyonel ve kişiselleştirilmiş fitness programları ile hedeflerinize ulaşın" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <Header />

      <main>
        {/* Hero Section */}
        <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
          <canvas 
            ref={canvasRef} 
            className="absolute inset-0 w-full h-full"
            style={{ zIndex: 0 }}
          />
          <div className="absolute inset-0 bg-gradient-to-br from-pink-100 via-purple-100 to-transparent animate-gradient-xy" />
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-pink-100 via-transparent to-transparent animate-pulse" />
          <div className="relative z-20 text-center px-4">
            <h1 className="text-3xl md:text-5xl font-black text-gray-800 mb-6 animate-fade-in bg-clip-text text-transparent bg-gradient-to-r from-pink-500 via-purple-500 to-pink-500 animate-gradient-x">
              SudeFit
            </h1>
            <p className="text-2xl md:text-4xl text-gray-600 mb-12 max-w-3xl mx-auto animate-fade-in-up font-medium tracking-wide leading-relaxed">
              Profesyonel ve kişiselleştirilmiş fitness programları ile hedeflerinize ulaşın
            </p>
            <div className="flex flex-col md:flex-row gap-6 justify-center items-center">
              <Link 
                href="/planlar"
                className="group relative inline-flex items-center justify-center px-12 py-6 text-xl font-bold text-white rounded-full overflow-hidden bg-gradient-to-r from-pink-500 to-purple-600 hover:from-purple-600 hover:to-pink-500 transition-all duration-500 transform hover:scale-105 hover:shadow-2xl hover:shadow-pink-500/50"
              >
                <span className="relative z-10">Planları Keşfet</span>
                <div className="absolute inset-0 bg-gradient-to-r from-purple-600 to-pink-500 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                <div className="absolute inset-0 bg-white/10 backdrop-blur-sm opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
              </Link>
              <Link 
                href="/banaulasin"
                className="group relative inline-flex items-center justify-center px-12 py-6 text-xl font-bold text-gray-800 rounded-full overflow-hidden bg-white/90 hover:bg-white transition-all duration-500 transform hover:scale-105 hover:shadow-2xl hover:shadow-gray-200"
              >
                <span className="relative z-10">Ücretsiz Danışmanlık</span>
                <div className="absolute inset-0 bg-gradient-to-r from-pink-500/20 to-purple-500/20 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
              </Link>
            </div>
          </div>
        </section>

        {/* Features Section */}
        <section className="py-20 bg-white">
          <div className="container mx-auto px-4">
            <h2 className="text-5xl md:text-6xl font-black text-gray-800 text-center mb-16 bg-clip-text text-transparent bg-gradient-to-r from-pink-500 to-purple-600 animate-gradient-x">
              Neden SudeFit?
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
              <div className="group bg-white p-8 rounded-2xl transform hover:scale-105 transition duration-300 shadow-lg shadow-gray-200 hover:shadow-xl hover:shadow-pink-200 border border-pink-100 hover:border-pink-200">
                <div className="w-20 h-20 bg-gradient-to-r from-pink-500 to-purple-600 rounded-full flex items-center justify-center mb-6 transform group-hover:rotate-12 transition duration-500">
                  <svg className="w-10 h-10 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
                  </svg>
                </div>
                <h3 className="text-3xl font-bold text-gray-800 mb-4 group-hover:text-pink-500 transition duration-300">Kişiselleştirilmiş Programlar</h3>
                <p className="text-gray-600 text-lg leading-relaxed">Size özel hazırlanan fitness ve beslenme programları ile hedeflerinize ulaşın.</p>
              </div>
              <div className="group bg-white p-8 rounded-2xl transform hover:scale-105 transition duration-300 shadow-lg shadow-gray-200 hover:shadow-xl hover:shadow-purple-200 border border-purple-100 hover:border-purple-200">
                <div className="w-20 h-20 bg-gradient-to-r from-pink-500 to-purple-600 rounded-full flex items-center justify-center mb-6 transform group-hover:rotate-12 transition duration-500">
                  <svg className="w-10 h-10 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                  </svg>
                </div>
                <h3 className="text-3xl font-bold text-gray-800 mb-4 group-hover:text-purple-500 transition duration-300">Online Destek</h3>
                <p className="text-gray-600 text-lg leading-relaxed">7/24 online destek ile sorularınıza anında yanıt alın.</p>
              </div>
              <div className="group bg-white p-8 rounded-2xl transform hover:scale-105 transition duration-300 shadow-lg shadow-gray-200 hover:shadow-xl hover:shadow-pink-200 border border-pink-100 hover:border-pink-200">
                <div className="w-20 h-20 bg-gradient-to-r from-pink-500 to-purple-600 rounded-full flex items-center justify-center mb-6 transform group-hover:rotate-12 transition duration-500">
                  <svg className="w-10 h-10 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                  </svg>
                </div>
                <h3 className="text-3xl font-bold text-gray-800 mb-4 group-hover:text-pink-500 transition duration-300">Mobil Uygulama</h3>
                <p className="text-gray-600 text-lg leading-relaxed">Özel mobil uygulamamız ile antrenmanlarınızı her yerden takip edin.</p>
              </div>
            </div>
          </div>
        </section>

        {/* Pricing Section */}
        <section className="py-20 bg-gray-50">
          <div className="container mx-auto px-4">
            <h2 className="text-5xl md:text-6xl font-black text-gray-800 text-center mb-16 bg-clip-text text-transparent bg-gradient-to-r from-pink-500 to-purple-600 animate-gradient-x">
              Planlar
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="group bg-white p-8 rounded-2xl transform hover:scale-105 transition duration-300 shadow-lg shadow-gray-200 hover:shadow-xl hover:shadow-pink-200 border border-pink-100 hover:border-pink-200">
                <h3 className="text-3xl font-bold text-gray-800 mb-4 group-hover:text-pink-500 transition duration-300">Basic</h3>
                <p className="text-5xl font-black text-gray-800 mb-6 bg-clip-text text-transparent bg-gradient-to-r from-pink-500 to-purple-600">₺1999<span className="text-xl text-gray-400">/ay</span></p>
                <ul className="space-y-4 mb-8">
                  <li className="flex items-center text-gray-600 text-lg">
                    <svg className="w-6 h-6 mr-3 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                    Kişiselleştirilmiş Program
                  </li>
                  <li className="flex items-center text-gray-600 text-lg">
                    <svg className="w-6 h-6 mr-3 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                    Haftalık Kontrol
                  </li>
                </ul>
                <Link 
                  href="/banaulasin"
                  className="block w-full bg-gradient-to-r from-pink-500 to-purple-600 text-white text-center py-4 rounded-full text-xl font-bold hover:opacity-90 transition duration-300 transform hover:scale-105 shadow-lg shadow-pink-500/30"
                >
                  Başla
                </Link>
              </div>
              <div className="group bg-white p-8 rounded-2xl transform hover:scale-105 transition duration-300 shadow-lg shadow-gray-200 hover:shadow-xl hover:shadow-purple-200 border-2 border-purple-200 relative">
                <div className="absolute top-0 right-0 bg-gradient-to-r from-pink-500 to-purple-600 text-white px-6 py-2 rounded-bl-lg text-lg font-bold">
                  Popüler
                </div>
                <h3 className="text-3xl font-bold text-gray-800 mb-4 group-hover:text-purple-500 transition duration-300">Premium</h3>
                <p className="text-5xl font-black text-gray-800 mb-6 bg-clip-text text-transparent bg-gradient-to-r from-pink-500 to-purple-600">₺2499<span className="text-xl text-gray-400">/ay</span></p>
                <ul className="space-y-4 mb-8">
                  <li className="flex items-center text-gray-600 text-lg">
                    <svg className="w-6 h-6 mr-3 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                    Kişiselleştirilmiş Program
                  </li>
                  <li className="flex items-center text-gray-600 text-lg">
                    <svg className="w-6 h-6 mr-3 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                    Haftalık Kontrol
                  </li>
                  <li className="flex items-center text-gray-600 text-lg">
                    <svg className="w-6 h-6 mr-3 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                    Online Destek
                  </li>
                </ul>
                <Link 
                  href="/banaulasin"
                  className="block w-full bg-gradient-to-r from-pink-500 to-purple-600 text-white text-center py-4 rounded-full text-xl font-bold hover:opacity-90 transition duration-300 transform hover:scale-105 shadow-lg shadow-pink-500/30"
                >
                  Başla
                </Link>
              </div>
              <div className="group bg-white p-8 rounded-2xl transform hover:scale-105 transition duration-300 shadow-lg shadow-gray-200 hover:shadow-xl hover:shadow-pink-200 border border-pink-100 hover:border-pink-200">
                <h3 className="text-3xl font-bold text-gray-800 mb-4 group-hover:text-pink-500 transition duration-300">Elite</h3>
                <p className="text-5xl font-black text-gray-800 mb-6 bg-clip-text text-transparent bg-gradient-to-r from-pink-500 to-purple-600">₺2999<span className="text-xl text-gray-400">/ay</span></p>
                <ul className="space-y-4 mb-8">
                  <li className="flex items-center text-gray-600 text-lg">
                    <svg className="w-6 h-6 mr-3 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                    Kişiselleştirilmiş Program
                  </li>
                  <li className="flex items-center text-gray-600 text-lg">
                    <svg className="w-6 h-6 mr-3 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                    Haftalık Kontrol
                  </li>
                  <li className="flex items-center text-gray-600 text-lg">
                    <svg className="w-6 h-6 mr-3 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                    Online Destek
                  </li>
                  <li className="flex items-center text-gray-600 text-lg">
                    <svg className="w-6 h-6 mr-3 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                    Mobil Uygulama
                  </li>
                </ul>
                <Link 
                  href="/banaulasin"
                  className="block w-full bg-gradient-to-r from-pink-500 to-purple-600 text-white text-center py-4 rounded-full text-xl font-bold hover:opacity-90 transition duration-300 transform hover:scale-105 shadow-lg shadow-pink-500/30"
                >
                  Başla
                </Link>
              </div>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-20 bg-gradient-to-r from-pink-500 to-purple-600">
          <div className="container mx-auto px-4 text-center">
            <h2 className="text-5xl md:text-6xl font-black text-white mb-8">
              Hedeflerinize Ulaşmaya Hazır mısınız?
            </h2>
            <p className="text-2xl text-white/90 mb-12 max-w-3xl mx-auto font-medium tracking-wide leading-relaxed">
              Ücretsiz danışmanlık için hemen iletişime geçin ve fitness yolculuğunuza başlayın.
            </p>
            <Link 
              href="/banaulasin"
              className="group relative inline-flex items-center justify-center px-12 py-6 text-2xl font-bold text-pink-500 rounded-full overflow-hidden bg-white hover:bg-white/90 transition-all duration-500 transform hover:scale-105 hover:shadow-2xl hover:shadow-white/20"
            >
              <span className="relative z-10">Ücretsiz Danışmanlık</span>
              <div className="absolute inset-0 bg-gradient-to-r from-pink-500/10 to-purple-500/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
            </Link>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  )
}
