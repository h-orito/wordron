import { NextPage } from 'next'
import styles from './button.module.css'

export type Props = {
  className?: string
  onClick: () => void
  disabled?: boolean
  children: React.ReactNode
}

const BaseButton: React.FC<Props> = (props: Props, type: string) => {
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

export const Button: NextPage<Props> = (props: Props) => BaseButton(props, '')

export const PrimaryButton: NextPage<Props> = (props: Props) =>
  BaseButton(props, 'primary')

export const WarnButton: NextPage<Props> = (props: Props) =>
  BaseButton(props, 'warn')

export const DangerButton: NextPage<Props> = (props: Props) =>
  BaseButton(props, 'danger')
