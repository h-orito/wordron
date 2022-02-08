import type { NextApiRequest, NextApiResponse } from 'next'
import { database } from '../../plugins/firebase'

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
  const games: Game[] = Object.entries(snapshot.val()).map(([key, value]) => {
    const g = value as Game
    return {
      ...g,
      key: key
    } as Game
  })

  res.status(200).json({ games: games.reverse() })
  // res.status(200).json({
  //   games: [
  //     {
  //       key: 'aaa',
  //       name: 'ゲーム名',
  //       creator: '作成者名',
  //       description: '難しいかも',
  //       dictionaries: ['せいかいは', 'なんだろね'],
  //       created: new Date().getTime()
  //     },
  //     {
  //       key: 'aaa',
  //       name: 'ゲーム名',
  //       creator: '作成者名',
  //       description: '難しいかも',
  //       dictionaries: ['せいかいは', 'なんだろね'],
  //       created: new Date().getTime()
  //     },
  //     {
  //       key: 'aaa',
  //       name: 'ゲーム名',
  //       creator: '作成者名',
  //       description: '難しいかも',
  //       dictionaries: ['せいかいは', 'なんだろね'],
  //       created: new Date().getTime()
  //     }
  //   ]
  // })
}

const handlePost = async (req: NextApiRequest) => {
  const game: Game = JSON.parse(req.body)

  // register new game to firebase
  const newGameRef = database.ref().child('games').push()
  newGameRef.set(game)
}
