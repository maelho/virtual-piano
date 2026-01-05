import type { ChangeEvent } from 'react'
import type { InstrumentName } from 'soundfont-player'
import { useInstrument } from '../../state/Instrument'
import { options } from './options'

export const InstrumentSelector = () => {
  const { instrument, setInstrument } = useInstrument()
  const updateValue = ({ target }: ChangeEvent<HTMLSelectElement>) => setInstrument(target.value as InstrumentName)

  return (
    <select
      className="mx-auto mt-6 block rounded border border-gray-300 bg-white bg-clip-padding text-gray-700 text-xl capitalize leading-6"
      onChange={updateValue}
      value={instrument}
    >
      {options.map(({ label, value }) => (
        <option key={value} value={value}>
          {label}
        </option>
      ))}
    </select>
  )
}
