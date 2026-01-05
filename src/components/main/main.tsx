import { useAudioContext } from '../audio-context-provider'
import { NoAudioMessage } from '../no-audio-message'
import { Playground } from '../playground'

export const Main = () => {
  const AudioContext = useAudioContext()
  return AudioContext ? <Playground /> : <NoAudioMessage />
}
