const Footer = () => {
    return (
        <footer id="contact" className="bg-gradient-to-r from-blue-300 to-blue-500 text-white py-6 mt-12">
            <div className="max-w-full mx-auto px-4 text-center">
                <p className="text-lg font-medium">
                    Crud Platform &copy; {new Date().getFullYear()}
                </p>
                <p className="text-md mt-2">
                    Built with ❤️ by Jeet
                </p>
                <div className="mt-4 flex justify-center gap-6">
                    <a
                        href="https://x.com/I_am_Jeet5"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-white hover:text-blue-300"
                    >
                        Twitter
                    </a>
                    <a
                        href="https://github.com/JeetDas5"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-white hover:text-blue-300"
                    >
                        GitHub
                    </a>
                    <a
                        href="https://www.linkedin.com/in/jeet-das-7633a52ab"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-white hover:text-blue-300"
                    >
                        LinkedIn
                    </a>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
