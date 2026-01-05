import { useEffect, useState } from 'react'
import type { Key as KeyLabel } from '../../domain/keyboard'

type IsPress = boolean
type EventCode = string
type CallbackFunction = () => void

type Settings = {
  watchKey: KeyLabel
  onStartPress: CallbackFunction
  onFinishPress: CallbackFunction
}

function fromEventCode(code: EventCode): KeyLabel {
  const prefixRegex = /Key|Digit/gi
  return code.replace(prefixRegex, '')
}

function equal(watchedKey: KeyLabel, eventCode: EventCode): boolean {
  return fromEventCode(eventCode).toUpperCase() === watchedKey.toUpperCase()
}

export function usePressObserver({ watchKey, onStartPress, onFinishPress }: Settings): IsPress {
  const [pressed, setPressed] = useState<IsPress>(false)

  useEffect(() => {
    function handlePressStart({ code }: KeyboardEvent): void {
      if (pressed || !equal(watchKey, code)) return
      setPressed(true)
      onStartPress()
    }

    function handlePressFinish({ code }: KeyboardEvent): void {
      if (!pressed || !equal(watchKey, code)) return
      setPressed(false)
      onFinishPress()
    }

    document.addEventListener('keydown', handlePressStart, { passive: true })
    document.addEventListener('keyup', handlePressFinish, { passive: true })

    return () => {
      document.removeEventListener('keydown', handlePressStart)
      document.removeEventListener('keyup', handlePressFinish)
    }
  }, [watchKey, pressed, onStartPress, onFinishPress])

  return pressed
}
