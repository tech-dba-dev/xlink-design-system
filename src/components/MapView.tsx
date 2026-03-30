import { useState, type ReactNode } from 'react'
import { MapPin, Navigation, ZoomIn, ZoomOut, Layers, Target } from 'lucide-react'

// ─── Types ───────────────────────────────────────────────────────────────────

export interface MapPin {
  id: string
  lat: number
  lng: number
  label?: string
  type?: 'vehicle' | 'destination' | 'origin' | 'alert' | 'default'
  status?: 'active' | 'idle' | 'offline'
}

export interface MapRoute {
  id: string
  color?: string
  label?: string
}

// ─── Pin colors ───────────────────────────────────────────────────────────────

const pinConfig: Record<string, { bg: string; icon: ReactNode }> = {
  vehicle:     { bg: 'bg-[var(--primary)]',  icon: <Navigation size={12} className="text-white" /> },
  destination: { bg: 'bg-[var(--success)]',  icon: <MapPin size={12} className="text-white" /> },
  origin:      { bg: 'bg-[var(--info)]',     icon: <Target size={12} className="text-white" /> },
  alert:       { bg: 'bg-[var(--danger)]',   icon: <MapPin size={12} className="text-white" /> },
  default:     { bg: 'bg-[var(--text-secondary)]', icon: <MapPin size={12} className="text-white" /> },
}

const statusDot: Record<string, string> = {
  active:  'bg-[var(--success)]',
  idle:    'bg-[var(--warning)]',
  offline: 'bg-[var(--text-muted)]',
}

// ─── MapPinMarker ─────────────────────────────────────────────────────────────

interface MapPinMarkerProps {
  pin: MapPin
  x: number
  y: number
  selected?: boolean
  onClick?: (pin: MapPin) => void
}

function MapPinMarker({ pin, x, y, selected, onClick }: MapPinMarkerProps) {
  const cfg = pinConfig[pin.type ?? 'default']

  return (
    <div
      className="absolute flex flex-col items-center cursor-pointer group"
      style={{ left: `${x}%`, top: `${y}%`, transform: 'translate(-50%, -100%)' }}
      onClick={() => onClick?.(pin)}
    >
      <div className={`relative w-7 h-7 ${cfg.bg} rounded-full flex items-center justify-center elevation-2 transition-transform group-hover:scale-110 ${selected ? 'scale-125 ring-2 ring-white ring-offset-1' : ''}`}>
        {cfg.icon}
        {pin.status && (
          <span className={`absolute -bottom-0.5 -right-0.5 w-2.5 h-2.5 rounded-full border-2 border-white ${statusDot[pin.status]}`} />
        )}
      </div>
      {pin.label && (
        <div className="mt-1 bg-white text-[10px] font-semibold text-[var(--text-primary)] py-0.5 px-1.5 rounded-md elevation-1 whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity">
          {pin.label}
        </div>
      )}
    </div>
  )
}

// ─── MapCluster ───────────────────────────────────────────────────────────────

interface MapClusterProps {
  count: number
  x: number
  y: number
  onClick?: () => void
}

function MapCluster({ count, x, y, onClick }: MapClusterProps) {
  return (
    <div
      className="absolute cursor-pointer"
      style={{ left: `${x}%`, top: `${y}%`, transform: 'translate(-50%, -50%)' }}
      onClick={onClick}
    >
      <div className="w-10 h-10 bg-[var(--primary)] rounded-full flex items-center justify-center elevation-2 border-4 border-white/30 hover:scale-110 transition-transform">
        <span className="text-white text-[12px] font-bold">{count}</span>
      </div>
    </div>
  )
}

// ─── MapView ──────────────────────────────────────────────────────────────────

interface MapViewProps {
  pins?: MapPin[]
  clusters?: { id: string; count: number; x: number; y: number }[]
  selectedPinId?: string
  onPinClick?: (pin: MapPin) => void
  showControls?: boolean
  showLegend?: boolean
  height?: string
  className?: string
}

export function MapView({
  pins = [],
  clusters = [],
  selectedPinId,
  onPinClick,
  showControls = true,
  showLegend = false,
  height = '360px',
  className = '',
}: MapViewProps) {
  const [zoom, setZoom] = useState(1)

  return (
    <div className={`relative rounded-[var(--radius-xl)] overflow-hidden border border-[var(--border)] ${className}`} style={{ height }}>
      {/* Map background (placeholder — integrar Mapbox/Leaflet aqui) */}
      <div className="absolute inset-0 bg-[#E8EDF2]">
        {/* Grid lines simulating map tiles */}
        <svg width="100%" height="100%" className="opacity-30">
          <defs>
            <pattern id="grid" width="40" height="40" patternUnits="userSpaceOnUse">
              <path d="M 40 0 L 0 0 0 40" fill="none" stroke="#94A3B8" strokeWidth="0.5" />
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#grid)" />
        </svg>
        {/* Simulated roads */}
        <svg className="absolute inset-0 w-full h-full opacity-40">
          <line x1="0" y1="50%" x2="100%" y2="50%" stroke="#CBD5E1" strokeWidth="3" />
          <line x1="30%" y1="0" x2="30%" y2="100%" stroke="#CBD5E1" strokeWidth="2" />
          <line x1="70%" y1="0" x2="70%" y2="100%" stroke="#CBD5E1" strokeWidth="2" />
          <line x1="0" y1="30%" x2="100%" y2="70%" stroke="#CBD5E1" strokeWidth="1.5" />
        </svg>
      </div>

      {/* Pins */}
      {pins.map((pin) => (
        <MapPinMarker
          key={pin.id}
          pin={pin}
          x={((pin.lng + 180) / 360) * 100}
          y={((90 - pin.lat) / 180) * 100}
          selected={pin.id === selectedPinId}
          onClick={onPinClick}
        />
      ))}

      {/* Clusters */}
      {clusters.map((c) => (
        <MapCluster key={c.id} count={c.count} x={c.x} y={c.y} />
      ))}

      {/* Controls */}
      {showControls && (
        <div className="absolute top-3 right-3 flex flex-col gap-1">
          <button onClick={() => setZoom((z) => Math.min(z + 0.25, 3))} className="w-8 h-8 bg-white rounded-[var(--radius-sm)] elevation-2 flex items-center justify-center text-[var(--text-secondary)] hover:text-[var(--primary)] border-none cursor-pointer transition-colors">
            <ZoomIn size={15} />
          </button>
          <button onClick={() => setZoom((z) => Math.max(z - 0.25, 0.5))} className="w-8 h-8 bg-white rounded-[var(--radius-sm)] elevation-2 flex items-center justify-center text-[var(--text-secondary)] hover:text-[var(--primary)] border-none cursor-pointer transition-colors">
            <ZoomOut size={15} />
          </button>
          <button className="w-8 h-8 bg-white rounded-[var(--radius-sm)] elevation-2 flex items-center justify-center text-[var(--text-secondary)] hover:text-[var(--primary)] border-none cursor-pointer transition-colors mt-1">
            <Layers size={15} />
          </button>
        </div>
      )}

      {/* Zoom indicator */}
      <div className="absolute bottom-3 right-3 bg-white/80 text-[10px] font-bold text-[var(--text-muted)] py-1 px-2 rounded-md">
        {Math.round(zoom * 100)}%
      </div>

      {/* Legend */}
      {showLegend && (
        <div className="absolute bottom-3 left-3 bg-white/90 rounded-[var(--radius-md)] py-2 px-3 elevation-1 flex flex-col gap-1.5">
          {Object.entries(pinConfig).filter(([k]) => k !== 'default').map(([type, cfg]) => (
            <div key={type} className="flex items-center gap-2">
              <div className={`w-4 h-4 ${cfg.bg} rounded-full flex items-center justify-center`}>{cfg.icon}</div>
              <span className="text-[10px] font-medium text-[var(--text-secondary)] capitalize">{type}</span>
            </div>
          ))}
        </div>
      )}

      {/* Integration note */}
      <div className="absolute top-3 left-3 bg-white/80 text-[10px] text-[var(--text-muted)] py-1 px-2 rounded-md font-medium">
        Integrar Mapbox / Leaflet
      </div>
    </div>
  )
}
