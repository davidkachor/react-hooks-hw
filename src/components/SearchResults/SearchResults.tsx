import s from './SearchResults.module.css'
import React, { useCallback, useEffect, useId, useMemo, useState } from 'react'
import Person from '../../types/Person'

const SearchResults: React.FC<{
	data: Person[]
	onFilter: (data: Person[]) => void
	title: string
}> = props => {
	const id = useId()
	const [value, setValue] = useState('')

	const changeHandler = useCallback(
		(event: React.ChangeEvent<HTMLInputElement>) => {
			setValue(event.target.value)
		},
		[]
	)
	const filteredArr = useMemo(
		() =>
			props.data.filter(e =>
				e.name.toLowerCase().includes(value.trim().toLowerCase())
			),
		[props.data, value]
	)

	useEffect(() => {
		props.onFilter(filteredArr)
	}, [filteredArr])

	return (
		<form className={s.form}>
			<label htmlFor={id + '-filter-input'}>{props.title}</label>
			<input onChange={changeHandler} type="text" id={id + '-filter-input'} />
		</form>
	)
}

export default SearchResults
