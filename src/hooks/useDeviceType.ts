import { useCallback, useEffect, useState } from 'react'
import useMatchMedia from './useMatchMedia'

const useDeviceType = () => {
	const [isPrint, setIsPrint] = useState(false)

	const isPhone = useMatchMedia('screen and (max-width: 480px)')
	const isTablet = useMatchMedia(
		'screen and (min-width: 480px) and (max-width: 768px)'
	)
	const isDesktop = useMatchMedia('screen and (min-width: 768px)')

	const beforePrintHandler = useCallback(() => {
		setIsPrint(true)
	}, [])

	const afterPrintHandler = useCallback(() => {
		setIsPrint(false)
	}, [])

	useEffect(() => {
		window.addEventListener('beforeprint', beforePrintHandler)
		window.addEventListener('afterprint', afterPrintHandler)

		return () => {
			window.removeEventListener('beforeprint', beforePrintHandler)
			window.removeEventListener('afterprint', afterPrintHandler)
		}
	}, [afterPrintHandler, beforePrintHandler])

	return { isPhone, isTablet, isDesktop, isPrint }
}

export default useDeviceType
