import { SoundfontProvider } from '../../adapters/soundfont'
import { useInstrument } from '../../state/instrument'
import { useAudioContext } from '../audio-context-provider'
import { Keyboard } from './keyboard'

export const KeyboardWithInstrument = () => {
  const AudioContext = useAudioContext() as AudioContextType
  const { instrument } = useInstrument()

  return (
    <SoundfontProvider
      AudioContext={AudioContext}
      instrument={instrument}
      render={(props) => <Keyboard {...props} />}
    />
  )
}
