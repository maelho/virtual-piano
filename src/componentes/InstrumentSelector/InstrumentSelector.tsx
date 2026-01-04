import type { ChangeEvent } from 'react'
import type { InstrumentName } from 'soundfont-player'
import { useInstrument } from '../../state/Instrument'
import s from './InstrumentSelector.module.css'
import { options } from './options'

export const InstrumentSelector = () => {
  const { instrument, setInstrument } = useInstrument()
  const updateValue = ({ target }: ChangeEvent<HTMLSelectElement>) => setInstrument(target.value as InstrumentName)

  return (
    <select className={s.instruments} onChange={updateValue} value={instrument}>
      {options.map(({ label, value }) => (
        <option key={value} value={value}>
          {label}
        </option>
      ))}
    </select>
  )
}
