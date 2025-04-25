const Features = () => {
    return (
        <section id="features" className="bg-gradient-to-br from-slate-100 via-white to-blue-200 text-blue-500 py-12 px-6 text-center shadow-lg my-10">
            <div className="max-w-5xl mx-auto text-center">
                <h2 className="text-4xl font-bold text-blue-600 mb-10">Features</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8 text-center">
                    <div className="space-y-4">
                        <p className="text-lg text-blue-700">🔒 Secure and reliable data management.</p>
                        <p className="text-lg text-blue-700">📊 Intuitive dashboard for easy navigation.</p>
                        <p className="text-lg text-blue-700">⚡ Fast and efficient CRUD operations.</p>
                    </div>
                    <div className="space-y-4">
                        <p className="text-lg text-blue-700">🌐 RESTful API for seamless integration.</p>
                        <p className="text-lg text-blue-700">🛠️ Customizable templates for quick setup.</p>
                        <p className="text-lg text-blue-700">📈 Analytics and reporting tools.</p>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default Features;
