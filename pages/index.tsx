import type {
  NextPage,
  GetServerSideProps,
  InferGetServerSidePropsType
} from 'next'
import Link from 'next/link'
import Head from 'next/head'
import { SystemConst } from '../components/const'
import styles from './index.module.css'
import { PrimaryButton } from '../components/button/button'
import React from 'react'
import Router from 'next/router'

type Data = {
  games: Game[]
}

export const getServerSideProps: GetServerSideProps = async () => {
  const res = await fetch(`${process.env.NEXT_PUBLIC_API_ORIGIN}/games`)
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
      </Head>

      <div>
        <section className='py-10 mb-10 text-sm'>
          <p className='mb-5 leading-relaxed text-gray-600'>
            わーどるめーかーは、オリジナルのWordleの問題を作成できるサービスです。
          </p>
          <PrimaryButton onClick={() => Router.push('/create-game')}>
            新しいわーどるを作成する
          </PrimaryButton>
        </section>
        <section className='py-10 text-sm'>
          <h1 className='mb-10 text-lg'>最近作成されたわーどる</h1>
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
                      <Link href={`/game?key=${game.key}`}>
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
