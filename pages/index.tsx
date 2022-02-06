import type {
  NextPage,
  GetServerSideProps,
  InferGetServerSidePropsType
} from 'next'
import Link from 'next/link'
import Head from 'next/head'
import Image from 'next/image'
import { SystemConst } from '../components/const'
import styles from './index.module.css'
import { PrimaryButton } from '../components/button/button'

type Data = {
  games: Game[]
}

export const getServerSideProps: GetServerSideProps = async () => {
  const res = await fetch(`${process.env.API_ORIGIN}/games`)
  const data: Data = await res.json()
  return {
    props: { data }
  }
}

const Home: NextPage = ({
  data
}: InferGetServerSidePropsType<typeof getServerSideProps>) => {
  return (
    <div>
      <Head>
        <title>{SystemConst.APPLICATION_NAME}</title>
        <meta name='description' content='言葉当てゲーム' />
        <link rel='icon' href='/favicon.ico' />
      </Head>

      <div>
        <h1 className='text-lg'>わーどるを作成する</h1>
        <section className='mt-5 mb-10 text-sm'>
          <Link href='/create-game' passHref>
            <PrimaryButton onClick={() => {}}>
              新しいわーどるを作成する
            </PrimaryButton>
          </Link>
        </section>
        <h1 className='text-lg'>最近作成されたわーどる</h1>
        <section className='mt-5 mb-10 text-sm'>
          <table className='w-full text-gray-600'>
            <thead>
              <tr>
                <th className={styles.th}>わーどる名</th>
                <th className={styles.th}>作成者</th>
              </tr>
            </thead>
            <tbody>
              {data.games.map((game: Game, index: number) => {
                const tdClass = index % 2 == 0 ? 'bg-gray-50' : ''
                return (
                  <tr key={index}>
                    <td className={`${styles.td} ${tdClass}`}>
                      <Link href={`/game/${game.id}`}>
                        <a>{game.name}</a>
                      </Link>
                    </td>
                    <td className={`${styles.td} ${tdClass}`}>
                      {game.creator}
                    </td>
                  </tr>
                )
              })}
            </tbody>
          </table>
        </section>
      </div>
    </div>
  )
}

export default Home
