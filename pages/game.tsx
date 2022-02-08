import type { GetServerSideProps, InferGetServerSidePropsType } from 'next'
import { useState } from 'react'
import Head from 'next/head'
import Modal from '../components/modal/modal'
import { SystemConst } from '../components/const'
import InputText from '../components/form/input-text'
import { PrimaryButton } from '../components/button/button'

type Data = {
  game: Game | null
}

export const getServerSideProps: GetServerSideProps = async (context) => {
  const res = await fetch(
    `${process.env.API_ORIGIN}/game?key=${context.query.key}`
  )
  const data: Data = await res.json()
  return {
    props: { data }
  }
}

const GamePage = ({
  data
}: InferGetServerSidePropsType<typeof getServerSideProps>) => {
  // TODO how to play
  // TODO tweet
  // TODO 正解の文字が被っているパターン
  // TODO スマホの文字入力補助
  // TODO 結果モーダル

  const game: Game = data.game
  const maxAnswerCount: number = game.maxAnswerCount
  const answerLength: number = game.dictionaries[0].length

  // modal
  const [isHowtoModalOpen, setHowtoModalOpen] = useState(true)
  const closeHowtoModal = () => setHowtoModalOpen(false)
  // 回答入力欄
  const [currentAnswer, setCurrentAnswer] = useState('')
  const addCharToCurrentAnswer = (char: string) => {
    if (!availableAnswer) return
    setCurrentAnswer(currentAnswer + char)
  }
  const [currentAnswerError, setCurrentAnswerError] = useState('')
  const [availableAnswer, setAvailableAnswer] = useState(true)
  // 回答履歴
  const [answers, setAnswers] = useState(
    createInitialAnswers(maxAnswerCount, answerLength)
  )
  // 五十音表
  const [kanas, setKanas] = useState(initialKanas)

  // 回答する
  const doAnswer = () => {
    const correctAnswer = game.word!
    const errorMsg = validateCurrentAnswer(currentAnswer, answerLength)
    setCurrentAnswerError(errorMsg)
    if (errorMsg.length > 0) return

    const answerWords = correctAnswer.split('')

    const currentAnswerIndex = answers.findIndex(
      (answer) => answer.strs[0].color == null
    )!
    if (currentAnswerIndex == -1) {
      setAvailableAnswer(false)
      return
    }
    // 解答
    let anss = answers.slice()
    anss.splice(currentAnswerIndex, 1, {
      strs: currentAnswer.split('').map((wordStr: string, index: number) => {
        return {
          str: wordStr,
          color:
            answerWords[index] === wordStr
              ? 'bg-green-500'
              : answerWords.some((a: string) => a === wordStr)
              ? 'bg-yellow-500'
              : 'bg-gray-500'
        }
      })
    } as Answer)
    setAnswers(anss)
    // 五十音表
    const newKanas = kanas.map((kanaArray) => {
      return kanaArray.map((kana) => {
        if (
          anss.some((answer) =>
            answer.strs.some(
              (str) => str.str === kana.kana && str.color === 'bg-green-500'
            )
          )
        ) {
          return {
            kana: kana.kana,
            color: 'bg-green-500'
          } as Kana
        } else if (
          anss.some((answer) =>
            answer.strs.some(
              (str) => str.str === kana.kana && str.color === 'bg-yellow-500'
            )
          )
        ) {
          return {
            kana: kana.kana,
            color: 'bg-yellow-500'
          } as Kana
        } else if (
          anss.some((answer) =>
            answer.strs.some(
              (str) => str.str === kana.kana && str.color === 'bg-gray-500'
            )
          )
        ) {
          return {
            kana: kana.kana,
            color: 'bg-gray-500'
          } as Kana
        }
        return kana
      })
    })
    setKanas(newKanas)
    // 回答をリセット
    setCurrentAnswer('')
    if (currentAnswerIndex === maxAnswerCount - 1) {
      setAvailableAnswer(false)
      // TODO result modal
    }
  }

  return (
    <div>
      <Head>
        <title>{`${SystemConst.APPLICATION_NAME} | ${data.game.name}`}</title>
      </Head>

      <div className='text-sm'>
        <p className='mb-2 text-xl'>{data.game.name}</p>
        <p className='text-gray-400'>{data.game.description}</p>
        <div className='my-5'>
          <div className='flex flex-col gap-2'>
            {answers.map((answer, colIdx) => (
              <div key={colIdx} className='flex gap-2'>
                {answer.strs.map((answerString, rowIdx) => (
                  <div
                    key={rowIdx}
                    className={`w-12 h-12 text-4xl text-center rounded border-4 border-gray-400 text-white ${
                      answerString.color != null ? answerString.color : ''
                    }`}
                  >
                    {answerString.str}
                  </div>
                ))}
              </div>
            ))}
          </div>
        </div>

        <div className='my-5'>
          <div className='flex'>
            <InputText
              className={`w-96 ${
                currentAnswerError.length > 0 ? 'border-red-500' : ''
              }`}
              value={currentAnswer}
              onChange={(event) => setCurrentAnswer(event.target.value)}
              onKeyPress={(e) => {
                if (e.key == 'Enter') {
                  e.preventDefault()
                  doAnswer()
                }
              }}
              disabled={!availableAnswer}
              placeholder={`ひらがな${answerLength}文字で入力`}
            />
            <PrimaryButton
              className='ml-2'
              onClick={doAnswer}
              disabled={!availableAnswer}
            >
              解答する
            </PrimaryButton>
          </div>
          {currentAnswerError.length > 0 && (
            <p className='mt-1 ml-1 text-red-500'>{currentAnswerError}</p>
          )}
        </div>

        <div className='my-5'>
          <div className='flex flex-col gap-2'>
            {kanas.map((col, colIdx) => (
              <div key={colIdx} className='flex gap-2'>
                {col.map((kana, rowIdx) => (
                  <div
                    key={rowIdx}
                    className={`w-10 h-10 sm:w-10 sm:h-10 ${
                      kana.kana != null
                        ? 'sm:text-2xl text-center text-gray-400 rounded border-4 border-gray-400'
                        : ''
                    } ${kana.color != null ? `text-white ${kana.color}` : ''}
                       ${availableAnswer ? 'cursor-pointer' : ''}`}
                    onClick={() => addCharToCurrentAnswer(kana.kana || '')}
                  >
                    {kana.kana}
                  </div>
                ))}
              </div>
            ))}
          </div>
        </div>
      </div>

      <Modal
        closeButtonName='Close'
        handleClose={closeHowtoModal}
        isShow={isHowtoModalOpen}
      >
        <p className='text-xl'>How to Play</p>
        <div className='mt-5'>
          <p>TBD</p>
        </div>
      </Modal>
    </div>
  )
}

export default GamePage

const createInitialAnswers = (maxTryCount: number, answerLength: number) =>
  [...Array(maxTryCount)].map(
    (_) =>
      ({
        strs: [...Array(answerLength)].map(
          (_) =>
            ({
              str: null,
              color: null
            } as AnswerString)
        )
      } as Answer)
  )

type Answer = {
  strs: AnswerString[]
}

type AnswerString = {
  str: string | null
  color: string | null
}

type Kana = {
  kana: string | null
  color: string | null
}

const initialKanas: Kana[][] = [
  'あいうえおかきくけこ',
  'さしすせそたちつてと',
  'なにぬねのはひふへほ',
  'まみむめもや　ゆ　よ',
  'らりるれろわ　を　ん',
  'がぎぐげござじずぜぞ',
  'だぢづでどばびぶべぼ',
  'ぱぴぷぺぽぁぃぅぇぉ',
  '　　　　　ゃゅょっー'
].map((str) =>
  str.split('').map((str) => {
    return {
      kana: str === '　' ? null : str,
      color: null
    } as Kana
  })
)

const validateCurrentAnswer = (
  currentAnswer: string,
  answerLength: number
): string => {
  if (currentAnswer.length !== answerLength) {
    return `解答は${answerLength}文字です。`
  }
  if (
    currentAnswer
      .split('')
      .some((char) => !SystemConst.HIRAGANAS.some((h) => h === char))
  ) {
    return '解答はひらがなで入力してください。'
  }
  return ''
}
