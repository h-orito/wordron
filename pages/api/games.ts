import type { NextApiRequest, NextApiResponse } from 'next'
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
  const snapshot = await database
    .ref('games')
    .orderByChild('created')
    .limitToLast(10)
    .get()
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
  await auth.signInAnonymously()

  // register new game to firebase
  const newGameRef = database.ref().child('games').push()
  newGameRef.set(game)
}
