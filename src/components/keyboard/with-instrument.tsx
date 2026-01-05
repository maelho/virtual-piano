import { SoundfontProvider } from '../../adapters/Soundfont'
import { useInstrument } from '../../state/Instrument'
import { useAudioContext } from '../audio-context-provider'
import { Keyboard } from './keyboard'

export const KeyboardWithInstrument = () => {
  const AudioContext = useAudioContext()!
  const { instrument } = useInstrument()

  return (
    <SoundfontProvider
      AudioContext={AudioContext}
      instrument={instrument}
      render={(props) => <Keyboard {...props} />}
    />
  )
}
