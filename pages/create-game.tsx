import type { GetServerSideProps, InferGetServerSidePropsType } from 'next'
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
    setNameError('')
    if (gameName.length < 3 || 20 < gameName.length) {
      setNameError('わーどる名は3文字以上20文字以内で入力してください。')
    }

    setDescriptionError('')
    if (100 < description.length) {
      setDescriptionError('説明は100文字以内で入力してください。')
    }

    setCreatorError('')
    if (creator.length < 1 || 20 < creator.length) {
      setCreatorError('作成者名は1文字以上20文字以内で入力してください。')
    }

    setDictionariesError('')
    const dictionariesArr = dictionaries.split('\n')
    if (dictionariesArr.length < 2) {
      setDictionariesError('解答候補は2つ以上入力してください。')
    } else if (
      dictionariesArr.some((word) =>
        word
          .split('')
          .some((char) => !SystemConst.HIRAGANAS.some((h) => h === char))
      )
    ) {
      setDictionariesError('解答候補は全てひらがなで入力してください。')
    } else if (
      !dictionariesArr.some((d) => d.length === dictionariesArr[0].length)
    ) {
      setDictionariesError('解答候補は文字数を揃えてください。')
    }

    setMaxAnswerCountError('')
    if (maxAnswerCount < 1 || 20 < maxAnswerCount) {
      setMaxAnswerCountError(
        '最大回答回数は1回以上20回以内で設定してください。'
      )
    }

    if (
      nameError.length === 0 &&
      descriptionError.length === 0 &&
      creatorError.length === 0 &&
      dictionariesError.length === 0 &&
      maxAnswerCountError.length === 0
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
          <Label>わーどる名</Label>
          <InputText
            className='w-80'
            value={gameName}
            onChange={(e) => setGameName(e.target.value)}
          />
          {nameError.length > 0 && <p className='text-red-500'>{nameError}</p>}
        </div>
        <div className='mb-5'>
          <Label>説明</Label>
          <InputText
            className='w-80'
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
            className='w-80'
            value={creator}
            onChange={(e) => setCreator(e.target.value)}
          />
          {creatorError.length > 0 && (
            <p className='text-red-500'>{creatorError}</p>
          )}
        </div>
        <div className='mb-5'>
          <Label>解答候補（ひらがな）</Label>
          <Textarea
            className='w-80 h-96'
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
            className='w-20'
            value={maxAnswerCount}
            onChange={(e) => setMaxAnswerCount(parseInt(e.target.value))}
          />
          {maxAnswerCountError.length > 0 && (
            <p className='text-red-500'>{maxAnswerCountError}</p>
          )}
        </div>
        <div>
          <PrimaryButton onClick={save}>作成する</PrimaryButton>
        </div>
      </div>
    </div>
  )
}

export default NewGamePage
