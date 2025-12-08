import type { NextApiRequest, NextApiResponse } from 'next'
import { signInAnonymously } from 'firebase/auth'
import {
  ref,
  query,
  orderByChild,
  limitToLast,
  get,
  push,
  set
} from 'firebase/database'
import { auth, database } from '../../plugins/firebase'

type Data = {
  games: Game[]
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data | null>
) {
  if (req.method === 'POST') {
    await handlePost(req)
    return res.status(200).json(null)
  }
  // get request
  // 最新の10ゲームを取得
  const gamesRef = ref(database, 'games')
  const gamesQuery = query(gamesRef, orderByChild('created'), limitToLast(10))
  const snapshot = await get(gamesQuery)
  const snapShotGames = snapshot.val()
  if (snapShotGames == null) return res.status(200).json({ games: [] })
  const games: Game[] = Object.entries(snapShotGames).map(([key, value]) => {
    const g = value as Game
    return {
      ...g,
      key: key
    } as Game
  })

  res.status(200).json({ games: games.reverse() })
}

const handlePost = async (req: NextApiRequest) => {
  const game: Game = JSON.parse(req.body)

  // login
  await signInAnonymously(auth)

  // register new game to firebase
  const gamesRef = ref(database, 'games')
  const newGameRef = push(gamesRef)
  await set(newGameRef, game)
}
