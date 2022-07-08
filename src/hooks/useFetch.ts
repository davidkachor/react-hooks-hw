import { useState, useEffect } from 'react'

const useFetch = (url: string, requestConfig?: RequestInit) => {
	const [isLoading, setIsLoading] = useState(true)
	const [error, setError] = useState<any>('')
	const [data, setData] = useState<Object[] | Object | null>(null)

	useEffect(() => {
		try {
			setIsLoading(true)
			fetch(url, requestConfig)
				.then(res => res.json())
				.then(data => {
					setIsLoading(false)
					setData(data)
				})
				.catch(err => setError(err))
		} catch (err) {
			setError(err)
		}
	}, [requestConfig, url])

	return [data, isLoading, error]
}

export default useFetch
