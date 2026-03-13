"use client"

type Props = {
  count: number
}

export default function CartBadge({ count }: Props) {
  if (count === 0) return null

  return (
    <span className="ml-1 rounded-full bg-red-500 px-2 py-0.5 text-xs font-bold text-white">
      {count}
    </span>
  )
}