import React from 'react'
import { Routes, Route } from 'react-router-dom'
import { Home, Signin, Signup } from './pages'
import { AuthLayout } from './elements'
import { Toaster } from "@/components/ui/toaster"

export default function App() {
  return (
    <div className=' w-full font-geist'>

      <Routes>
        
        <Route element={<AuthLayout />} >
          <Route path='/signup' element={<Signup />} />
          <Route path='/signin' element={<Signin />} />
        </Route>

        <Route path='/' element={<Home />} />

      </Routes>

      <Toaster />
    </div>
  )
}
