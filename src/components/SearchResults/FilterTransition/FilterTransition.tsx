import Person from '../../../types/Person'
import React, { useCallback, useState, useTransition } from 'react'
import SearchResults from '../SearchResults'
import s from '../Filter.module.css'

const FilterTransition: React.FC<{ data: Person[] }> = props => {
	const [filteredContent, setFilteredContent] = useState(props.data)
	const [isPending, startTransition] = useTransition()

	const filterHandler = useCallback((content: Person[]) => {
		startTransition(() => {
			setFilteredContent(content)
			console.count('transition')
		})
	}, [])

	return (
		<div className={s.wrapper}>
			<SearchResults
				data={props.data}
				onFilter={filterHandler}
				title="useTransition"
			/>
			{isPending && <p>Filtering...</p>}
			<ul>
				{filteredContent.map(e => (
					<li key={Math.random()}>{e.name}</li>
				))}
			</ul>
		</div>
	)
}

export default FilterTransition
