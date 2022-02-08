export type Props = {
  id?: string
  className?: string
  name?: string
  value?: number
  step?: number
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void
  onKeyPress?: React.KeyboardEventHandler<HTMLInputElement>
  disabled?: boolean
}

const InputNumber: React.FC<Props> = (props: Props) => {
  return (
    <input
      id={props.id}
      type='number'
      step={props.step}
      name={props.name}
      className={`block py-2 px-4 rounded border border-gray-200 disabled:opacity-50 ${props.className}`}
      value={props.value}
      onChange={props.onChange}
      onKeyPress={props.onKeyPress}
      disabled={props.disabled}
    />
  )
}

export default InputNumber
