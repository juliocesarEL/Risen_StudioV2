import type { CodeLine } from '@/types/content'

/** Ritmo da digitação na bancada do hero, em segundos. */
export const typingRhythm = {
  /** Espera antes da primeira tecla (deixa a página assentar). */
  startDelay: 0.6,
  /** Tempo por caractere. */
  perChar: 0.026,
  /** Pausa entre uma linha e a próxima. */
  linePause: 0.14,
  /** Intervalo entre a última linha e o "pronto" (a compilação). */
  compile: 0.5,
}

export interface LineSchedule {
  /** Quantidade de caracteres digitados (sem o recuo, que é espaçamento). */
  chars: number
  /** Início da digitação, em segundos desde o início da animação. */
  start: number
  /** Duração da digitação, em segundos. */
  duration: number
}

export interface WorkbenchSchedule {
  lines: LineSchedule[]
  /** Momento em que cada peça do preview surge (fim da linha que a cria). */
  builds: Record<string, number>
  /** Fim da compilação: o preview está completo. */
  total: number
}

const round = (seconds: number) => Math.round(seconds * 1000) / 1000

/** Calcula quando cada linha é digitada e quando cada peça do preview aparece. */
export function scheduleTyping(code: CodeLine[], rhythm = typingRhythm): WorkbenchSchedule {
  const lines: LineSchedule[] = []
  const builds: Record<string, number> = {}
  let cursor = rhythm.startDelay

  for (const line of code) {
    const chars = line.tokens.reduce((sum, [, text]) => sum + text.length, 0)
    const duration = round(chars * rhythm.perChar)
    lines.push({ chars, start: round(cursor), duration })
    cursor += duration
    if (line.builds) builds[line.builds] = round(cursor)
    cursor += rhythm.linePause
  }

  return { lines, builds, total: round(cursor + rhythm.compile) }
}
