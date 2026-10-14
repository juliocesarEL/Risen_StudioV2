import { Check, Database, Globe, MessageCircle, Sheet } from 'lucide-react'

import '@/components/sections/hero/workbench-preview.css'
import { workbenchPreview } from '@/content/workbench'
import type { WorkbenchTabId } from '@/types/content'

import type { CSSProperties } from 'react'

type Builds = Record<string, number>

/** Momento em que uma peça entra (CSS: --at). */
function at(builds: Builds, part: string): CSSProperties {
  return { '--at': builds[part] ?? 0 } as CSSProperties
}

/** Alturas das colunas do gráfico, em % (ilustrativas). */
const CHART_HEIGHTS = [38, 55, 46, 70, 62, 84, 76, 96]

function SitePreview({ builds }: { builds: Builds }) {
  const copy = workbenchPreview.site
  return (
    <div className="wbp-frame wb-part" style={at(builds, 'frame')}>
      <div className="wbp-nav wb-part" style={at(builds, 'nav')}>
        <span className="wbp-brand">{copy.brand}</span>
        <span className="wbp-links">
          {copy.links.map((link) => (
            <span key={link}>{link}</span>
          ))}
        </span>
      </div>
      <div className="wbp-hero wb-part" style={at(builds, 'hero')}>
        <div className="wbp-hero-copy">
          <p className="wbp-headline">{copy.headline}</p>
          <p className="wbp-subline">{copy.subline}</p>
        </div>
        <span className="wbp-hero-art" />
      </div>
      <span className="wbp-cta wb-part" style={at(builds, 'cta')}>
        {copy.cta}
      </span>
      <div className="wbp-grid wb-part" style={at(builds, 'grid')}>
        {copy.tiles.map((tile) => (
          <span key={tile} className="wbp-tile">
            <span className="wbp-tile-art" />
            {tile}
          </span>
        ))}
      </div>
    </div>
  )
}

function SystemPreview({ builds }: { builds: Builds }) {
  const copy = workbenchPreview.sistema
  return (
    <div className="wbp-frame wbp-app wb-part" style={at(builds, 'frame')}>
      <div className="wbp-sidebar wb-part" style={at(builds, 'sidebar')}>
        {copy.menu.map((item, index) => (
          <span key={item} data-active={index === 1 ? '' : undefined}>
            {item}
          </span>
        ))}
      </div>
      <div className="wbp-main">
        <p className="wbp-title">{copy.title}</p>
        <div className="wbp-kpis wb-part" style={at(builds, 'kpis')}>
          {copy.kpis.map((kpi) => (
            <span key={kpi.label} className="wbp-kpi">
              <span className="wbp-kpi-label">{kpi.label}</span>
              <span className="wbp-kpi-value">{kpi.value}</span>
            </span>
          ))}
        </div>
        <div className="wbp-chart wb-part" style={at(builds, 'chart')}>
          {CHART_HEIGHTS.map((height, index) => (
            <span
              key={height}
              className="wbp-column"
              style={{ '--h': `${height}%`, '--i': index } as CSSProperties}
            />
          ))}
        </div>
        <div className="wbp-table wb-part" style={at(builds, 'table')}>
          {copy.rows.map((row) => (
            <span key={row.id} className="wbp-row">
              <span className="wbp-row-id">{row.id}</span>
              <span className="wbp-status">{row.status}</span>
            </span>
          ))}
        </div>
      </div>
    </div>
  )
}

const FLOW_NODES = [
  { part: 'source', icon: Globe },
  { part: 'crm', icon: Database },
  { part: 'sheet', icon: Sheet },
  { part: 'whatsapp', icon: MessageCircle },
] as const

function IntegrationPreview({ builds }: { builds: Builds }) {
  const { nodes, done } = workbenchPreview.integracao
  return (
    <div className="wbp-flow">
      <span className="wbp-track" aria-hidden="true">
        <span className="wbp-rail" style={at(builds, 'source')} />
        <span className="wbp-packet" />
      </span>
      {FLOW_NODES.map(({ part, icon: NodeIcon }) => (
        <span key={part} className="wbp-node wb-part" style={at(builds, part)}>
          <span className="wbp-node-icon">
            <NodeIcon aria-hidden="true" />
          </span>
          <span className="wbp-node-text">
            {nodes[part].label}
            <span className="wbp-node-detail">{nodes[part].detail}</span>
          </span>
        </span>
      ))}
      <span className="wbp-badge wb-part" style={at(builds, 'done')}>
        <Check aria-hidden="true" />
        {done}
      </span>
    </div>
  )
}

/** O artefato que se monta ao lado do código (estilos em workbench-preview.css). */
export function WorkbenchPreview({ tab, builds }: { tab: WorkbenchTabId; builds: Builds }) {
  if (tab === 'sistema') return <SystemPreview builds={builds} />
  if (tab === 'integracao') return <IntegrationPreview builds={builds} />
  return <SitePreview builds={builds} />
}
