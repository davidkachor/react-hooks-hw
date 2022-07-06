import { useState, useEffect, useCallback } from 'react'

const useMatchMedia = (mediaQuery: string) => {
    const [isMatches, setIsMatches] = useState(matchMedia(mediaQuery).matches)

    const resizeHandler = useCallback(() => {
        setIsMatches(matchMedia(mediaQuery).matches)
    }, [mediaQuery])

    useEffect(() => {
        window.addEventListener('resize', resizeHandler)

        return () => {
            window.removeEventListener('resize', resizeHandler)
        }
    }, [resizeHandler])

    return isMatches
}

export default useMatchMedia
