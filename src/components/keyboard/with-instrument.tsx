import { SoundfontProvider } from '../../adapters/soundfont/index'
import { useInstrument } from '../../state/instrument'
import { useAudioContext } from '../audio-context-provider'
import { Keyboard, type KeyboardProps } from './keyboard'

export const KeyboardWithInstrument = () => {
  const AudioContext = useAudioContext() as AudioContextType
  const { instrument } = useInstrument()

  return (
    <SoundfontProvider
      AudioContext={AudioContext}
      instrument={instrument}
      render={(props: KeyboardProps) => <Keyboard {...props} />}
    />
  )
}
