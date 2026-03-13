"use client"

import { useEffect, useState } from "react"

export default function HeroBanner() {
  const [isDark, setIsDark] = useState(false)

  useEffect(() => {
    const checkTheme = () => {
      setIsDark(document.documentElement.classList.contains("dark"))
    }

    checkTheme()

    const observer = new MutationObserver(checkTheme)

    observer.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ["class"],
    })

    return () => observer.disconnect()
  }, [])

  const brandSrc = isDark
    ? "/branding/brand-dark.svg"
    : "/branding/brand-light.svg"

  return (
    <img
      src={brandSrc}
      alt="Marca"
      className="max-h-52 object-contain"
    />
  )
}