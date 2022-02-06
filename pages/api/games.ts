import type { NextApiRequest, NextApiResponse } from 'next'

type Data = {
  games: Game[]
}

export default function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  res.status(200).json({
    games: [
      {
        id: 1,
        name: 'ゲーム名',
        creator: '作成者名',
        description: '難しいかも',
        dictionaries: ['せいかいは', 'なんだろね']
      },
      {
        id: 2,
        name: 'ゲーム名',
        creator: '作成者名',
        description: '難しいかも',
        dictionaries: ['せいかいは', 'なんだろね']
      },
      {
        id: 2,
        name: 'ゲーム名',
        creator: '作成者名',
        description: '難しいかも',
        dictionaries: ['せいかいは', 'なんだろね']
      }
    ]
  })
}
