import type { GetServerSideProps, InferGetServerSidePropsType } from 'next'
import { useState } from 'react'
import Head from 'next/head'
import Modal from '../components/modal/modal'
import { SystemConst } from '../components/const'
import InputText from '../components/form/input-text'
import { PrimaryButton } from '../components/button/button'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faBackspace } from '@fortawesome/free-solid-svg-icons'
import styles from './game.module.css'

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
  // TODO tweet
  // TODO 正解の文字が被っているパターン
  // TODO 結果モーダル

  const game: Game = data.game
  const maxAnswerCount: number = game.maxAnswerCount
  const answerLength: number = game.dictionaries[0].length

  // How to Playモーダル
  const [isHowtoModalOpen, setHowtoModalOpen] = useState(false)
  const openHowtoModal = () => setHowtoModalOpen(true)
  const closeHowtoModal = () => setHowtoModalOpen(false)
  // 結果モーダル
  const [isResultModalOpen, setResultModalOpen] = useState(false)
  const closeResultModal = () => setResultModalOpen(false)
  // 回答入力欄
  const [currentAnswer, setCurrentAnswer] = useState('')
  const addCharToCurrentAnswer = (char: string) => {
    if (!availableAnswer) return
    setCurrentAnswer(currentAnswer + char)
  }
  const removeCurrentAnswer = () => {
    if (!availableAnswer) return
    setCurrentAnswer(currentAnswer.slice(0, -1))
  }
  const [currentAnswerError, setCurrentAnswerError] = useState('')
  const [availableAnswer, setAvailableAnswer] = useState(true)
  // 回答履歴
  const [answers, setAnswers] = useState([] as Answer[])
  // 五十音表
  const [kanas, setKanas] = useState(initialKanas)

  // 回答する
  const doAnswer = () => {
    const correctAnswer = game.word!
    // validate
    const errorMsg = validateCurrentAnswer(currentAnswer, answerLength)
    setCurrentAnswerError(errorMsg)
    if (errorMsg.length > 0) return

    // 回答履歴
    const newAnswers = addAnswer(currentAnswer, correctAnswer, answers)
    setAnswers(newAnswers)
    // 五十音表
    setKanas(updateKanas(newAnswers))
    // 回答をリセット
    if (answers.length >= maxAnswerCount || currentAnswer === correctAnswer) {
      setAvailableAnswer(false)
      // TODO result modal
    }
    setCurrentAnswer('')
  }

  return (
    <div>
      <Head>
        <title>{`${SystemConst.APPLICATION_NAME} | ${data.game.name}`}</title>
      </Head>

      <div className='text-sm'>
        <p className='mb-2 text-xl'>テーマ: {game.name}</p>
        <p className='text-gray-400'>
          解答パターン: {game.dictionaries.length}通り
        </p>
        <p className='text-gray-400'>回答回数: {maxAnswerCount}回まで</p>
        <p className='text-gray-400'>{game.description}</p>
        <a
          href='#'
          className=''
          onClick={(e) => {
            e.preventDefault
            openHowtoModal()
          }}
        >
          遊び方
        </a>
        <div className='my-5'>
          <AnswerHistories
            answers={answers}
            maxAnswerCount={maxAnswerCount}
            answerLength={answerLength}
          />
        </div>

        <div className='mt-10 mb-5'>
          <div className='flex justify-center'>
            <InputText
              className={`ml-4 flex-1 sm:flex-none sm:w-80  ${
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
              回答する
            </PrimaryButton>
          </div>
          {currentAnswerError.length > 0 && (
            <p className='mt-1 ml-1 text-red-500'>{currentAnswerError}</p>
          )}
        </div>

        <div className='my-5'>
          <Kanas
            addCharToCurrentAnswer={addCharToCurrentAnswer}
            removeCurrentAnswer={removeCurrentAnswer}
            kanas={kanas}
            availableAnswer={availableAnswer}
          />
        </div>
      </div>

      <HowToModal
        isHowtoModalOpen={isHowtoModalOpen}
        closeHowtoModal={closeHowtoModal}
      />

      <Modal
        closeButtonName='Close'
        handleClose={closeResultModal}
        isShow={isResultModalOpen}
      >
        <p className='text-xl'>Result</p>
        <div className='mt-5'>
          <p>TBD</p>
        </div>
      </Modal>
    </div>
  )
}

export default GamePage

type AnswerHistoriesProp = {
  answers: Answer[]
  maxAnswerCount: number
  answerLength: number
}

const AnswerHistories = (prop: AnswerHistoriesProp) => {
  const { answers, maxAnswerCount, answerLength } = prop
  return (
    <div className='flex flex-col gap-2'>
      {answers.map((answer, colIdx) => (
        <div key={colIdx} className='flex gap-2 justify-center'>
          {answer.strs.map((answerString, rowIdx) => {
            return (
              <div
                key={rowIdx}
                className={`w-12 h-12 text-4xl text-center text-white rounded border-4 ${answerString.color}`}
              >
                {answerString.str}
              </div>
            )
          })}
        </div>
      ))}
      {[...Array(maxAnswerCount - answers.length)].map((_, colIdx) => (
        <div key={colIdx} className='flex gap-2 justify-center'>
          {[...Array(answerLength)].map((_, rowIdx) => (
            <div
              key={rowIdx}
              className='w-12 h-12 text-4xl text-center text-white rounded border-4 border-gray-300'
            ></div>
          ))}
        </div>
      ))}
    </div>
  )
}

type KanasProp = {
  addCharToCurrentAnswer: (s: string) => void
  removeCurrentAnswer: () => void
  kanas: Kana[][]
  availableAnswer: boolean
}
const Kanas = (prop: KanasProp) => {
  const {
    addCharToCurrentAnswer,
    removeCurrentAnswer,
    kanas,
    availableAnswer
  } = prop
  return (
    <div className='flex flex-col gap-1'>
      <div className='flex gap-1 justify-center'>
        {[...Array(8)].map((_, i) => (
          <div key={i} className='w-10 h-10'></div>
        ))}
        <div
          className='h-10 text-center text-gray-600 bg-gray-200 rounded border-4 border-gray-200 cursor-pointer sm:text-2xl'
          style={{ width: '5.25rem' }}
          onClick={removeCurrentAnswer}
        >
          <FontAwesomeIcon icon={faBackspace} className='mt-0.5' />
        </div>
      </div>
      {kanas.map((col, colIdx) => (
        <div key={colIdx} className='flex gap-1 justify-center'>
          {col.map((kana, rowIdx) => {
            return (
              <div
                key={rowIdx}
                className={`w-10 h-10 ${
                  kana.kana != null
                    ? 'sm:text-2xl text-center rounded border-4 border-gray-200 bg-gray-200'
                    : ''
                } ${kana.color != null ? kana.color : 'text-gray-600 '}
                       ${availableAnswer ? 'cursor-pointer' : ''}`}
                onClick={() => addCharToCurrentAnswer(kana.kana || '')}
              >
                {kana.kana}
              </div>
            )
          })}
        </div>
      ))}
    </div>
  )
}

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

const addAnswer = (
  currentAnswer: string,
  correctAnswer: string,
  answers: Answer[]
): Answer[] => {
  const currentAnswerChars = currentAnswer.split('')
  const correctAnswerChars = correctAnswer.split('')
  const newAnswer = {
    strs: currentAnswerChars.map((char: string, index: number) => {
      return {
        str: char,
        color:
          correctAnswerChars[index] === char
            ? styles.green
            : correctAnswerChars.some((a: string) => a === char)
            ? styles.yellow
            : styles.gray
      }
    })
  } as Answer
  const newAnswers = answers.slice()
  newAnswers.push(newAnswer)
  return newAnswers
}

const updateKanas = (answers: Answer[]): Kana[][] => {
  return initialKanas.map((kanaArray) => {
    return kanaArray.map((kana) => {
      const strs: AnswerString[] = answers.flatMap((answer) =>
        answer.strs.filter((s) => s.str === kana.kana)
      )
      const color = strs.some((s) => s.color === styles.green)
        ? styles.green
        : strs.some((s) => s.color === styles.yellow)
        ? styles.yellow
        : strs.some((s) => s.color === styles.gray)
        ? styles.gray
        : null
      return {
        kana: kana.kana,
        color: color
      } as Kana
    })
  })
}

type HowToModalProp = {
  isHowtoModalOpen: boolean
  closeHowtoModal: () => void
}
const HowToModal = (prop: HowToModalProp) => {
  const { isHowtoModalOpen, closeHowtoModal } = prop
  return (
    <Modal
      closeButtonName='Close'
      handleClose={closeHowtoModal}
      isShow={isHowtoModalOpen}
    >
      <p className='text-xl'>あそびかた</p>
      <div className='mt-5 text-gray-600'>
        <p>
          お題の答えを当てるクイズゲームです。
          <br />
          回答欄から回答すると、正解の文字列と近い部分の色が表示されます。
        </p>
        <div className='my-5'>
          <div className='flex gap-2 justify-center'>
            <div
              className={`w-12 h-12 text-4xl text-center text-white rounded border-4 ${styles.yellow}`}
            >
              て
            </div>
            <div
              className={`w-12 h-12 text-4xl text-center text-white rounded border-4 ${styles.gray}`}
            >
              ぃ
            </div>
            <div
              className={`w-12 h-12 text-4xl text-center text-white rounded border-4 ${styles.gray}`}
            >
              っ
            </div>
            <div
              className={`w-12 h-12 text-4xl text-center text-white rounded border-4 ${styles.green}`}
            >
              し
            </div>
            <div
              className={`w-12 h-12 text-4xl text-center text-white rounded border-4 ${styles.gray}`}
            >
              ゅ
            </div>
          </div>
        </div>
        <p className='mb-5'>
          たとえば「てぃっしゅ」と回答してこのように表示された場合、
        </p>
        <div className='flex justify-center mb-5'>
          <ul className='leading-relaxed list-disc text-left'>
            <li>「し」は正解の文字列に含まれていて、位置も合っています。</li>
            <li>
              「て」は正解の文字列に含まれていますが、位置が合っていません。
            </li>
            <li>「ぃ」「っ」「ゅ」は正解の文字列に含まれていません。</li>
          </ul>
        </div>
        <p>
          正解の文字列に含まれる文字をヒントにしながら、規定回数以内で答えを見つけ出しましょう。
        </p>
      </div>
    </Modal>
  )
}
