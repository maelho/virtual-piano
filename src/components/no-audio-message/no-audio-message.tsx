export function NoAudioMessage() {
  return (
    <div className="p-8 text-center">
      <p className="mb-2 text-[var(--text-primary)] text-lg">Sorry, it's not gonn work :-(</p>
      <p className="text-[var(--text-secondary)]">
        Seems like your browser doesn't support{' '}
        <code className="rounded bg-[var(--keyboard-surface)] px-2 py-1 text-[var(--text-primary)]">Audio API</code>
      </p>
    </div>
  )
}
