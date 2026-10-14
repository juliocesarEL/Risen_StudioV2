import type { LineSchedule } from '@/lib/workbench-timing'
import type { CodeLine } from '@/types/content'

import type { CSSProperties } from 'react'

interface WorkbenchCodeProps {
  code: CodeLine[]
  lines: LineSchedule[]
}

/**
 * O código sendo digitado, linha a linha (decorativo: a aba e o resumo em
 * texto já descrevem a demonstração para leitores de tela). Estilos em
 * workbench.css; a cor de cada trecho vem de data-syntax.
 */
export function WorkbenchCode({ code, lines }: WorkbenchCodeProps) {
  return (
    <div className="wb-code" aria-hidden="true">
      {code.map((line, index) => {
        const timing = lines[index]
        const style = {
          '--chars': timing?.chars ?? 0,
          '--start': timing?.start ?? 0,
          '--indent': line.indent,
        } as CSSProperties

        return (
          <div key={index} className="wb-line" style={style}>
            <span className="wb-line-number">{index + 1}</span>
            <span className="wb-indent" />
            <span className="wb-typed">
              {line.tokens.map(([role, text], tokenIndex) => (
                <span key={tokenIndex} data-syntax={role}>
                  {text}
                </span>
              ))}
            </span>
            <span className="wb-caret" />
          </div>
        )
      })}
    </div>
  )
}
