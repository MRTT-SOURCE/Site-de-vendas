"use client"

import {
  createContext,
  useContext,
  useEffect,
  useMemo,
  useState,
  ReactNode,
} from "react"

export type CartItem = {
  id: number
  nome: string
  preco: number
  quantidade: number
}

type CartContextType = {
  items: CartItem[]
  loaded: boolean
  totalItems: number
  totalPrice: number
  addItem: (produto: { id: number; nome: string; preco: number }) => void
  increase: (id: number) => void
  decrease: (id: number) => void
  removeItem: (id: number) => void
  clearCart: () => void
}

const STORAGE_KEY = "cart"

const CartContext = createContext<CartContextType | undefined>(undefined)

export function CartProvider({ children }: { children: ReactNode }) {
  const [items, setItems] = useState<CartItem[]>([])
  const [loaded, setLoaded] = useState(false)

  useEffect(() => {
    const cart = JSON.parse(localStorage.getItem(STORAGE_KEY) || "[]")
    setItems(cart)
    setLoaded(true)
  }, [])

  function persist(nextItems: CartItem[]) {
    setItems(nextItems)
    localStorage.setItem(STORAGE_KEY, JSON.stringify(nextItems))
  }

  function addItem(produto: { id: number; nome: string; preco: number }) {
    const existing = items.find((item) => item.id === produto.id)

    if (existing) {
      const nextItems = items.map((item) =>
        item.id === produto.id
          ? { ...item, quantidade: item.quantidade + 1 }
          : item
      )
      persist(nextItems)
      return
    }

    persist([
      ...items,
      {
        id: produto.id,
        nome: produto.nome,
        preco: produto.preco,
        quantidade: 1,
      },
    ])
  }

  function increase(id: number) {
    const nextItems = items.map((item) =>
      item.id === id ? { ...item, quantidade: item.quantidade + 1 } : item
    )
    persist(nextItems)
  }

  function decrease(id: number) {
    const nextItems = items
      .map((item) =>
        item.id === id ? { ...item, quantidade: item.quantidade - 1 } : item
      )
      .filter((item) => item.quantidade > 0)

    persist(nextItems)
  }

  function removeItem(id: number) {
    persist(items.filter((item) => item.id !== id))
  }

  function clearCart() {
    persist([])
  }

  const totalItems = useMemo(
    () => items.reduce((acc, item) => acc + item.quantidade, 0),
    [items]
  )

  const totalPrice = useMemo(
    () => items.reduce((acc, item) => acc + item.preco * item.quantidade, 0),
    [items]
  )

  return (
    <CartContext.Provider
      value={{
        items,
        loaded,
        totalItems,
        totalPrice,
        addItem,
        increase,
        decrease,
        removeItem,
        clearCart,
      }}
    >
      {children}
    </CartContext.Provider>
  )
}

export function useCart() {
  const context = useContext(CartContext)

  if (!context) {
    throw new Error("useCart deve ser usado dentro de CartProvider")
  }

  return context
}