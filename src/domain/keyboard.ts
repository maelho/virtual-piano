import type { OctaveIndex, PitchIndex } from './note'

export type Key = string
export type Keys = Key[]
export const LOWER_OCTAVE: Keys = ['q', '2', 'w', '3', 'e', 'r', '5', 't', '6', 'y', '7', 'u']
export const UPPER_OCTAVE: Keys = ['i', '9', 'o', '0', 'p', 'z', 's', 'x', 'd', 'c', 'f', 'v']

export const CHANGE_ROW_AT: OctaveIndex = 5

export function selectKey(octave: OctaveIndex, index: PitchIndex): Key {
  const keysRow = octave < CHANGE_ROW_AT ? LOWER_OCTAVE : UPPER_OCTAVE
  return keysRow[index]
}
