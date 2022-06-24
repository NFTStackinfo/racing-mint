import { useEffect, useState } from "react"

export const useOnScreen = ref => {
  const [isIntersecting, setIntersecting] = useState(false)

  const observer = new IntersectionObserver(
    ([entry]) => setIntersecting(entry.isIntersecting),
    {
      threshold: [0.2, 0.8],
    }
  )

  useEffect(() => {
    observer.observe(ref.current)
    return () => {
      observer.disconnect()
    }
  }, [])

  return isIntersecting
}
