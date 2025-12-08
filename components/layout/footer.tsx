import type { NextPage } from 'next'
import { useState } from 'react'
import { PrimaryButton } from '../button/button'
import Modal from '../modal/modal'

const Footer: NextPage = () => {
  const [isKampaModalShow, setKampaModalShow] = useState(false)
  const openKampaModal = (e: any) => {
    e.preventDefault()
    setKampaModalShow(true)
  }
  const closeKampaModal = () => setKampaModalShow(false)

  return (
    <footer className='p-5 text-sm text-center border-t border-t-slate-400'>
      <ul>
        <li>
          © 2022-{' '}
          <a
            href='https://twitter.com/ort_dev'
            target='_blank'
            rel='noreferrer'
          >
            ort
          </a>
        </li>
        <li>
          このサイトは、
          <a
            href='https://www.powerlanguage.co.uk/wordle/'
            target='_blank'
            rel='noreferrer'
          >
            Wordle
          </a>
          にインスパイアされて製作しました。
        </li>
        <li>
          投げ銭いただける方は
          <a href='#' onClick={(e) => openKampaModal(e)}>
            こちら
          </a>
          からお願いします。
        </li>
      </ul>
      <Modal
        closeButtonName='Close'
        handleClose={closeKampaModal}
        isShow={isKampaModalShow}
      >
        <p className='text-xl'>投げ銭について</p>
        <div className='mt-5'>
          <p className='mb-2 text-lg'>Amazonギフトカード（Eメール）を送る</p>
          <ul className='leading-relaxed text-slate-600'>
            <li>
              受取人に「wolfortあっとgooglegroups.com」を指定してください（あっとのところは@に変えてください）。
            </li>
            <li>金額は15円以上で自由に変更できます。 </li>
          </ul>
          <PrimaryButton
            className='my-2'
            onClick={() =>
              window.open('https://www.amazon.co.jp/dp/B004N3APGO')
            }
          >
            Amazonギフトカードで投げ銭する
          </PrimaryButton>
          <p className='mt-5 mb-2 text-lg'>Amazonほしい物リストから送る</p>
          <ul className='text-slate-600'>
            <li>
              Amazonほしいものリストから選んで開発者に送ることができます。
            </li>
          </ul>
          <PrimaryButton
            className='my-2'
            onClick={() =>
              window.open(
                'https://www.amazon.jp/hz/wishlist/ls/1KZSJAJS1ETW4?ref_=wl_share'
              )
            }
          >
            Amazonほしいものリストを開く
          </PrimaryButton>
          <p className='mt-5 mb-2 text-lg'>
            Amazonアソシエイト経由で買い物をする
          </p>
          <ul className='text-slate-600'>
            <li>
              下記からAmazonに遷移してカートに追加＆購入すると、開発者に若干の紹介料が入ります。
            </li>
          </ul>
          <PrimaryButton
            className='my-2'
            onClick={() =>
              window.open(
                'https://www.amazon.co.jp/b?_encoding=UTF8&tag=wolfort0d-22&linkCode=ur2&linkId=faf82136a01cf462858661dc52891566&camp=247&creative=1211&node=71314051'
              )
            }
          >
            Amazonを開く
          </PrimaryButton>
        </div>
      </Modal>
    </footer>
  )
}

export default Footer
