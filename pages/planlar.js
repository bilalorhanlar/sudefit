import Link from "next/link"
import Head from "next/head"
import Header from '../components/header';
import Footer from '../components/footer';
import { useEffect, useRef } from 'react';

export default function Planlar() {
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
            <title>SudeFit - Planlar</title>
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
                    Planlar
                </h1>
                <p className="text-2xl md:text-3xl text-gray-600 mb-8 max-w-3xl mx-auto animate-fade-in-up font-medium tracking-wide leading-relaxed">
                    Size en uygun planı seçin, hedeflerinize ulaşın
                </p>
            </div>
        </div>

        {/* Plans Section */}
        <div className="py-20 bg-white">
            <div className="container mx-auto px-4">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
                    {/* Basic Plan */}
                    <div className="group bg-white p-8 rounded-2xl shadow-lg shadow-gray-200 hover:shadow-xl hover:shadow-pink-200 border border-pink-100 hover:border-pink-200 transform hover:scale-105 transition duration-300">
                        <div className="text-center mb-8">
                            <h3 className="text-3xl font-black text-gray-800 mb-4">Başlangıç</h3>
                            <div className="text-4xl font-black text-pink-500 mb-2">₺1999</div>
                            <p className="text-gray-600">/ay</p>
                        </div>
                        <ul className="space-y-4 mb-8">
                            <li className="flex items-center text-gray-600">
                                <svg className="w-6 h-6 text-pink-500 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                                </svg>
                                Kişiselleştirilmiş Antrenman Programı
                            </li>
                            <li className="flex items-center text-gray-600">
                                <svg className="w-6 h-6 text-pink-500 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                                </svg>
                                Haftalık Kontrol
                            </li>
                            <li className="flex items-center text-gray-600">
                                <svg className="w-6 h-6 text-pink-500 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                                </svg>
                                Temel Beslenme Önerileri
                            </li>
                        </ul>
                        <Link 
                            href="/banaulasin" 
                            className="block w-full py-4 px-8 text-center text-lg font-bold text-pink-500 rounded-full bg-white border-2 border-pink-500 hover:bg-pink-500 hover:text-white transition duration-300"
                        >
                            Hemen Başla
                        </Link>
                    </div>

                    {/* Premium Plan */}
                    <div className="group bg-white p-8 rounded-2xl shadow-lg shadow-gray-200 hover:shadow-xl hover:shadow-purple-200 border-2 border-purple-500 transform hover:scale-105 transition duration-300">
                        <div className="absolute top-0 right-0 bg-purple-500 text-white px-4 py-1 rounded-bl-lg text-sm font-bold">
                            Popüler
                        </div>
                        <div className="text-center mb-8">
                            <h3 className="text-3xl font-black text-gray-800 mb-4">Premium</h3>
                            <div className="text-4xl font-black text-purple-500 mb-2">₺2499</div>
                            <p className="text-gray-600">/ay</p>
                        </div>
                        <ul className="space-y-4 mb-8">
                            <li className="flex items-center text-gray-600">
                                <svg className="w-6 h-6 text-purple-500 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                                </svg>
                                Kişiselleştirilmiş Antrenman Programı
                            </li>
                            <li className="flex items-center text-gray-600">
                                <svg className="w-6 h-6 text-purple-500 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                                </svg>
                                Günlük Kontrol ve Destek
                            </li>
                            <li className="flex items-center text-gray-600">
                                <svg className="w-6 h-6 text-purple-500 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                                </svg>
                                Detaylı Beslenme Programı
                            </li>
                            <li className="flex items-center text-gray-600">
                                <svg className="w-6 h-6 text-purple-500 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                                </svg>
                                Video Destek
                            </li>
                        </ul>
                        <Link 
                            href="/banaulasin" 
                            className="block w-full py-4 px-8 text-center text-lg font-bold text-white rounded-full bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 transition duration-300"
                        >
                            Hemen Başla
                        </Link>
                    </div>

                    {/* Elite Plan */}
                    <div className="group bg-white p-8 rounded-2xl shadow-lg shadow-gray-200 hover:shadow-xl hover:shadow-pink-200 border border-pink-100 hover:border-pink-200 transform hover:scale-105 transition duration-300">
                        <div className="text-center mb-8">
                            <h3 className="text-3xl font-black text-gray-800 mb-4">Elite</h3>
                            <div className="text-4xl font-black text-pink-500 mb-2">₺2999</div>
                            <p className="text-gray-600">/ay</p>
                        </div>
                        <ul className="space-y-4 mb-8">
                            <li className="flex items-center text-gray-600">
                                <svg className="w-6 h-6 text-pink-500 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                                </svg>
                                Kişiselleştirilmiş Antrenman Programı
                            </li>
                            <li className="flex items-center text-gray-600">
                                <svg className="w-6 h-6 text-pink-500 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                                </svg>
                                7/24 Online Destek
                            </li>
                            <li className="flex items-center text-gray-600">
                                <svg className="w-6 h-6 text-pink-500 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                                </svg>
                                Detaylı Beslenme Programı
                            </li>
                            <li className="flex items-center text-gray-600">
                                <svg className="w-6 h-6 text-pink-500 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                                </svg>
                                Video Destek
                            </li>
                            <li className="flex items-center text-gray-600">
                                <svg className="w-6 h-6 text-pink-500 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                                </svg>
                                Özel Grup Dersleri
                            </li>
                        </ul>
                        <Link 
                            href="/banaulasin" 
                            className="block w-full py-4 px-8 text-center text-lg font-bold text-pink-500 rounded-full bg-white border-2 border-pink-500 hover:bg-pink-500 hover:text-white transition duration-300"
                        >
                            Hemen Başla
                        </Link>
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