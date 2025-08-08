import React from 'react'
import { Navigate, Outlet } from 'react-router-dom'
import { Button } from './components/ui/button'
import { useUser } from '@clerk/clerk-react'
import Header from './components/Custom/Header'
import { Toaster } from 'sonner'

const App = () => {

  const { user, isLoaded, isSignedIn } = useUser();

  if (!isSignedIn && isLoaded) {
    return <Navigate to="/auth/sign-in" />
  }

  return (
    <div>
      <Header />
      <Outlet />

      <Toaster/>
    </div>
  )
}

export default App
