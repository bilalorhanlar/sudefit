import { useState, useEffect } from 'react';
import Link from 'next/link';

export default function Header() {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  return (
    <header className={`fixed w-full z-50 transition-all duration-300 ${
      scrolled ? 'bg-white/80 backdrop-blur-sm shadow-xl' : 'bg-transparent'
    }`}>
      <div className="container mx-auto px-4">
        <nav className="relative">
          <div className="flex items-center justify-between py-4">
            <Link href="/" className="flex-shrink-0 transform hover:scale-105 transition duration-300">
              <img src="/images/logooo.png" alt="SudeFit" className="h-20 w-auto object-contain drop-shadow-lg" />
            </Link>
            
            <button 
              onClick={toggleMenu} 
              className="lg:hidden p-2 rounded-full bg-white/10 backdrop-blur-sm hover:bg-white/20 transition duration-300"
              aria-label="Menu"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-gray-800" fill="none" stroke="currentColor" strokeWidth="2">
                <path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 12h16M4 18h16"></path>
              </svg>
            </button>

            <div className={`lg:flex ${isOpen ? 'block' : 'hidden'} absolute lg:relative top-20 lg:top-0 left-0 w-full lg:w-auto bg-white/80 backdrop-blur-md lg:bg-transparent lg:backdrop-blur-none rounded-xl lg:rounded-none shadow-xl lg:shadow-none p-4 lg:p-0`}>
              <ul className="flex flex-col lg:flex-row space-y-4 lg:space-y-0 lg:space-x-8">
                <li>
                  <Link href="/" className={`block transition duration-300 text-lg font-bold tracking-wide ${
                    scrolled ? 'text-gray-800 hover:text-pink-500' : 'text-gray-500 hover:text-pink-200'
                  }`}>
                    Ana Sayfa
                  </Link>
                </li>
                <li>
                  <Link href="/planlar" className={`block transition duration-300 text-lg font-bold tracking-wide ${
                    scrolled ? 'text-gray-800 hover:text-pink-500' : 'text-gray-500 hover:text-pink-200'
                  }`}>
                    Planlar
                  </Link>
                </li>
                <li>
                  <Link href="/hakkimda" className={`block transition duration-300 text-lg font-bold tracking-wide ${
                    scrolled ? 'text-gray-800 hover:text-pink-500' : 'text-gray-500 hover:text-pink-200'
                  }`}>
                    Hakkımda
                  </Link>
                </li>
                <li>
                  <Link href="/banaulasin" className={`block transition duration-300 text-lg font-bold tracking-wide ${
                    scrolled ? 'text-gray-800 hover:text-pink-500' : 'text-gray-500 hover:text-pink-200'
                  }`}>
                    Bana Ulaşın
                  </Link>
                </li>
              </ul>
            </div>
          </div>
        </nav>
      </div>
      
    </header>
  );
}
