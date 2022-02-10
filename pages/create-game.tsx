import { useState } from 'react'
import Head from 'next/head'
import { SystemConst } from '../components/const'
import InputText from '../components/form/input-text'
import Label from '../components/form/label'
import Textarea from '../components/form/textarea'
import { PrimaryButton } from '../components/button/button'
import Router from 'next/router'
import InputNumber from '../components/form/input-number'

type Data = {
  game: Game | null
}

const NewGamePage = () => {
  const [gameName, setGameName] = useState('')
  const [description, setDescription] = useState('')
  const [creator, setCreator] = useState('')
  const [dictionaries, setDictionaries] = useState('')
  const [maxAnswerCount, setMaxAnswerCount] = useState(10)

  const [nameError, setNameError] = useState('')
  const [descriptionError, setDescriptionError] = useState('')
  const [creatorError, setCreatorError] = useState('')
  const [dictionariesError, setDictionariesError] = useState('')
  const [maxAnswerCountError, setMaxAnswerCountError] = useState('')

  const save = async () => {
    let newNameError = ''
    if (gameName.length < 3 || 20 < gameName.length) {
      newNameError = 'わーどる名は3文字以上20文字以内で入力してください。'
    }
    setNameError(newNameError)

    let newDescriptionError = ''
    if (100 < description.length) {
      newDescriptionError = '説明は100文字以内で入力してください。'
    }
    setDescriptionError(newDescriptionError)

    let newCreatorError = ''
    if (creator.length < 1 || 20 < creator.length) {
      newCreatorError = '作成者名は1文字以上20文字以内で入力してください。'
    }
    setCreatorError(newCreatorError)

    let newDictionariesError = ''
    const dictionariesArr = dictionaries.split('\n')
    if (dictionariesArr.length < 2) {
      newDictionariesError = '解答候補は2つ以上入力してください。'
    } else if (
      dictionariesArr.some((word) =>
        word
          .split('')
          .some((char) => !SystemConst.HIRAGANAS.some((h) => h === char))
      )
    ) {
      newDictionariesError = '解答候補は全てひらがなで入力してください。'
    } else if (
      dictionariesArr.some((d) => d.length !== dictionariesArr[0].length)
    ) {
      newDictionariesError = '解答候補は文字数を揃えてください。'
    } else if (
      dictionariesArr[0].length < 3 ||
      10 < dictionariesArr[0].length
    ) {
      newDictionariesError = '解答候補は3文字以上10文字以内で入力してください。'
    }
    setDictionariesError(newDictionariesError)

    let newMaxAnswerCountError = ''
    if (maxAnswerCount < 1 || 20 < maxAnswerCount) {
      newMaxAnswerCountError =
        '最大回答回数は1回以上20回以内で設定してください。'
    }
    setMaxAnswerCountError(newMaxAnswerCountError)

    if (
      newNameError.length === 0 &&
      newDescriptionError.length === 0 &&
      newCreatorError.length === 0 &&
      newDictionariesError.length === 0 &&
      newMaxAnswerCountError.length === 0
    ) {
      const game: Game = {
        key: null,
        name: gameName,
        description,
        creator,
        dictionaries: dictionariesArr,
        maxAnswerCount: maxAnswerCount,
        created: new Date().getTime()
      }
      await fetch(`/api/games`, {
        method: 'POST',
        body: JSON.stringify(game)
      })
      Router.push('/')
    }
  }

  return (
    <div>
      <Head>
        <title>{`${SystemConst.APPLICATION_NAME} | 新しいわーどるを作成する`}</title>
      </Head>

      <div className='text-sm'>
        <p className='mb-5 text-xl'>新しいわーどるを作成する</p>
        <div className='mb-5'>
          <Label>わーどる名（お題）</Label>
          <InputText
            className='mx-auto w-80'
            value={gameName}
            onChange={(e) => setGameName(e.target.value)}
          />
          {nameError.length > 0 && <p className='text-red-500'>{nameError}</p>}
        </div>
        <div className='mb-5'>
          <Label>説明</Label>
          <InputText
            className='mx-auto w-80'
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />
          {descriptionError.length > 0 && (
            <p className='text-red-500'>{descriptionError}</p>
          )}
        </div>
        <div className='mb-5'>
          <Label>作成者名</Label>
          <InputText
            className='mx-auto w-80'
            value={creator}
            onChange={(e) => setCreator(e.target.value)}
          />
          {creatorError.length > 0 && (
            <p className='text-red-500'>{creatorError}</p>
          )}
        </div>
        <div className='mb-5'>
          <Label>解答候補（ひらがな3~10文字）</Label>
          <p className='mb-2 text-sm text-gray-500'>
            この中からランダムでお題が出題されます。
          </p>
          <Textarea
            className='mx-auto w-80 h-96'
            value={dictionaries}
            onChange={(e) => setDictionaries(e.target.value)}
          />
          {dictionariesError.length > 0 && (
            <p className='text-red-500'>{dictionariesError}</p>
          )}
        </div>
        <div className='mb-5'>
          <Label>最大回答回数</Label>
          <InputNumber
            className='mx-auto w-20 text-right'
            value={maxAnswerCount}
            onChange={(e) => setMaxAnswerCount(parseInt(e.target.value))}
          />
          {maxAnswerCountError.length > 0 && (
            <p className='text-red-500'>{maxAnswerCountError}</p>
          )}
        </div>
        <div className='mt-10'>
          <PrimaryButton onClick={save} className='ml-4'>
            作成する
          </PrimaryButton>
        </div>
      </div>
    </div>
  )
}

export default NewGamePage
