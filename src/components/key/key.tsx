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

  const baseClasses = 'relative uppercase select-none'
  const keyClasses = clsx(baseClasses, s.key, s[type], {
    'z-[1] -mr-px border border-black/10 bg-white text-black/40': type === 'natural' && !rest.disabled && !pressed,
    'z-[1] -mr-px cursor-wait border border-black/10 bg-white text-black/20': type === 'natural' && rest.disabled,
    'z-[1] -mr-px border border-black/10 bg-gray-200 text-black/40': type === 'natural' && pressed,
    'z-[2] bg-[#111] text-white': (type === 'sharp' || type === 'flat') && !rest.disabled && !pressed,
    'z-[2] cursor-wait bg-[#111] text-white/40': (type === 'sharp' || type === 'flat') && rest.disabled,
    'z-[2] bg-[#555] text-white': (type === 'sharp' || type === 'flat') && pressed,
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
