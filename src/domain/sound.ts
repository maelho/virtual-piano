import type { InstrumentName, Player } from 'soundfont-player'
import type { MidiValue } from './note'
import type { Optional } from './types'
export const DEFAULT_INSTRUMENT: InstrumentName = 'acoustic_grand_piano'

export type AudioNodesRegistry = Record<MidiValue, Optional<Player>>
