import { NextPage } from 'next'
import NavBar from './navbar'
import Footer from './footer'

const Layout: NextPage = ({ children }) => {
  return (
    <div className='w-full'>
      <NavBar />
      <main className='py-5 px-2 text-center sm:px-5 sm:mx-auto sm:w-2/3'>
        {children}
      </main>
      <Footer />
    </div>
  )
}

export default Layout
