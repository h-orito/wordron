import type { NextPage } from 'next'
import Link from 'next/link'
import styles from '../../styles/navbar.module.css'

const NavBar: NextPage = () => {
  return (
    <nav className={styles.nav}>
      <Link href='/'>
        <a>Home</a>
      </Link>
      <Link href='/about'>
        <a>About</a>
      </Link>
      <Link href='/contact'>
        <a>Contact</a>
      </Link>
    </nav>
  )
}

export default NavBar
