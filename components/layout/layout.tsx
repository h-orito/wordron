import NavBar from './navbar'
import Footer from './footer'

type Props = {
  children: React.ReactNode
}

const Layout = ({ children }: Props): React.ReactElement => {
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
