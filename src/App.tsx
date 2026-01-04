import s from './App.module.css'
import { Main } from './componentes/Main'

export function App() {
  return (
    <div className={s.app}>
      <main className={s.content}>
        <Main />
      </main>
    </div>
  )
}
