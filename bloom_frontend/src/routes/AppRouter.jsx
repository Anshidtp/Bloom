import { lazy, Suspense } from 'react'
import { createBrowserRouter, Outlet } from 'react-router-dom'
import Navbar from '../components/common/Navbar/Navbar.jsx'
import Footer from '../components/common/Footer/Footer.jsx'
import Loader from '../components/common/Loader/Loader.jsx'
import CartSidebar from '../components/cart/CartSidebar.jsx'

// Lazy-loaded pages for code splitting
const Home       = lazy(() => import('../pages/Home/Home.jsx'))
const Collections= lazy(() => import('../pages/Collections/Collections.jsx'))
const Explore    = lazy(() => import('../pages/Explore/Explore.jsx'))
const CustomCake = lazy(() => import('../pages/CustomCake/CustomCake.jsx'))
const Cart       = lazy(() => import('../pages/Cart/Cart.jsx'))
const Checkout   = lazy(() => import('../pages/Checkout/Checkout.jsx'))
const Success    = lazy(() => import('../pages/Success/Success.jsx'))
const Contact    = lazy(() => import('../pages/Contact/Contact.jsx'))

// Root layout wrapping every page
function RootLayout() {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <CartSidebar />
      <main className="flex-1">
        <Suspense fallback={<Loader />}>
          <Outlet />
        </Suspense>
      </main>
      <Footer />
    </div>
  )
}

export const router = createBrowserRouter([
  {
    path: '/',
    element: <RootLayout />,
    children: [
      { index: true,          element: <Home /> },
      { path: 'collections',  element: <Collections /> },
      { path: 'explore',      element: <Explore /> },
      { path: 'custom-cake',  element: <CustomCake /> },
      { path: 'cart',         element: <Cart /> },
      { path: 'checkout',     element: <Checkout /> },
      { path: 'success',      element: <Success /> },
      { path: 'contact',      element: <Contact /> },
    ],
  },
])
