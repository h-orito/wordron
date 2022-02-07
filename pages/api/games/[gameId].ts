import type { NextApiRequest, NextApiResponse } from 'next'

type Data = {
  game: Game | null
}

export default function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  const { gameId } = req.query

  res.status(200).json({
    game: {
      id: parseInt(`${gameId}`),
      name: 'ゲーム名',
      creator: '作成者名',
      description: 'むずかしいかもね',
      dictionaries: ['せいかいは', 'なんだろね'],
      word: 'あいうえお'
    }
  })
}
