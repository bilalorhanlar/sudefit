import Link from "next/link"
import Head from "next/head"
import Header from '../components/header';
import Footer from '../components/footer';
import { useEffect, useRef } from 'react';

export default function Hakkimda() {
  const canvasRef = useRef(null)

  useEffect(() => {
    const canvas = canvasRef.current
    const ctx = canvas.getContext('2d')
    let animationFrameId
    let particles = []
    const mouse = { x: null, y: null, radius: 150 }

    const resizeCanvas = () => {
      canvas.width = window.innerWidth
      canvas.height = window.innerHeight
    }
    resizeCanvas()
    window.addEventListener('resize', resizeCanvas)

    const handleMouseMove = (e) => {
      mouse.x = e.x
      mouse.y = e.y
    }
    window.addEventListener('mousemove', handleMouseMove)

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

    const init = () => {
      particles = []
      const numberOfParticles = (canvas.width * canvas.height) / 9000
      for (let i = 0; i < numberOfParticles; i++) {
        particles.push(new Particle())
      }
    }
    init()

    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height)
      particles.forEach(particle => {
        particle.update()
        particle.draw()
      })
      animationFrameId = requestAnimationFrame(animate)
    }
    animate()

    return () => {
      window.removeEventListener('resize', resizeCanvas)
      window.removeEventListener('mousemove', handleMouseMove)
      cancelAnimationFrame(animationFrameId)
    }
  }, [])

  return <>
    <Head>
      <title>SudeFit - Hakkımda</title>
      <link rel="icon" href="/favicon.ico" />
    </Head>

    <Header />

    {/* Hero Section */}
    <div className="relative min-h-[50vh] flex items-center justify-center overflow-hidden">
      <canvas 
        ref={canvasRef} 
        className="absolute inset-0 w-full h-full"
        style={{ zIndex: 0 }}
      />
      <div className="absolute inset-0 bg-gradient-to-br from-pink-100 via-purple-100 to-transparent animate-gradient-xy" />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-pink-100 via-transparent to-transparent animate-pulse" />
      <div className="relative z-20 text-center px-4">
        <h1 className="text-5xl md:text-7xl font-black text-gray-800 mb-6 animate-fade-in bg-clip-text text-transparent bg-gradient-to-r from-pink-500 via-purple-500 to-pink-500 animate-gradient-x">
          Hakkımda
        </h1>
        <p className="text-2xl md:text-3xl text-gray-600 mb-8 max-w-3xl mx-auto animate-fade-in-up font-medium tracking-wide leading-relaxed">
          Profesyonel ve Kişiselleştirilmiş Fitness Deneyimi
        </p>
      </div>
    </div>

    {/* About Content */}
    <div className="py-20 bg-white">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          <div className="space-y-8">
            <h2 className="text-4xl md:text-5xl font-black text-gray-800 mb-8 bg-clip-text text-transparent bg-gradient-to-r from-pink-500 to-purple-600 animate-gradient-x">
              Ben Kimim?
            </h2>
            <p className="text-xl text-gray-600 leading-relaxed">
              Merhaba, ben Sude Tazegül. 5 yılı aşkın süredir fitness sektöründe profesyonel antrenör olarak çalışıyorum. Spor ve sağlıklı yaşam tutkum, insanların hayatlarını değiştirmeye yardımcı olmamı sağlıyor.
            </p>
            <p className="text-xl text-gray-600 leading-relaxed">
              Her bireyin benzersiz olduğuna inanıyorum ve bu yüzden her müşterime özel, kişiselleştirilmiş programlar hazırlıyorum. Amacım, sadece fiziksel değil, aynı zamanda mental olarak da daha güçlü ve sağlıklı bireyler yetiştirmek.
            </p>
            <div className="grid grid-cols-2 gap-8 pt-8">
              <div className="group bg-white p-8 rounded-2xl shadow-lg shadow-gray-200 hover:shadow-xl hover:shadow-pink-200 border border-pink-100 hover:border-pink-200 transform hover:scale-105 transition duration-300">
                <h3 className="text-4xl font-black text-pink-500 mb-2 group-hover:text-purple-500 transition duration-300">5+</h3>
                <p className="text-gray-600 text-lg">Yıllık Deneyim</p>
              </div>
              <div className="group bg-white p-8 rounded-2xl shadow-lg shadow-gray-200 hover:shadow-xl hover:shadow-pink-200 border border-pink-100 hover:border-pink-200 transform hover:scale-105 transition duration-300">
                <h3 className="text-4xl font-black text-pink-500 mb-2 group-hover:text-purple-500 transition duration-300">1000+</h3>
                <p className="text-gray-600 text-lg">Mutlu Müşteri</p>
              </div>
            </div>
          </div>
          <div className="relative group">
            <div className="absolute inset-0 bg-gradient-to-r from-pink-500 to-purple-600 rounded-2xl transform group-hover:rotate-3 transition duration-500" />
            <img 
              src="/images/trainer.jpg" 
              alt="Sude Tazegül" 
              className="relative rounded-2xl transform group-hover:-rotate-3 transition duration-500"
            />
          </div>
        </div>
      </div>
    </div>

    {/* Why Choose Me */}
    <div className="py-20 bg-gray-50">
      <div className="container mx-auto px-4">
        <h2 className="text-4xl md:text-5xl font-black text-gray-800 text-center mb-16 bg-clip-text text-transparent bg-gradient-to-r from-pink-500 to-purple-600 animate-gradient-x">
          Neden Beni Tercih Etmelisiniz?
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
          <div className="group bg-white p-8 rounded-2xl shadow-lg shadow-gray-200 hover:shadow-xl hover:shadow-pink-200 border border-pink-100 hover:border-pink-200 transform hover:scale-105 transition duration-300">
            <div className="w-20 h-20 bg-gradient-to-r from-pink-500 to-purple-600 rounded-full flex items-center justify-center mb-6 transform group-hover:rotate-12 transition duration-500">
              <svg className="w-10 h-10 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
              </svg>
            </div>
            <h3 className="text-2xl font-bold text-gray-800 mb-4 group-hover:text-pink-500 transition duration-300">Kişiselleştirilmiş Programlar</h3>
            <p className="text-gray-600 text-lg leading-relaxed">Size özel hazırlanmış antrenman ve beslenme programları ile hedeflerinize ulaşın.</p>
          </div>
          <div className="group bg-white p-8 rounded-2xl shadow-lg shadow-gray-200 hover:shadow-xl hover:shadow-purple-200 border border-purple-100 hover:border-purple-200 transform hover:scale-105 transition duration-300">
            <div className="w-20 h-20 bg-gradient-to-r from-pink-500 to-purple-600 rounded-full flex items-center justify-center mb-6 transform group-hover:rotate-12 transition duration-500">
              <svg className="w-10 h-10 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
              </svg>
            </div>
            <h3 className="text-2xl font-bold text-gray-800 mb-4 group-hover:text-purple-500 transition duration-300">Online Destek</h3>
            <p className="text-gray-600 text-lg leading-relaxed">7/24 online destek ve motivasyon ile yanınızdayım.</p>
          </div>
          <div className="group bg-white p-8 rounded-2xl shadow-lg shadow-gray-200 hover:shadow-xl hover:shadow-pink-200 border border-pink-100 hover:border-pink-200 transform hover:scale-105 transition duration-300">
            <div className="w-20 h-20 bg-gradient-to-r from-pink-500 to-purple-600 rounded-full flex items-center justify-center mb-6 transform group-hover:rotate-12 transition duration-500">
              <svg className="w-10 h-10 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
            <h3 className="text-2xl font-bold text-gray-800 mb-4 group-hover:text-pink-500 transition duration-300">Esnek Program</h3>
            <p className="text-gray-600 text-lg leading-relaxed">Size uygun zamanlarda antrenman yapma imkanı.</p>
          </div>
        </div>
      </div>
    </div>

    {/* CTA Section */}
    <div className="relative py-20">
      <div className="absolute inset-0 bg-gradient-to-r from-pink-500 to-purple-600" />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-white/10 via-transparent to-transparent" />
      <div className="relative z-10 container mx-auto px-4 text-center">
        <h2 className="text-4xl md:text-5xl font-black text-white mb-8">
          Hedeflerinize Ulaşmaya Hazır mısınız?
        </h2>
        <p className="text-2xl text-white/90 mb-12 max-w-3xl mx-auto font-medium tracking-wide leading-relaxed">
          Hemen başlayın, size özel programınızı oluşturalım.
        </p>
        <Link 
          href="/banaulasin" 
          className="group relative inline-flex items-center justify-center px-12 py-6 text-2xl font-bold text-pink-500 rounded-full overflow-hidden bg-white hover:bg-white/90 transition-all duration-500 transform hover:scale-105 hover:shadow-2xl hover:shadow-white/20"
        >
          <span className="relative z-10">Ücretsiz Danışmanlık</span>
          <div className="absolute inset-0 bg-gradient-to-r from-pink-500/10 to-purple-500/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
        </Link>
      </div>
    </div>

    <Footer />
  </>
}