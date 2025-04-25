import React from 'react'

const Hero = () => {
    return (
        <section id="home" className="relative w-full h-screen bg-gradient-to-br from-slate-100 via-white to-blue-200  text-white flex items-center justify-center backdrop-blur-md">
            <div className="absolute inset-0 opacity-40"></div>

            <div className="relative z-10 text-center px-6 md:px-12">
                <h1 className="text-5xl text-blue-500 font-extrabold leading-tight mb-4 drop-shadow-lg">
                    Welcome to FormPilot Crud Platform
                </h1>

                <p className="text-xl mb-6 max-w-3xl mx-auto text-blue-800 font-medium">
                    Manage your API keys, credentials, and data with ease. Start building your next project with our simple and effective CRUD platform.
                </p>

                <div className="space-x-4">
                    <a
                        href="#dashboard"
                        className="inline-block bg-blue-600 text-white font-semibold py-3 px-6 rounded-lg shadow-md hover:bg-blue-700 transition"
                    >
                        Dashboard
                    </a>
                </div>
            </div>
        </section>

    )
}

export default Hero