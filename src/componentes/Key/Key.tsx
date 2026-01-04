import clsx from 'clsx'
import type { FunctionComponent } from 'react'
import type { NoteType } from '../../domain/note'
import { usePressObserver } from '../PressObserver'
import s from './Key.module.css'

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

  return (
    <button
      className={clsx(s.key, s[type], pressed && s['is-pressed'])}
      onMouseDown={onDown}
      onMouseUp={onUp}
      type="button"
      {...rest}
    >
      {label}
    </button>
  )
}
