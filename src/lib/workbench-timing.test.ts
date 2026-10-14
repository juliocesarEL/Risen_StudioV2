import { describe, expect, it } from 'vitest'

import { workbenchTabs } from '@/content/workbench'
import { scheduleTyping } from '@/lib/workbench-timing'
import type { CodeLine } from '@/types/content'

const rhythm = { startDelay: 1, perChar: 0.1, linePause: 0.5, compile: 2 }

const code: CodeLine[] = [
  { indent: 0, tokens: [['keyword', 'abc']] },
  {
    indent: 2,
    builds: 'peca',
    tokens: [
      ['plain', 'de'],
      ['punctuation', '()'],
    ],
  },
]

describe('scheduleTyping', () => {
  it('encadeia as linhas: cada uma começa depois da anterior e da pausa', () => {
    const { lines } = scheduleTyping(code, rhythm)

    expect(lines[0]).toEqual({ chars: 3, start: 1, duration: 0.3 })
    expect(lines[1]).toEqual({ chars: 4, start: 1.8, duration: 0.4 })
  })

  it('não conta o recuo como caractere digitado', () => {
    expect(scheduleTyping(code, rhythm).lines[1]?.chars).toBe(4)
  })

  it('a peça do preview surge quando a linha que a cria termina', () => {
    expect(scheduleTyping(code, rhythm).builds).toEqual({ peca: 2.2 })
  })

  it('termina com a compilação depois da última linha', () => {
    expect(scheduleTyping(code, rhythm).total).toBe(4.7)
  })

  it('toda peça citada no conteúdo da bancada recebe um momento de entrada', () => {
    for (const tab of workbenchTabs) {
      const parts = tab.code.flatMap((line) => (line.builds ? [line.builds] : []))
      expect(Object.keys(scheduleTyping(tab.code).builds)).toEqual(parts)
    }
  })
})
