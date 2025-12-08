import styles from './button.module.css'

export type Props = {
  className?: string
  onClick: () => void
  disabled?: boolean
  children: React.ReactNode
}

type ButtonType = '' | 'primary' | 'warn' | 'danger'

const BaseButton = ({
  type,
  ...props
}: Props & { type: ButtonType }): React.ReactElement => {
  const typeClassName =
    type === 'primary'
      ? `${styles.primary}`
      : type === 'warn'
        ? `${styles.warn}`
        : type === 'danger'
          ? `${styles.danger}`
          : `${styles.normal}`

  return (
    <button
      className={`${styles.button} ${typeClassName} ${props.className}`}
      disabled={props.disabled ?? false}
      onClick={props.onClick}
    >
      {props.children}
    </button>
  )
}

export const Button = (props: Props): React.ReactElement => (
  <BaseButton type="" {...props} />
)

export const PrimaryButton = (props: Props): React.ReactElement => (
  <BaseButton type="primary" {...props} />
)

export const WarnButton = (props: Props): React.ReactElement => (
  <BaseButton type="warn" {...props} />
)

export const DangerButton = (props: Props): React.ReactElement => (
  <BaseButton type="danger" {...props} />
)
