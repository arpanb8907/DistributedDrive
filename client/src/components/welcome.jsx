import React from 'react';

export default function Welcome() {
  return (
    <div className="min-h-screen bg-gradient-to-tr from-indigo-700 via-purple-700 to-pink-600 text-white flex flex-col">
      {/* Navbar */}
      <header className="flex items-center justify-between px-6 py-4 shadow-lg bg-opacity-30 backdrop-blur-sm">
        <div className="text-2xl font-bold tracking-wide">DistributedDrive</div>
        <nav className="space-x-6 text-white text-lg font-medium">
          <a href="#" className="hover:underline">Home</a>
          <a href="#" className="hover:underline">Features</a>
          <a href="#" className="hover:underline">Docs</a>
          <a href="#" className="hover:underline">GitHub</a>
        </nav>
      </header>

      {/* Hero Section */}
      <main className="flex flex-col items-center justify-center flex-grow px-6 text-center">
        <h1 className="text-5xl md:text-6xl font-extrabold leading-tight mb-4 animate-fade-in">
          Secure. Scalable. Distributed.
        </h1>
        <p className="text-lg md:text-xl max-w-2xl mb-8 animate-fade-in delay-200">
          DistributedDrive is your decentralized file-sharing and management system — built for speed, scale, and security.
        </p>
        <div className="flex gap-4 flex-wrap justify-center animate-fade-in delay-300">
          <a href="/login" className="px-6 py-3 bg-white text-indigo-700 rounded-xl font-semibold text-lg shadow hover:bg-gray-100 transition">
            Get Started
          </a>
          <a href="/api" className="px-6 py-3 border-2 border-white rounded-xl text-white font-semibold text-lg hover:bg-white hover:text-indigo-700 transition">
            Visit API
          </a>
        </div>
      </main>

      {/* Features Teaser */}
      <section className="bg-white text-gray-800 py-12 px-6 text-center">
        <h2 className="text-3xl font-bold mb-6">Why DistributedDrive?</h2>
        <div className="grid md:grid-cols-3 gap-6 max-w-6xl mx-auto">
          <div className="bg-gray-100 p-6 rounded-2xl shadow hover:shadow-lg transition">
            <h3 className="text-xl font-semibold mb-2">Chunked Uploads</h3>
            <p>Upload large files efficiently with automatic resume and chunking support.</p>
          </div>
          <div className="bg-gray-100 p-6 rounded-2xl shadow hover:shadow-lg transition">
            <h3 className="text-xl font-semibold mb-2">Role-based Access</h3>
            <p>Granular permissions for users and groups — sharing made simple and secure.</p>
          </div>
          <div className="bg-gray-100 p-6 rounded-2xl shadow hover:shadow-lg transition">
            <h3 className="text-xl font-semibold mb-2">Cloud Native</h3>
            <p>Seamless integration with AWS S3 for scalable cloud storage solutions.</p>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-indigo-800 text-center py-6 text-sm text-gray-300">
        © 2025 DistributedDrive. Built with ❤️ using React, Node.js, and Tailwind CSS.
      </footer>

      {/* Custom Animation */}
      <style>{`
        @keyframes fade-in {
          0% { opacity: 0; transform: translateY(20px); }
          100% { opacity: 1; transform: translateY(0); }
        }
        .animate-fade-in {
          animation: fade-in 0.8s ease-out both;
        }
        .delay-200 {
          animation-delay: 0.2s;
        }
        .delay-300 {
          animation-delay: 0.3s;
        }
      `}</style>
    </div>
  );
}
