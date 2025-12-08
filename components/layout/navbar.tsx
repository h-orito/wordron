import type { NextPage } from 'next'
import { SystemConst } from '../const'
import Link from 'next/link'

const NavBar: NextPage = () => {
  return (
    <nav className='px-5 pt-5 pb-6 w-full bg-slate-200'>
      <Link href='/' className='font-yomogi text-4xl text-center cursor-pointer block'>
        {SystemConst.APPLICATION_NAME}
      </Link>
    </nav>
  )
}

export default NavBar
