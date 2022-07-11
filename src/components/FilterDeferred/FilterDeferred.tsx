import React, {
	useDeferredValue,
	useEffect,
	useState,
} from 'react'
import Person from '../../types/Person'
import ContentList from './ContentList/ContentList'
import s from '../Filter.module.css'

const FilterDeferred: React.FC<{ data: Person[] }> = props => {
	const [filteredContent, setFilteredContent] = useState(props.data)
	const [inputValue, setInputValue] = useState('')
	const deferredValue = useDeferredValue(inputValue)

	useEffect(() => {
		setFilteredContent(
			props.data.filter(e =>
				e.name.toUpperCase().includes(deferredValue.toUpperCase())
			)
		)
		console.count('after deferred')
	}, [props.data, deferredValue])

	return (
		<div className={s.wrapper}>
			<form className={s.form}>
				<label htmlFor={'transition-filter-input'}>useDeferred</label>
				<input
					onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
						console.count('before deferring')
						setInputValue(event.target.value)
					}}
					type="text"
					id={'transition-filter-input'}
				/>
			</form>
			<ContentList content={filteredContent} />
		</div>
	)
}

export default FilterDeferred
