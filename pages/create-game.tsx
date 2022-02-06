import type { GetServerSideProps, InferGetServerSidePropsType } from 'next'
import { useState } from 'react'
import Head from 'next/head'
import { SystemConst } from '../components/const'

type Data = {
  game: Game | null
}

export const getServerSideProps: GetServerSideProps = async (id) => {
  const res = await fetch(`${process.env.API_ORIGIN}/games/${id}`)
  const data: Data = await res.json()
  return {
    props: { data }
  }
}

const NewGamePage = ({
  data
}: InferGetServerSidePropsType<typeof getServerSideProps>) => {
  return (
    <div>
      <Head>
        <title>{`${SystemConst.APPLICATION_NAME} | 新しいわーどるを作成する`}</title>
      </Head>

      <div className='text-sm'>hoge</div>
    </div>
  )
}

export default NewGamePage
