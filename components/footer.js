import Link from "next/link";

export default function Footer()
{
    return <>
        <footer className="relative overflow-hidden">
            {/* Gradient Background */}
            <div className="absolute inset-0 bg-gradient-to-b from-gray-900 via-purple-900 to-gray-900"></div>
            
            {/* Animated Background Elements */}
            <div className="absolute inset-0 opacity-20">
                <div className="absolute top-0 left-0 w-64 h-64 bg-pink-500 rounded-full filter blur-3xl opacity-30 animate-pulse"></div>
                <div className="absolute bottom-0 right-0 w-64 h-64 bg-purple-500 rounded-full filter blur-3xl opacity-30 animate-pulse"></div>
            </div>

            <div className="relative px-12 pt-14 mx-auto sm:max-w-full md:max-w-full lg:max-w-full md:px-40 lg:px-20">
                <div className="grid gap-10 row-gap-6 mb-14 sm:grid-cols-2 lg:grid-cols-4">
                    {/* Brand Section */}
                    <div className="sm:col-span-2">
                        <div className="mr-4 mb-8 block cursor-pointer py-2 transform hover:scale-105 transition duration-300">
                            <img src="/images/logo.png" alt="SudeFit" className="h-32 w-auto drop-shadow-lg" />
                        </div>
                        <div className="mt-4 lg:max-w-sm">
                            <p className="text-lg text-white/80 leading-relaxed">
                                Kişisel fitness antrenörü olarak, size özel hazırlanmış antrenman ve beslenme programlarıyla hedeflerinize ulaşmanıza yardımcı oluyoruz.
                            </p>
                        </div>
                    </div>

                    {/* Contact Section */}
                    <div className="space-y-4">
                        <h3 className="text-2xl font-bold text-white mb-6 relative inline-block">
                            İletişim
                            <span className="absolute bottom-0 left-0 w-full h-1 bg-gradient-to-r from-pink-500 to-purple-500"></span>
                        </h3>
                        <div className="space-y-4">
                            <div className="flex items-center space-x-3 group">
                                <div className="p-2 bg-white/10 rounded-full group-hover:bg-white/20 transition duration-300">
                                    <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                                    </svg>
                                </div>
                                <a href="tel:+905551234567" className="text-white/80 hover:text-white transition duration-300">+90 555 123 4567</a>
                            </div>
                            <div className="flex items-center space-x-3 group">
                                <div className="p-2 bg-white/10 rounded-full group-hover:bg-white/20 transition duration-300">
                                    <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                                    </svg>
                                </div>
                                <a href="mailto:info@sudefit.com" className="text-white/80 hover:text-white transition duration-300">info@sudefit.com</a>
                            </div>
                            <div className="flex items-center space-x-3 group">
                                <div className="p-2 bg-white/10 rounded-full group-hover:bg-white/20 transition duration-300">
                                    <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                                    </svg>
                                </div>
                                <span className="text-white/80">İstanbul, Türkiye</span>
                            </div>
                        </div>
                    </div>

                    {/* Social Media Section */}
                    <div className="space-y-4">
                        <h3 className="text-2xl font-bold text-white mb-6 relative inline-block">
                            Sosyal Medya
                            <span className="absolute bottom-0 left-0 w-full h-1 bg-gradient-to-r from-pink-500 to-purple-500"></span>
                        </h3>
                        <div className="flex space-x-4">
                            <a href="https://twitter.com/sudefit" target="_blank" rel="noopener noreferrer" className="p-3 bg-white/10 rounded-full hover:bg-white/20 transition duration-300 transform hover:scale-110">
                                <svg className="w-6 h-6 text-white" fill="currentColor" viewBox="0 0 24 24">
                                    <path d="M23.953 4.57a10 10 0 01-2.825.775 4.958 4.958 0 002.163-2.723c-.951.555-2.005.959-3.127 1.184a4.92 4.92 0 00-8.384 4.482C7.69 8.095 4.067 6.13 1.64 3.162a4.822 4.822 0 00-.666 2.475c0 1.71.87 3.213 2.188 4.096a4.904 4.904 0 01-2.228-.616v.06a4.923 4.923 0 003.946 4.827 4.996 4.996 0 01-2.212.085 4.936 4.936 0 004.604 3.417 9.867 9.867 0 01-6.102 2.105c-.39 0-.779-.023-1.17-.067a13.995 13.995 0 007.557 2.209c9.053 0 13.998-7.496 13.998-13.985 0-.21 0-.42-.015-.63A9.935 9.935 0 0024 4.59z"/>
                                </svg>
                            </a>
                            <a href="https://instagram.com/sudefit" target="_blank" rel="noopener noreferrer" className="p-3 bg-white/10 rounded-full hover:bg-white/20 transition duration-300 transform hover:scale-110">
                                <svg className="w-6 h-6 text-white" fill="currentColor" viewBox="0 0 30 30">
                                    <circle cx="15" cy="15" r="4"></circle>
                                    <path d="M19.999,3h-10C6.14,3,3,6.141,3,10.001v10C3,23.86,6.141,27,10.001,27h10C23.86,27,27,23.859,27,19.999v-10 C27,6.14,23.859,3,19.999,3z M15,21c-3.309,0-6-2.691-6-6s2.691-6,6-6s6,2.691,6,6S18.309,21,15,21z M22,9c-0.552,0-1-0.448-1-1 c0-0.552,0.448-1,1-1s1,0.448,1,1C23,8.552,22.552,9,22,9z"></path>
                                </svg>
                            </a>
                            <a href="https://youtube.com/sudefit" target="_blank" rel="noopener noreferrer" className="p-3 bg-white/10 rounded-full hover:bg-white/20 transition duration-300 transform hover:scale-110">
                                <svg className="w-6 h-6 text-white" fill="currentColor" viewBox="0 0 24 24">
                                    <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/>
                                </svg>
                            </a>
                        </div>
                        <p className="text-lg text-white/80 leading-relaxed">
                            Fitness yolculuğunuzda size rehberlik ediyoruz. Kişiselleştirilmiş programlar ve profesyonel destek ile hedeflerinize ulaşın.
                        </p>
                    </div>
                </div>

                {/* Bottom Section */}
                <div className="flex flex-col-reverse justify-between pb-8 lg:flex-row">
                    <div className="w-full h-[2px] mb-6 bg-gradient-to-r from-pink-500 via-purple-500 to-pink-500"></div>
                </div>
                <div className="flex justify-between items-center pb-8">
                    <p className="text-white/80">
                        © 2025 Bilal Orhanlar. Tüm hakları saklıdır.
                    </p>
                    <ul className="flex space-x-6">
                        <li>
                            <Link href="/hakkimda" className="text-white/80 hover:text-white transition duration-300">Hakkımda</Link>
                        </li>
                        <li>
                            <Link href="/planlar" className="text-white/80 hover:text-white transition duration-300">Planlar</Link>
                        </li>
                        <li>
                            <Link href="/banaulasin" className="text-white/80 hover:text-white transition duration-300">Bana Ulaşın</Link>
                        </li>
                    </ul>
                </div>
            </div>
        </footer>
    </>
}