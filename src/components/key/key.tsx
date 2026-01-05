import clsx from 'clsx'
import type { FunctionComponent } from 'react'
import type { NoteType } from '../../domain/note'
import { usePressObserver } from '../press-observer'
import s from './key.module.css'

type PressCallback = () => void

type KeyProps = {
  type: NoteType
  label: string
  disabled?: boolean
  onUp: PressCallback
  onDown: PressCallback
}

export const Key: FunctionComponent<KeyProps> = (props) => {
  const { type, label, onDown, onUp, ...rest } = props

  const pressed = usePressObserver({
    watchKey: label,
    onStartPress: onDown,
    onFinishPress: onUp,
  })

  const baseClasses =
    'relative uppercase select-none focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--focus-ring)] focus-visible:ring-offset-2 focus-visible:z-[3]'
  const keyClasses = clsx(baseClasses, s.key, s[type], {
    'z-[1] -mr-px border border-[var(--white-key-border)] bg-[var(--white-key-default)] text-[var(--white-key-text)]':
      type === 'natural' && !rest.disabled && !pressed,
    'z-[1] -mr-px cursor-wait border border-[var(--white-key-border)] bg-[var(--white-key-default)] text-[var(--white-key-text-disabled)]':
      type === 'natural' && rest.disabled,
    'z-[1] -mr-px border border-[var(--white-key-border)] bg-[var(--white-key-pressed)] text-[var(--white-key-text)]':
      type === 'natural' && pressed,
    'z-[2] bg-[var(--black-key-default)] text-[var(--black-key-text)]':
      (type === 'sharp' || type === 'flat') && !rest.disabled && !pressed,
    'z-[2] cursor-wait bg-[var(--black-key-default)] text-[var(--black-key-text-disabled)]':
      (type === 'sharp' || type === 'flat') && rest.disabled,
    'z-[2] bg-[var(--black-key-pressed)] text-[var(--black-key-text)]':
      (type === 'sharp' || type === 'flat') && pressed,
  })

  return (
    <button
      className={keyClasses}
      onMouseDown={onDown}
      onMouseUp={onUp}
      style={{
        fontSize: 'var(--font-size)',
        borderRadius: '0 0 var(--radius) var(--radius)',
      }}
      type="button"
      {...rest}
    >
      {label}
    </button>
  )
}
