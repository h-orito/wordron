import type { NextApiRequest, NextApiResponse } from 'next'
import { useRouter } from 'next/router'
import { database } from '../../plugins/firebase'

type Data = {
  game: Game | null
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  const key = req.query.key as string
  const snapshot = await database.ref(`games/${key}`).get()
  const g = snapshot.val() as Game
  const game = {
    ...g,
    key: key,
    word: random(g.dictionaries)
  } as Game

  res.status(200).json({ game: game })
}

const random = (array: Array<string>) => {
  var arrayIndex = Math.floor(Math.random() * array.length)
  return array[arrayIndex]
}
