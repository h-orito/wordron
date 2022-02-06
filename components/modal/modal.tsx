export type ButtonProps = {
  buttonName: string
  handleOnClick: (e: any) => void
}

export type Props = {
  isShow: boolean
  closeButtonName: string
  handleClose: () => void
  submitButtonName?: string
  handleSubmit?: () => void
  children: React.ReactNode
}

const Modal: React.FC<Props> = (props: Props) => {
  return (
    <div
      id='modal'
      className={`overflow-y-auto fixed inset-0 p-4 w-full h-full bg-gray-900/60 z-40 ${
        props.isShow ? '' : 'hidden'
      }`}
      onClick={props.handleClose}
    >
      <div
        className='z-50 p-8 bg-white rounded shadow-lg'
        onClick={(e) => e.stopPropagation()}
      >
        {props.children}
        <div className='flex justify-end items-center mt-4'>
          <button
            className='py-2 px-4 mr-4 text-gray-600 bg-white hover:bg-gray-100 active:bg-gray-200 rounded border border-gray-200 disabled:opacity-50'
            onClick={props.handleClose}
          >
            {props.closeButtonName}
          </button>
        </div>
      </div>
    </div>
  )
}

export default Modal
