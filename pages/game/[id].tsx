import type { GetServerSideProps, InferGetServerSidePropsType } from 'next'
import { useState } from 'react'
import Head from 'next/head'
import { SystemConst } from '../../components/const'

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

const GamePage = ({
  data
}: InferGetServerSidePropsType<typeof getServerSideProps>) => {
  return (
    <div>
      <Head>
        <title>{`${SystemConst.APPLICATION_NAME} | ${data.game.name}`}</title>
      </Head>

      <div className='text-sm'>hoge</div>
    </div>
  )
}

export default GamePage
