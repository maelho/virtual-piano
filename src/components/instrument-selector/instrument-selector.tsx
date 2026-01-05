import type { ChangeEvent } from 'react'
import type { InstrumentName } from 'soundfont-player'
import { useInstrument } from '../../state/instrument'
import { options } from './options'

export const InstrumentSelector = () => {
  const { instrument, setInstrument } = useInstrument()
  const updateValue = ({ target }: ChangeEvent<HTMLSelectElement>) => setInstrument(target.value as InstrumentName)

  return (
    <select
      className="mx-auto mt-6 block rounded border border-[var(--control-border)] bg-[var(--control-bg)] px-4 py-2 text-[var(--control-text)] text-xl capitalize leading-6 hover:bg-[var(--control-hover)] focus:outline-none focus:ring-2 focus:ring-[var(--focus-ring)]"
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
