import { useState, useEffect, useCallback } from 'react'

const useMatchMedia = (mediaQuery: string) => {
	const [matchMediaEl, setMatchMediaEl] = useState(matchMedia(mediaQuery))
	const isMatches = matchMediaEl.matches

	const resizeHandler = useCallback(() => {
		setMatchMediaEl(matchMedia(mediaQuery))
	}, [mediaQuery])

	useEffect(() => {
		matchMediaEl.addEventListener('change', resizeHandler)

		return () => {
			matchMediaEl.removeEventListener('change', resizeHandler)
		}
	}, [matchMediaEl, resizeHandler])

	return isMatches
}

export default useMatchMedia
