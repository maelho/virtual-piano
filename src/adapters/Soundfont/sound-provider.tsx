import { type FunctionComponent, type ReactElement, useCallback, useEffect, useRef, useState } from 'react'
import Soundfont, { type InstrumentName, type Player } from 'soundfont-player'
import type { MidiValue } from '../../domain/note'
import { type AudioNodesRegistry, DEFAULT_INSTRUMENT } from '../../domain/sound'
import type { Optional } from '../../domain/types'

type ProvidedProps = {
  loading: boolean
  play(note: MidiValue): Promise<void>
  stop(note: MidiValue): Promise<void>
}

type ProviderProps = {
  instrument?: InstrumentName
  AudioContext: AudioContextType
  render(props: ProvidedProps): ReactElement
}

export const SoundfontProvider: FunctionComponent<ProviderProps> = ({ AudioContext, instrument, render }) => {
  const activeNodes = useRef<AudioNodesRegistry>({})
  const [current, setCurrent] = useState<Optional<InstrumentName>>(null)
  const [loading, setLoading] = useState<boolean>(false)
  const [player, setPlayer] = useState<Optional<Player>>(null)
  const audio = useRef(new AudioContext())

  const load = useCallback(async (instrumentName: InstrumentName = DEFAULT_INSTRUMENT) => {
    setLoading(true)
    const loadedPlayer = await Soundfont.instrument(audio.current, instrumentName)

    setLoading(false)
    setCurrent(instrumentName)
    setPlayer(loadedPlayer)
  }, [])

  const loadInstrument = useCallback(() => load(instrument), [instrument, load])

  useEffect(() => {
    if (!loading && instrument !== current) loadInstrument()
  }, [loadInstrument, loading, instrument, current])

  const resume = useCallback(async () => {
    return audio.current.state === 'suspended' ? await audio.current.resume() : Promise.resolve()
  }, [])

  const play = useCallback(
    async (note: MidiValue) => {
      await resume()
      if (!player) return

      const node = player.play(note.toString())
      activeNodes.current = { ...activeNodes.current, [note]: node }
    },
    [player, resume],
  )

  const stop = useCallback(
    async (note: MidiValue) => {
      await resume()
      if (!activeNodes.current[note]) return

      activeNodes.current[note]?.stop()
      activeNodes.current = { ...activeNodes.current, [note]: null }
    },
    [resume],
  )

  return render({
    loading,
    play,
    stop,
  })
}
