import { InstrumentContextProvider } from '../../state/Instrument'
import { InstrumentSelector } from '../instrument-selector'
import { KeyboardWithInstrument } from '../keyboard'

export const Playground = () => {
  return (
    <InstrumentContextProvider>
      <div className="playground">
        <KeyboardWithInstrument />
        <InstrumentSelector />
      </div>
    </InstrumentContextProvider>
  )
}
