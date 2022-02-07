export type Props = {
  className?: string
  children: React.ReactNode
}

const Label: React.FC<Props> = (props: Props) => {
  return <label className='block mb-2 font-bold'>{props.children}</label>
}

export default Label
