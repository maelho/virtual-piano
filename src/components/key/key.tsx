import clsx from 'clsx'
import { motion } from 'motion/react'
import { memo, useMemo, type FunctionComponent } from 'react'
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

const springTransition = {
  type: 'spring' as const,
  stiffness: 300,
  damping: 30,
}

const KeyComponent: FunctionComponent<KeyProps> = (props) => {
  const { type, label, onDown, onUp, disabled, ...rest } = props

  const pressed = usePressObserver({
    watchKey: label,
    onStartPress: onDown,
    onFinishPress: onUp,
  })

  const isBlackKey = type === 'sharp' || type === 'flat'

  const baseClasses = useMemo(
    () =>
      clsx(
        'relative select-none uppercase',
        'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--focus-ring)] focus-visible:ring-offset-2',
        s.key,
        s[type],
        {
          'z-[1]': !isBlackKey,
          'z-[2]': isBlackKey,
          'cursor-wait': disabled,
        },
      ),
    [type, isBlackKey, disabled],
  )

  const textColor = useMemo(() => {
    if (isBlackKey) {
      return disabled ? 'var(--black-key-text-disabled)' : 'var(--black-key-text)'
    }
    return disabled ? 'var(--white-key-text-disabled)' : 'var(--white-key-text)'
  }, [isBlackKey, disabled])

  const animations = useMemo(() => {
    const hoverAnimation = isBlackKey
      ? {
          y: -1,
          background: 'var(--black-key-hover)',
          boxShadow: 'var(--black-key-shadow-hover)',
        }
      : {
          y: -1,
          background: 'var(--white-key-hover)',
          boxShadow: 'var(--white-key-shadow-hover)',
        }

    const pressAnimation = isBlackKey
      ? {
          y: 1,
          background: 'var(--black-key-pressed)',
          boxShadow: 'var(--black-key-shadow-pressed)',
        }
      : {
          y: 2,
          background: 'var(--white-key-pressed)',
          boxShadow: 'var(--white-key-shadow-pressed)',
        }

    return { hoverAnimation, pressAnimation }
  }, [isBlackKey])

  const animateState = useMemo(() => {
    if (disabled) {
      return {
        y: 0,
        opacity: [0.5, 0.7, 0.5],
        transition: {
          duration: 1.5,
          repeat: Number.POSITIVE_INFINITY,
          ease: 'easeInOut' as const,
        },
      }
    }
    return pressed
      ? {
          ...animations.pressAnimation,
          opacity: 1,
        }
      : {
          y: 0,
          opacity: 1,
        }
  }, [disabled, pressed, animations.pressAnimation])

  return (
    <motion.button
      animate={animateState}
      className={baseClasses}
      disabled={disabled}
      initial={{ y: -20, opacity: 0 }}
      onMouseDown={onDown}
      onMouseUp={onUp}
      style={{
        fontSize: 'var(--font-size)',
        color: textColor,
      }}
      transition={springTransition}
      type="button"
      whileHover={disabled ? undefined : animations.hoverAnimation}
      whileTap={disabled ? undefined : animations.pressAnimation}
      {...rest}
    >
      {label}
    </motion.button>
  )
}

export const Key = memo(KeyComponent)
