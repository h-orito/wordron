import type { NextPage } from 'next'
import { SystemConst } from '../const'
import Link from 'next/link'

const NavBar: NextPage = () => {
  return (
    <nav className='px-5 pt-5 pb-6 w-full bg-slate-200'>
      <Link href='/' passHref>
        <p className='font-yomogi text-4xl text-center cursor-pointer'>
          {SystemConst.APPLICATION_NAME}
        </p>
      </Link>
    </nav>
  )
}

export default NavBar
