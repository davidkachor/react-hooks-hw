import Person from '../../types/Person'
import React, { useEffect, useState, useTransition } from 'react'
import s from '../Filter.module.css'

const FilterTransition: React.FC<{ data: Person[] }> = props => {
	const [filteredContent, setFilteredContent] = useState(props.data)
	const [inputValue, setInputValue] = useState('')
	const [isPending, startTransition] = useTransition()

	useEffect(() => {
		setFilteredContent(
			props.data.filter(e =>
				e.name.toUpperCase().includes(inputValue.toUpperCase())
			)
		)
	}, [props.data, inputValue])

	return (
		<div className={s.wrapper}>
			<form className={s.form}>
				<label htmlFor={'transition-filter-input'}>useTransition</label>
				<input
					onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
						console.count('before transition')
						startTransition(() => {
							console.count('after transition')
							setInputValue(event.target.value)
						})
					}}
					type="text"
					id={'transition-filter-input'}
				/>
			</form>
			{isPending && <p>Filtering...</p>}
			<ul>
				{filteredContent.map(e => (
					<li key={e.url}>{e.name}</li>
				))}
			</ul>
		</div>
	)
}

export default FilterTransition
