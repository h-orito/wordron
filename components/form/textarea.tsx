export type Props = {
  id?: string
  className?: string
  name?: string
  value?: string
  onChange?: React.ChangeEventHandler<HTMLTextAreaElement>
  onKeyDown?: React.KeyboardEventHandler<HTMLTextAreaElement>
  disabled?: boolean
}

const Textarea: React.FC<Props> = (props: Props) => {
  return (
    <textarea
      id={props.id}
      name={props.name}
      className={`block py-2 px-4 rounded border border-gray-200 disabled:opacity-50 ${props.className}`}
      value={props.value}
      onChange={props.onChange}
      onKeyDown={props.onKeyDown}
      disabled={props.disabled}
    />
  )
}

export default Textarea
