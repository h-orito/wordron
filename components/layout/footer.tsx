import { useState } from 'react'
import type { NextPage } from 'next'
import Modal from '../modal/modal'
import { PrimaryButton } from '../button/button'

const Footer: NextPage = () => {
  const [isKampaModalShow, setKampaModalShow] = useState(false)
  const openKampaModal = () => setKampaModalShow(true)
  const closeKampaModal = () => setKampaModalShow(false)

  return (
    <footer className='p-5 text-sm border-t border-t-slate-400'>
      <ul>
        <li>
          要望、改善提案、不具合報告はTwitter
          <a
            href='https://twitter.com/ort_dev'
            target='_blank'
            rel='noreferrer'
          >
            @ort_dev
          </a>
          までお願いします。
        </li>
        <li>
          投げ銭いただける方は
          <a href='javascript:void(0);' onClick={openKampaModal}>
            こちら
          </a>
          からお願いします。
        </li>
        <li>
          © 2022- ort（
          <a
            href='https://github.com/h-orito/wordron'
            target='_blank'
            rel='noreferrer'
          >
            Github
          </a>
          ）
        </li>
      </ul>
      <Modal
        closeButtonName='Close'
        handleClose={closeKampaModal}
        isShow={isKampaModalShow}
      >
        <p className='text-xl'>投げ銭について</p>
        <div className='mt-5'>
          <p className='mb-2 text-lg'>匿名でAmazonギフトカードを送る</p>
          <ul className='text-slate-600'>
            <li>
              Amazonギフトカードによる投げ銭（15円〜、手数料なし）になります。
            </li>
            <li>
              Kampa!というサービスを利用することで、個人情報をやりとりすることなくAmazonギフトカードで投げ銭することができます。
            </li>
            <li>
              投げ銭していただける方は下記手順にてお願いします。
              <ol className='mt-2 ml-10 list-decimal'>
                <li>
                  最下段の「Amazonギフトカードで投げ銭」よりKampa!サイトへ遷移
                </li>
                <li>
                  表示されたページのメールアドレスをコピーし、Kampa!ボタンをクリック
                </li>
                <li>
                  「金額」に投げ銭していただける金額を入力、「受取人」にコピーしたメールアドレスを貼り付けし、購入
                  （応援メッセージをいただけると喜びます）
                </li>
              </ol>
            </li>
          </ul>
          <PrimaryButton
            className='my-2'
            onClick={() => window.open('http://kampa.me/t/lxc')}
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
