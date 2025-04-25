import React, { useState, useEffect } from 'react';

const Navbar = () => {
    const [isOpen, setIsOpen] = useState(false);
    const [showNavbar, setShowNavbar] = useState(true);
    const [lastScrollY, setLastScrollY] = useState(0);

    const toggleMenu = () => {
        setIsOpen(!isOpen);
    };

    useEffect(() => {
        const handleScroll = () => {
            if (window.scrollY > lastScrollY) {
                setShowNavbar(false);
            } else {
                setShowNavbar(true);
            }
            setLastScrollY(window.scrollY);
        };

        window.addEventListener('scroll', handleScroll);

        return () => window.removeEventListener('scroll', handleScroll);
    }, [lastScrollY]);

    return (
        <nav
            className={`bg-gradient-to-r from-blue-300 to-blue-500 text-white p-4 shadow-lg fixed w-full top-0 left-0 z-10 transition-transform duration-300 ${showNavbar ? 'translate-y-0' : '-translate-y-full'
                }`}
        >
            <div className="max-w-6xl mx-auto flex justify-between items-center">
                <h1 className="text-2xl font-extrabold cursor-pointer hover:text-blue-200 transition">
                    FormPilot
                </h1>

                <div className="hidden md:flex space-x-8">
                    <a href="#home" className="hover:text-blue-200 text-lg font-medium transition">Home</a>
                    <a href="#features" className="hover:text-blue-200 text-lg font-medium transition">Features</a>
                    <a href="#about" className="hover:text-blue-200 text-lg font-medium transition">About</a>
                    <a href="#contact" className="hover:text-blue-200 text-lg font-medium transition">Contact</a>
                </div>

                <div className="md:hidden flex items-center">
                    <button
                        className="text-white focus:outline-none"
                        onClick={toggleMenu}
                    >
                        <svg
                            className="w-6 h-6"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                            xmlns="http://www.w3.org/2000/svg"
                        >
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth="2"
                                d="M4 6h16M4 12h16M4 18h16"
                            ></path>
                        </svg>
                    </button>
                </div>
            </div>

            <div className={`md:hidden ${isOpen ? "block" : "hidden"} bg-gradient-to-r from-blue-300 to-blue-500 p-4`}>
                <a onClick={
                    () => setIsOpen(false)
                } href="#home" className="block text-lg font-medium text-white py-2 hover:text-blue-200 transition">Home</a>
                <a onClick={
                    () => setIsOpen(false)
                } href="#features" className="block text-lg font-medium text-white py-2 hover:text-blue-200 transition">Features</a>
                <a onClick={
                    () => setIsOpen(false)
                } href="#about" className="block text-lg font-medium text-white py-2 hover:text-blue-200 transition">About</a>
                <a onClick={
                    () => setIsOpen(false)
                } href="#contact" className="block text-lg font-medium text-white py-2 hover:text-blue-200 transition">Contact</a>
            </div>
        </nav>
    );
};

export default Navbar;
