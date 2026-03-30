import { useState } from 'react'
import { Star } from 'lucide-react'
import { Textarea } from './Input'
import { Button } from './Button'

// ─── StarRating ───────────────────────────────────────────────────────────────

interface StarRatingProps {
  value: number
  onChange?: (value: number) => void
  max?: number
  size?: number
  readOnly?: boolean
  className?: string
}

export function StarRating({ value, onChange, max = 5, size = 24, readOnly = false, className = '' }: StarRatingProps) {
  const [hovered, setHovered] = useState(0)

  return (
    <div className={`flex items-center gap-1 ${className}`}>
      {Array.from({ length: max }).map((_, i) => {
        const filled = (hovered || value) > i
        return (
          <button
            key={i}
            type="button"
            disabled={readOnly}
            onClick={() => onChange?.(i + 1)}
            onMouseEnter={() => !readOnly && setHovered(i + 1)}
            onMouseLeave={() => !readOnly && setHovered(0)}
            className={`bg-transparent border-none p-0 transition-transform duration-100 ${readOnly ? 'cursor-default' : 'cursor-pointer hover:scale-110'}`}
          >
            <Star
              size={size}
              className={`transition-colors ${filled ? 'text-[#F59E0B] fill-[#F59E0B]' : 'text-[var(--border)] fill-transparent'}`}
            />
          </button>
        )
      })}
    </div>
  )
}

// ─── RatingWithComment ────────────────────────────────────────────────────────

interface RatingWithCommentProps {
  onSubmit?: (rating: number, comment: string) => void
  className?: string
}

export function RatingWithComment({ onSubmit, className = '' }: RatingWithCommentProps) {
  const [rating, setRating] = useState(0)
  const [comment, setComment] = useState('')

  const labels = ['', 'Muito ruim', 'Ruim', 'Regular', 'Bom', 'Excelente']

  const handleSubmit = () => {
    if (rating === 0) return
    onSubmit?.(rating, comment)
  }

  return (
    <div className={`flex flex-col gap-4 ${className}`}>
      <div className="flex flex-col items-center gap-2">
        <StarRating value={rating} onChange={setRating} size={32} />
        {rating > 0 && (
          <span className="text-[13px] font-semibold text-[var(--text-secondary)] animate-fade-in">{labels[rating]}</span>
        )}
      </div>
      <Textarea
        label="Comentário (opcional)"
        rows={3}
        placeholder="Descreva sua experiência..."
        value={comment}
        onChange={(e) => setComment(e.target.value)}
      />
      <Button onClick={handleSubmit} disabled={rating === 0} className="self-end">
        Enviar Avaliação
      </Button>
    </div>
  )
}
