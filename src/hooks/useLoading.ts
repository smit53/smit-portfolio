import { useState, useEffect } from 'react'

export const useLoading = () => {
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    // Shorter loading time to prevent getting stuck
    const timer = setTimeout(() => {
      setIsLoading(false)
    }, 1000) // Reduced from 2000ms to 1000ms

    // Fallback to ensure loading doesn't get stuck
    const fallbackTimer = setTimeout(() => {
      setIsLoading(false)
    }, 3000)

    return () => {
      clearTimeout(timer)
      clearTimeout(fallbackTimer)
    }
  }, [])

  return { isLoading }
} 