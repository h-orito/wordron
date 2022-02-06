import { NextPage } from 'next'
import NavBar from './navbar'
import Footer from './footer'

const Layout: NextPage = ({ children }) => {
  return (
    <>
      <NavBar />
      <main>{children}</main>
      <Footer />
    </>
  )
}

export default Layout
