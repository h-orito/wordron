import type { NextPage } from 'next'
import { SystemConst } from '../const'
import Link from 'next/link'

const NavBar: NextPage = () => {
  return (
    <nav className='flex p-5 w-full bg-slate-200 border-b border-slate-400'>
      <h1>
        <Link href='/'>{SystemConst.APPLICATION_NAME}</Link>
      </h1>
    </nav>
  )
}

export default NavBar
