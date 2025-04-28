import Head from 'next/head'
import Header from '../components/header'
import Footer from '../components/footer'
import Link from 'next/link'
import { useEffect, useRef, useState } from 'react'

export default function Home() {
  const canvasRef = useRef(null)
  const [bmi, setBmi] = useState(null)
  const [weight, setWeight] = useState('')
  const [height, setHeight] = useState('')
  const [funFact, setFunFact] = useState('')
  const [isCalculating, setIsCalculating] = useState(false)
  const [counters, setCounters] = useState({
    clients: 0,
    years: 0,
    success: 0
  })
  const [icons, setIcons] = useState([])

  const funFacts = [
    "Profesyonel antrenör eşliğinde çalışmak, hedeflerinize ulaşma sürenizi %50'ye kadar kısaltabilir.",
    "Kişiselleştirilmiş antrenman programları, standart programlara göre %40 daha etkili sonuç verir.",
    "Düzenli egzersiz yapmak, stres seviyenizi %30'a kadar düşürebilir.",
    "Doğru beslenme ve antrenman programı ile haftada 0.5-1 kg sağlıklı kilo kaybı mümkündür.",
    "Profesyonel destek ile fitness hedeflerinize ulaşma olasılığınız %80 artar.",
    "Kişisel antrenör eşliğinde çalışmak, sakatlanma riskinizi %60 azaltır.",
    "Düzenli egzersiz yapmak, uyku kalitenizi %65 oranında artırır.",
    "Doğru teknikle yapılan egzersizler, kas gelişiminizi %40 hızlandırır.",
    "Profesyonel beslenme danışmanlığı ile metabolizma hızınız %25 artabilir.",
    "Kişiselleştirilmiş programlar ile motivasyonunuz %70 daha yüksek olur."
  ]

  useEffect(() => {
    const canvas = canvasRef.current
    const ctx = canvas.getContext('2d')
    let animationFrameId
    let mouse = { x: 0, y: 0 }

    // Canvas boyutunu ayarla
    const resizeCanvas = () => {
      canvas.width = window.innerWidth
      canvas.height = window.innerHeight
    }
    resizeCanvas()
    window.addEventListener('resize', resizeCanvas)

    // Mouse pozisyonunu takip et
    const handleMouseMove = (e) => {
      mouse.x = e.clientX
      mouse.y = e.clientY
    }
    window.addEventListener('mousemove', handleMouseMove)

    // Fitness ikonları için sınıf
    class FitnessIcon {
      constructor() {
        this.reset()
        this.size = Math.random() * 30 + 20
        this.type = Math.floor(Math.random() * 4) // 0: dumbell, 1: glove, 2: weight, 3: yoga
        this.rotation = Math.random() * Math.PI * 2
        this.rotationSpeed = (Math.random() - 0.5) * 0.02
      }

      reset() {
        this.x = Math.random() * canvas.width
        this.y = Math.random() * canvas.height
        this.speedX = (Math.random() - 0.5) * 2
        this.speedY = (Math.random() - 0.5) * 2
      }

      draw() {
        ctx.save()
        ctx.translate(this.x, this.y)
        ctx.rotate(this.rotation)
        
        // İkonları çiz
        switch(this.type) {
          case 0: // Dumbell
            ctx.fillStyle = '#EC4899'
            ctx.fillRect(-this.size/2, -this.size/6, this.size, this.size/3)
            ctx.fillRect(-this.size/2 - this.size/3, -this.size/6, this.size/3, this.size/3)
            ctx.fillRect(this.size/2, -this.size/6, this.size/3, this.size/3)
            break
          case 1: // Boks Eldiveni
            ctx.fillStyle = '#8B5CF6'
            ctx.beginPath()
            ctx.arc(0, 0, this.size/2, 0, Math.PI * 2)
            ctx.fill()
            ctx.fillStyle = '#fff'
            ctx.beginPath()
            ctx.arc(0, 0, this.size/3, 0, Math.PI * 2)
            ctx.fill()
            break
          case 2: // Ağırlık
            ctx.fillStyle = '#F43F5E'
            ctx.beginPath()
            ctx.arc(0, 0, this.size/2, 0, Math.PI * 2)
            ctx.fill()
            ctx.fillStyle = '#fff'
            ctx.fillText('20', -5, 5)
            break
          case 3: // Yoga
            ctx.fillStyle = '#10B981'
            ctx.beginPath()
            ctx.moveTo(0, -this.size/2)
            ctx.lineTo(this.size/2, this.size/2)
            ctx.lineTo(-this.size/2, this.size/2)
            ctx.closePath()
            ctx.fill()
            break
        }
        
        ctx.restore()
      }

      update() {
        this.x += this.speedX
        this.y += this.speedY
        this.rotation += this.rotationSpeed

        // Mouse etkileşimi
        const dx = mouse.x - this.x
        const dy = mouse.y - this.y
        const distance = Math.sqrt(dx * dx + dy * dy)
        
        if (distance < 100) {
          const angle = Math.atan2(dy, dx)
          this.x -= Math.cos(angle) * 2
          this.y -= Math.sin(angle) * 2
        }

        // Ekran sınırları kontrolü
        if (this.x < 0 || this.x > canvas.width) this.speedX *= -1
        if (this.y < 0 || this.y > canvas.height) this.speedY *= -1
      }
    }

    // İkonları oluştur
    const icons = Array(15).fill().map(() => new FitnessIcon())

    // Animasyon döngüsü
    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height)
      
      // Gradient arka plan
      const gradient = ctx.createLinearGradient(0, 0, canvas.width, canvas.height)
      gradient.addColorStop(0, 'rgba(236, 72, 153, 0.1)')
      gradient.addColorStop(1, 'rgba(139, 92, 246, 0.1)')
      ctx.fillStyle = gradient
      ctx.fillRect(0, 0, canvas.width, canvas.height)

      // İkonları güncelle ve çiz
      icons.forEach(icon => {
        icon.update()
        icon.draw()
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

  useEffect(() => {
    const interval = setInterval(() => {
      const randomFact = funFacts[Math.floor(Math.random() * funFacts.length)]
      setFunFact(randomFact)
    }, 5000)

    return () => clearInterval(interval)
  }, [])

  useEffect(() => {
    // Animated counters
    const targetValues = {
      clients: 1000,
      years: 5,
      success: 95
    }

    const duration = 2000 // 2 seconds
    const steps = 60
    const stepDuration = duration / steps

    const animateCounters = () => {
      let currentStep = 0
      const interval = setInterval(() => {
        currentStep++
        setCounters({
          clients: Math.floor((targetValues.clients * currentStep) / steps),
          years: Math.floor((targetValues.years * currentStep) / steps),
          success: Math.floor((targetValues.success * currentStep) / steps)
        })

        if (currentStep >= steps) {
          clearInterval(interval)
        }
      }, stepDuration)
    }

    animateCounters()
  }, [])

  const calculateBMI = () => {
    if (!weight || !height) return
    
    setIsCalculating(true)
    const heightInMeters = height / 100
    const bmiValue = (weight / (heightInMeters * heightInMeters)).toFixed(1)
    
    setTimeout(() => {
      setBmi(bmiValue)
      setIsCalculating(false)
    }, 1000)
  }

  const getBMICategory = (bmi) => {
    if (bmi < 18.5) return "Zayıf"
    if (bmi < 25) return "Normal"
    if (bmi < 30) return "Fazla Kilolu"
    return "Obez"
  }

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

        {/* Stats Section */}
        <section className="py-16 bg-gradient-to-r from-pink-50 to-purple-50">
          <div className="container mx-auto px-4">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="text-center p-8 bg-white rounded-2xl shadow-lg transform hover:scale-105 transition duration-300">
                <div className="text-5xl font-bold text-pink-500 mb-2">
                  {counters.clients}+
                </div>
                <p className="text-xl text-gray-600">Mutlu Müşteri</p>
              </div>
              <div className="text-center p-8 bg-white rounded-2xl shadow-lg transform hover:scale-105 transition duration-300">
                <div className="text-5xl font-bold text-purple-500 mb-2">
                  {counters.years}+
                </div>
                <p className="text-xl text-gray-600">Yıllık Deneyim</p>
              </div>
              <div className="text-center p-8 bg-white rounded-2xl shadow-lg transform hover:scale-105 transition duration-300">
                <div className="text-5xl font-bold text-pink-500 mb-2">
                  %{counters.success}
                </div>
                <p className="text-xl text-gray-600">Başarı Oranı</p>
              </div>
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
              <div className="group bg-white p-8 rounded-2xl transform hover:scale-105 transition duration-300 shadow-lg shadow-gray-200 hover:shadow-xl hover:shadow-pink-200">
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

        {/* Interactive Fitness Calculator Section */}
        <section className="py-20 bg-white">
          <div className="container mx-auto px-4">
            <h2 className="text-5xl md:text-6xl font-black text-gray-800 text-center mb-16 bg-clip-text text-transparent bg-gradient-to-r from-pink-500 to-purple-600 animate-gradient-x">
              Vücut Kitle İndeksi Hesaplayıcı
            </h2>
            
            <div className="max-w-2xl mx-auto bg-white rounded-2xl p-8 shadow-xl transform hover:scale-105 transition duration-300">
              <div className="space-y-6">
                <div className="space-y-2">
                  <label className="text-xl font-semibold text-gray-700">Kilonuz (kg)</label>
                  <input
                    type="number"
                    value={weight}
                    onChange={(e) => setWeight(e.target.value)}
                    className="w-full px-4 py-3 rounded-lg border-2 border-gray-200 focus:border-pink-500 focus:ring-2 focus:ring-pink-200 transition duration-300"
                    placeholder="Örn: 70"
                  />
                </div>
                
                <div className="space-y-2">
                  <label className="text-xl font-semibold text-gray-700">Boyunuz (cm)</label>
                  <input
                    type="number"
                    value={height}
                    onChange={(e) => setHeight(e.target.value)}
                    className="w-full px-4 py-3 rounded-lg border-2 border-gray-200 focus:border-pink-500 focus:ring-2 focus:ring-pink-200 transition duration-300"
                    placeholder="Örn: 170"
                  />
                </div>
                
                <button
                  onClick={calculateBMI}
                  disabled={isCalculating}
                  className="w-full bg-gradient-to-r from-pink-500 to-purple-600 text-white text-xl font-bold py-4 rounded-lg transform hover:scale-105 transition duration-300 disabled:opacity-50"
                >
                  {isCalculating ? 'Hesaplanıyor...' : 'Hesapla'}
                </button>
                
                {bmi && (
                  <div className="mt-8 p-6 bg-gradient-to-r from-pink-50 to-purple-50 rounded-xl animate-fade-in">
                    <h3 className="text-2xl font-bold text-gray-800 mb-4">VKİ Sonucunuz</h3>
                    <div className="grid grid-cols-2 gap-4">
                      <div className="text-center p-4 bg-white rounded-lg shadow-sm">
                        <p className="text-gray-600">Vücut Kitle İndeksi</p>
                        <p className="text-3xl font-bold text-pink-500">{bmi}</p>
                      </div>
                      <div className="text-center p-4 bg-white rounded-lg shadow-sm">
                        <p className="text-gray-600">Değerlendirme</p>
                        <p className="text-3xl font-bold text-purple-500">{getBMICategory(bmi)}</p>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </div>

            {/* Fun Facts Section */}
            <div className="mt-16 max-w-2xl mx-auto">
              <div className="bg-gradient-to-r from-pink-500 to-purple-600 p-8 rounded-2xl text-white transform hover:scale-105 transition duration-300">
                <h3 className="text-2xl font-bold mb-4">Fitness İstatistikleri</h3>
                <p className="text-xl animate-fade-in">{funFact}</p>
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
