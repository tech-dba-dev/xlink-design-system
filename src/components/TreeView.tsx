import { useState, type ReactNode } from 'react'
import { ChevronRight, ChevronDown } from 'lucide-react'

// ─── Types ───────────────────────────────────────────────────────────────────

export interface TreeNode {
  id: string
  label: string
  icon?: ReactNode
  badge?: string | number
  children?: TreeNode[]
  actions?: { icon: ReactNode; label: string; onClick: (node: TreeNode) => void }[]
}

// ─── TreeItem ─────────────────────────────────────────────────────────────────

interface TreeItemProps {
  node: TreeNode
  depth?: number
  selectedId?: string
  onSelect?: (node: TreeNode) => void
}

function TreeItem({ node, depth = 0, selectedId, onSelect }: TreeItemProps) {
  const [expanded, setExpanded] = useState(true)
  const [showActions, setShowActions] = useState(false)
  const hasChildren = node.children && node.children.length > 0
  const isSelected = selectedId === node.id

  return (
    <div>
      <div
        className={`flex items-center gap-1.5 py-1.5 px-2 rounded-[var(--radius-sm)] cursor-pointer group transition-colors relative ${
          isSelected ? 'bg-[var(--primary-lighter)] text-[var(--primary)]' : 'hover:bg-[var(--surface)] text-[var(--text-secondary)]'
        }`}
        style={{ paddingLeft: `${depth * 16 + 8}px` }}
        onClick={() => { onSelect?.(node); if (hasChildren) setExpanded((v) => !v) }}
        onMouseEnter={() => setShowActions(true)}
        onMouseLeave={() => setShowActions(false)}
      >
        {/* Expand toggle */}
        <span className="w-4 h-4 flex items-center justify-center shrink-0 text-[var(--text-muted)]">
          {hasChildren
            ? expanded ? <ChevronDown size={14} /> : <ChevronRight size={14} />
            : <span className="w-1.5 h-1.5 rounded-full bg-[var(--border)] inline-block" />
          }
        </span>

        {/* Icon */}
        {node.icon && <span className="shrink-0">{node.icon}</span>}

        {/* Label */}
        <span className={`flex-1 text-[13px] font-medium truncate ${isSelected ? 'text-[var(--primary)] font-semibold' : ''}`}>{node.label}</span>

        {/* Badge */}
        {node.badge != null && (
          <span className="text-[10px] font-bold bg-[var(--border)] text-[var(--text-muted)] px-1.5 py-0.5 rounded-full shrink-0">{node.badge}</span>
        )}

        {/* Actions */}
        {node.actions && showActions && (
          <div className="flex items-center gap-0.5 shrink-0" onClick={(e) => e.stopPropagation()}>
            {node.actions.map((action, i) => (
              <button
                key={i}
                title={action.label}
                onClick={() => action.onClick(node)}
                className="w-6 h-6 flex items-center justify-center rounded text-[var(--text-muted)] hover:text-[var(--primary)] hover:bg-[var(--primary-lighter)] bg-transparent border-none cursor-pointer transition-colors"
              >
                {action.icon}
              </button>
            ))}
          </div>
        )}
      </div>

      {/* Children */}
      {hasChildren && expanded && (
        <div>
          {node.children!.map((child) => (
            <TreeItem key={child.id} node={child} depth={depth + 1} selectedId={selectedId} onSelect={onSelect} />
          ))}
        </div>
      )}
    </div>
  )
}

// ─── TreeView ─────────────────────────────────────────────────────────────────

interface TreeViewProps {
  nodes: TreeNode[]
  selectedId?: string
  onSelect?: (node: TreeNode) => void
  className?: string
}

export function TreeView({ nodes, selectedId, onSelect, className = '' }: TreeViewProps) {
  return (
    <div className={`flex flex-col gap-0.5 ${className}`}>
      {nodes.map((node) => (
        <TreeItem key={node.id} node={node} selectedId={selectedId} onSelect={onSelect} />
      ))}
    </div>
  )
}
