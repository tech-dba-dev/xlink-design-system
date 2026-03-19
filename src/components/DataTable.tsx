import type { ReactNode } from 'react'

interface Column<T> {
  key: string
  header: string
  render: (row: T) => ReactNode
  align?: 'left' | 'right' | 'center'
}

interface DataTableProps<T> {
  columns: Column<T>[]
  data: T[]
  className?: string
}

export function DataTable<T>({ columns, data, className = '' }: DataTableProps<T>) {
  return (
    <div className={`overflow-x-auto ${className}`}>
      <table className="w-full border-separate border-spacing-0 text-[13px]">
        <thead>
          <tr>
            {columns.map((col) => (
              <th
                key={col.key}
                className="py-2.5 px-4 text-left text-[11px] font-bold uppercase tracking-wider text-[var(--text-muted)] bg-[var(--surface)] border-b border-[var(--border)] sticky top-0 z-[1]"
                style={{ textAlign: col.align || 'left' }}
              >
                {col.header}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {data.map((row, i) => (
            <tr key={i} className="hover:bg-[var(--primary-lighter)] transition-colors">
              {columns.map((col) => (
                <td
                  key={col.key}
                  className="py-3 px-4 border-b border-[#F1F5F9] text-[var(--text-secondary)] align-middle last:border-b-0"
                  style={{ textAlign: col.align || 'left' }}
                >
                  {col.render(row)}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}
