import type { InstrumentName } from 'soundfont-player'
import instruments from 'soundfont-player/names/musyngkite.json'

type Option = {
  value: InstrumentName
  label: string
}

type OptionList = Option[]
type InstrumentLists = InstrumentName[]

function normalizeList(list: InstrumentLists): OptionList {
  return list.map((instrument) => ({
    value: instrument,
    label: instrument.replace(/_/gi, ' '),
  }))
}

export const options = normalizeList(instruments as InstrumentLists)
