import React, { useCallback, useState } from 'react'
import Person from '../../../types/Person'
import SearchResults from '../SearchResults'
import ContentList from './ContentList/ContentList'
import s from '../Filter.module.css'

const FilterDeferred: React.FC<{ data: Person[] }> = props => {
	const [filteredContent, setFilteredContent] = useState(props.data)

	const filterHandler = useCallback((content: Person[]) => {
		setFilteredContent(content)
		console.count('deferred')
	}, [])

	return (
		<div className={s.wrapper}>
			<SearchResults
				data={props.data}
				onFilter={filterHandler}
				title="useDeferred"
			/>
			<ContentList content={filteredContent} />
		</div>
	)
}

export default FilterDeferred
