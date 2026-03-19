interface TimelineEvent {
  title: string
  description: string
  date: string
  dotColor: string
}

interface TimelineProps {
  events: TimelineEvent[]
  className?: string
}

export function Timeline({ events, className = '' }: TimelineProps) {
  return (
    <div className={`flex flex-col relative pl-6 ${className}`}>
      <div className="absolute left-[7px] top-2 bottom-2 w-0.5 bg-[var(--border)]" />
      {events.map((event, i) => (
        <div key={i} className={`relative ${i < events.length - 1 ? 'pb-6' : ''}`}>
          <div
            className="absolute -left-[21px] top-1 w-3 h-3 rounded-full border-2 border-white z-[1]"
            style={{ background: event.dotColor }}
          />
          <div className="flex justify-between items-start">
            <div>
              <span className="text-[13px] font-semibold text-[var(--text-primary)]">{event.title}</span>
              <br />
              <span className="text-xs text-[var(--text-muted)]">{event.description}</span>
            </div>
            <span className="text-[11px] text-[var(--text-muted)] whitespace-nowrap ml-4">{event.date}</span>
          </div>
        </div>
      ))}
    </div>
  )
}
