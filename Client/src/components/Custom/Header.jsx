import React from 'react'
import ResumeLogo from '../../assets/ResumeLogo.svg'
import { Button } from '../ui/button'
import { UserButton, useUser } from '@clerk/clerk-react'
import { NavLink, Link } from 'react-router-dom'

const Header = () => {
  const { user, isSignedIn } = useUser()

  return (
    <header className="flex items-center justify-between px-6 py-4 bg-white shadow-md">
      {/* Logo */}
      <img src={ResumeLogo} alt="Resume Logo" className="h-12" />

      {/* Navigation Links */}
      <div className="flex items-center gap-4">
        {isSignedIn ? (
          <>
            {/* NavLink with active style for Dashboard */}
            <NavLink
              to="/dashboard"
              className={({ isActive }) =>
                isActive
                  ? "bg-blue-700 text-white px-4 py-2 rounded transition"
                  : "bg-blue-600 text-white hover:bg-blue-700 px-4 py-2 rounded transition"
              }
            >
              Dashboard
            </NavLink>

            {/* Clerk User Avatar Menu */}
            <UserButton />
          </>
        ) : (
          <Link to="/auth/sign-in">
            <Button className="bg-black text-white hover:bg-gray-900">
              Get Started
            </Button>
          </Link>
        )}
      </div>
    </header>
  )
}

export default Header
