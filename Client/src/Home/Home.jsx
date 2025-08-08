import Header from '@/components/Custom/Header'
import { UserButton } from '@clerk/clerk-react'
import React from 'react'

const Home = () => {
  return (
    <div className="min-h-screen bg-gradient-to-b from-indigo-50 to-white">
      <Header />
      <main className="flex flex-col items-center justify-center py-16">
        <h1 className="text-3xl font-semibold text-gray-800 mb-6">Welcome to the Home Page</h1>
      </main>
    </div>
  )
}

export default Home
