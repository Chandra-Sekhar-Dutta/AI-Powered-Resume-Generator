import Header from '@/components/Custom/Header'
import { UserButton } from '@clerk/clerk-react'
import React from 'react'
import { FaRocket, FaClipboardList, FaUserTie, FaArrowRight } from 'react-icons/fa'
import { useNavigate } from 'react-router-dom'

const Home = () => {
  const navigate = useNavigate();

  const handleNavigate = () => {
    navigate('/dashboard');
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-indigo-100 via-white to-indigo-50">
      {/* Header */}
      <Header />

      {/* Hero Section */}
      <main className="flex flex-col items-center justify-center text-center px-6 py-20">
        <h1 className="text-5xl font-extrabold text-gray-900 leading-tight mb-4">
          Build Your <span className="text-indigo-600">Professional Resume</span> Effortlessly
        </h1>
        <p className="text-lg text-gray-600 max-w-2xl mb-8">
          Create a modern, ATS-friendly resume in minutes. Showcase your skills, experience, and education with a 
          beautifully designed template that stands out.
        </p>
        <button  
          onClick={handleNavigate}
          className="px-6 py-3 bg-indigo-600 text-white font-medium rounded-xl shadow-lg hover:bg-indigo-700 transition flex items-center gap-2"
        >
          Get Started <FaArrowRight />
        </button>
      </main>

      {/* Features Section */}
      <section className="grid md:grid-cols-3 gap-8 px-10 py-16 max-w-6xl mx-auto">
        <div className="bg-white rounded-2xl shadow-lg p-8 hover:shadow-xl transition">
          <FaRocket className="text-indigo-600 text-3xl mb-4" />
          <h3 className="text-xl font-semibold text-gray-800 mb-2">Quick & Easy</h3>
          <p className="text-gray-600">Generate resumes instantly with our simple and intuitive builder.</p>
        </div>

        <div className="bg-white rounded-2xl shadow-lg p-8 hover:shadow-xl transition">
          <FaClipboardList className="text-indigo-600 text-3xl mb-4" />
          <h3 className="text-xl font-semibold text-gray-800 mb-2">Edit your previous resumes</h3>
          <p className="text-gray-600">Edit your previous resumes to make it more professional.</p>
        </div>

        <div className="bg-white rounded-2xl shadow-lg p-8 hover:shadow-xl transition">
          <FaUserTie className="text-indigo-600 text-3xl mb-4" />
          <h3 className="text-xl font-semibold text-gray-800 mb-2">Professional</h3>
          <p className="text-gray-600">Highlight your skills and achievements in a clean, ATS-friendly format.</p>
        </div>
      </section>

      {/* Call to Action */}
      <section className="text-center py-16 bg-indigo-50">
        <h2 className="text-3xl font-bold text-gray-900 mb-4">
          Ready to Land Your Dream Job?
        </h2>
        <p className="text-gray-600 mb-6">Start creating your resume today and make the first impression count.</p>
        <button 
          onClick={handleNavigate}
          className="px-6 py-3 bg-indigo-600 text-white font-medium rounded-xl shadow-lg hover:bg-indigo-700 transition"
        >
          Create Resume Now
        </button>
      </section>
    </div>
  )
}

export default Home
