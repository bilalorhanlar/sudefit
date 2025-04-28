import Link from "next/link"
import Head from "next/head"
import Script from 'next/script'
import Header from '../components/header';
import Footer from '../components/footer';
import { useState, useCallback, useEffect, useRef } from 'react';

const mapContainerStyle = {
    width: '100%',
    height: '500px'
};

const center = {
    lat: 41.1149455,  // Maslak, 8. Sokak koordinatları
    lng: 29.0182724
};

const options = {
    styles: [
        {
            featureType: "poi",
            elementType: "labels",
            stylers: [{ visibility: "on" }]
        }
    ],
    disableDefaultUI: false,
    zoomControl: true,
    mapTypeControl: true,
    streetViewControl: true,
    fullscreenControl: true,
    mapTypeId: 'roadmap',
    clickableIcons: true,
    zoom: 18
};

export default function BanaUlasin() {
    const [isOpen, setIsOpen] = useState(false);
    const [map, setMap] = useState(null);
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        phone: '',
        message: '',
        plan: 'baslangic'
    });
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

    const onLoad = useCallback((map) => {
        setMap(map);
        // Haritayı merkeze odakla
        map.setZoom(17);
    }, []);

    const onUnmount = useCallback((map) => {
        setMap(null);
    }, []);

    const handleMarkerClick = () => {
        setIsOpen(true);
        if (map) {
            map.panTo(center);
            map.setZoom(18);
        }
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        // Form submission logic here
        console.log(formData);
    };

    return <>
        <Header />
        <Head>
            <title>SudeFit - Bana Ulaşın</title>
            <link rel="icon" href="/favicon.ico" />
        </Head>
        <Script
            src={`https://maps.googleapis.com/maps/api/js?key=${process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY}`}
            strategy="lazyOnload"
        />
        
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
                    Bana Ulaşın
                </h1>
                <p className="text-2xl md:text-3xl text-gray-600 mb-8 max-w-3xl mx-auto animate-fade-in-up font-medium tracking-wide leading-relaxed">
                    Hedeflerinize ulaşmak için ilk adımı atın
                </p>
            </div>
        </div>

        {/* Contact Form Section */}
        <div className="py-20 bg-white">
            <div className="container mx-auto px-4">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
                    {/* Contact Form */}
                    <div className="group bg-white p-8 rounded-2xl shadow-lg shadow-gray-200 hover:shadow-xl hover:shadow-pink-200 border border-pink-100 hover:border-pink-200 transform hover:scale-[1.02] transition duration-300">
                        <h2 className="text-3xl font-black text-gray-800 mb-8 bg-clip-text text-transparent bg-gradient-to-r from-pink-500 to-purple-600 animate-gradient-x">
                            İletişim Formu
                        </h2>
                        <form onSubmit={handleSubmit} className="space-y-6">
                            <div>
                                <label className="block text-gray-600 mb-2 text-lg">Ad Soyad</label>
                                <input 
                                    type="text" 
                                    className="w-full px-6 py-4 bg-gray-50 border border-gray-200 rounded-xl text-gray-800 placeholder-gray-400 focus:outline-none focus:border-pink-500 transition duration-300"
                                    placeholder="Adınız ve soyadınız"
                                    value={formData.name}
                                    onChange={(e) => setFormData({...formData, name: e.target.value})}
                                />
                            </div>
                            <div>
                                <label className="block text-gray-600 mb-2 text-lg">E-posta</label>
                                <input 
                                    type="email" 
                                    className="w-full px-6 py-4 bg-gray-50 border border-gray-200 rounded-xl text-gray-800 placeholder-gray-400 focus:outline-none focus:border-pink-500 transition duration-300"
                                    placeholder="E-posta adresiniz"
                                    value={formData.email}
                                    onChange={(e) => setFormData({...formData, email: e.target.value})}
                                />
                            </div>
                            <div>
                                <label className="block text-gray-600 mb-2 text-lg">Telefon</label>
                                <input 
                                    type="tel" 
                                    className="w-full px-6 py-4 bg-gray-50 border border-gray-200 rounded-xl text-gray-800 placeholder-gray-400 focus:outline-none focus:border-pink-500 transition duration-300"
                                    placeholder="Telefon numaranız"
                                    value={formData.phone}
                                    onChange={(e) => setFormData({...formData, phone: e.target.value})}
                                />
                            </div>
                            <div>
                                <label className="block text-gray-600 mb-2 text-lg">Plan Seçimi</label>
                                <select 
                                    className="w-full px-6 py-4 bg-gray-50 border border-gray-200 rounded-xl text-gray-800 placeholder-gray-400 focus:outline-none focus:border-pink-500 transition duration-300"
                                    value={formData.plan}
                                    onChange={(e) => setFormData({...formData, plan: e.target.value})}
                                >
                                    <option value="baslangic">Başlangıç Planı</option>
                                    <option value="premium">Premium Plan</option>
                                    <option value="elite">Elite Plan</option>
                                </select>
                            </div>
                            <div>
                                <label className="block text-gray-600 mb-2 text-lg">Mesajınız</label>
                                <textarea 
                                    className="w-full px-6 py-4 bg-gray-50 border border-gray-200 rounded-xl text-gray-800 placeholder-gray-400 focus:outline-none focus:border-pink-500 transition duration-300 h-32"
                                    placeholder="Mesajınızı buraya yazın"
                                    value={formData.message}
                                    onChange={(e) => setFormData({...formData, message: e.target.value})}
                                ></textarea>
                            </div>
                            <button 
                                type="submit" 
                                className="group relative w-full bg-gradient-to-r from-pink-500 to-purple-600 text-white text-xl font-bold py-4 px-8 rounded-xl overflow-hidden transform hover:scale-105 transition duration-300"
                            >
                                <span className="relative z-10">Gönder</span>
                                <div className="absolute inset-0 bg-gradient-to-r from-purple-600 to-pink-500 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                            </button>
                        </form>
                    </div>

                    {/* Contact Info */}
                    <div className="space-y-8">
                        <div className="group bg-white p-8 rounded-2xl shadow-lg shadow-gray-200 hover:shadow-xl hover:shadow-pink-200 border border-pink-100 hover:border-pink-200 transform hover:scale-[1.02] transition duration-300">
                            <h2 className="text-3xl font-black text-gray-800 mb-8 bg-clip-text text-transparent bg-gradient-to-r from-pink-500 to-purple-600 animate-gradient-x">
                                İletişim Bilgileri
                            </h2>
                            <div className="space-y-6">
                                <div className="flex items-center">
                                    <div className="w-12 h-12 bg-gradient-to-r from-pink-500 to-purple-600 rounded-full flex items-center justify-center mr-4">
                                        <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                                        </svg>
                                    </div>
                                    <div>
                                        <h3 className="text-gray-600 text-lg">E-posta</h3>
                                        <a href="mailto:info@sudefit.com" className="text-gray-800 hover:text-pink-500 transition duration-300">info@sudefit.com</a>
                                    </div>
                                </div>
                                <div className="flex items-center">
                                    <div className="w-12 h-12 bg-gradient-to-r from-pink-500 to-purple-600 rounded-full flex items-center justify-center mr-4">
                                        <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                                        </svg>
                                    </div>
                                    <div>
                                        <h3 className="text-gray-600 text-lg">Telefon</h3>
                                        <a href="tel:+905XXXXXXXXX" className="text-gray-800 hover:text-pink-500 transition duration-300">+90 5XX XXX XX XX</a>
                                    </div>
                                </div>
                                <div className="flex items-center">
                                    <div className="w-12 h-12 bg-gradient-to-r from-pink-500 to-purple-600 rounded-full flex items-center justify-center mr-4">
                                        <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                                        </svg>
                                    </div>
                                    <div>
                                        <h3 className="text-gray-600 text-lg">Adres</h3>
                                        <p className="text-gray-800">İstanbul, Türkiye</p>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className="group bg-white p-8 rounded-2xl shadow-lg shadow-gray-200 hover:shadow-xl hover:shadow-pink-200 border border-pink-100 hover:border-pink-200 transform hover:scale-[1.02] transition duration-300">
                            <h2 className="text-3xl font-black text-gray-800 mb-8 bg-clip-text text-transparent bg-gradient-to-r from-pink-500 to-purple-600 animate-gradient-x">
                                Çalışma Saatleri
                            </h2>
                            <div className="space-y-4">
                                <div className="flex justify-between items-center">
                                    <span className="text-gray-600">Pazartesi - Cuma</span>
                                    <span className="text-gray-800">09:00 - 20:00</span>
                                </div>
                                <div className="flex justify-between items-center">
                                    <span className="text-gray-600">Cumartesi</span>
                                    <span className="text-gray-800">10:00 - 18:00</span>
                                </div>
                                <div className="flex justify-between items-center">
                                    <span className="text-gray-600">Pazar</span>
                                    <span className="text-gray-800">Kapalı</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>

        {/* Map Section */}
        <div className="py-20 bg-gray-50">
            <div className="container mx-auto px-4">
                <h2 className="text-3xl font-black text-gray-800 text-center mb-12 bg-clip-text text-transparent bg-gradient-to-r from-pink-500 to-purple-600 animate-gradient-x">
                    Konum
                </h2>
                <div className="group bg-white p-8 rounded-2xl shadow-lg shadow-gray-200 hover:shadow-xl hover:shadow-pink-200 border border-pink-100 hover:border-pink-200 transform hover:scale-[1.02] transition duration-300">
                    <div id="map" style={mapContainerStyle} className="rounded-xl overflow-hidden"></div>
                </div>
            </div>
        </div>

        <Footer />
    </>
}
  