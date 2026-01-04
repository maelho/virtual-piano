import { useRef } from 'react'
import { accessContext } from '../../domain/audio'
import type { Optional } from '../../domain/types'

export function useAudioContext(): Optional<AudioContextType> {
  const AudioCtx = useRef(accessContext())
  return AudioCtx.current
}
