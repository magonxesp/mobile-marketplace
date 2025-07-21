import { createContext, useContext, useEffect, useState } from "react";

export const CartContext = createContext({
  items: 0,
  addItems: () => {}
})

export const useCart = () => useContext(CartContext)

const localStorageKey = "cart-items"

export function CartProvider({ children }) {
  const [items, setItems] = useState(0)

  useEffect(() => {
    const count = parseInt(localStorage.getItem(localStorageKey) ?? 0)
    setItems(count)
  }, [])

  const addItems = (count) => {
    const sum = items + (count ?? 1)
    setItems(sum)
    localStorage.setItem(localStorageKey, sum)
  }

  return (
    <CartContext.Provider value={{ items, addItems }}>
      {children}
    </CartContext.Provider>
  )
}
