export type Props = {
  id?: string
  className?: string
  name?: string
  value?: string
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void
  onKeyPress?: React.KeyboardEventHandler<HTMLInputElement>
  disabled?: boolean
}

const InputText: React.FC<Props> = (props: Props) => {
  return (
    <input
      id={props.id}
      type='text'
      name={props.name}
      className={`block py-2 px-4 rounded border border-gray-200 disabled:opacity-50 ${props.className}`}
      value={props.value}
      onChange={props.onChange}
      onKeyPress={props.onKeyPress}
      disabled={props.disabled}
    />
  )
}

export default InputText
