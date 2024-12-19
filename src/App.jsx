import { useState } from 'react'
import { Routes,Route } from 'react-router-dom'
import './App.css'
import ListProduct from './pages/ListProduct'
import ProductDetail from './pages/ProductDetail'
import LoginPage from './pages/LoginPage'
import CartPage from './pages/CartPage'
import Header from './components/Header'
import ProtectedRoute from './pages/ProtectedRoutes'



function App() {
  const [count, setCount] = useState(0)
  
  return (
    <>
     <div>
      <Header/>
      <Routes>
        <Route path='/' element={<ListProduct/>} />
        <Route path="/product/:id" element={<ProductDetail />} />
        <Route path='/login' element={<LoginPage/>}/>
        <Route path='/cart' element={
          <ProtectedRoute>
            <CartPage/>
          </ProtectedRoute>}/>
        <Route/>
      </Routes>
     </div>
    </>
  )
}

export default App
