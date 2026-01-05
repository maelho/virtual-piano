import { InstrumentContextProvider } from '../../state/instrument'
import { InstrumentSelector } from '../instrument-selector'
import { KeyboardWithInstrument } from '../keyboard'
import { ThemeToggle } from '../theme-toggle'

export const Playground = () => {
  return (
    <InstrumentContextProvider>
      <div className="playground">
        <KeyboardWithInstrument />
        <div className="flex flex-wrap items-center justify-center gap-4">
          <InstrumentSelector />
          <ThemeToggle />
        </div>
      </div>
    </InstrumentContextProvider>
  )
}
