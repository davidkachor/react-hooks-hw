import React, { useDeferredValue } from 'react'
import Person from '../../../types/Person'

const ContentList: React.FC<{ content: Person[] }> = props => {
	const deferredContent = useDeferredValue(props.content)

	return (
		<ul>
			{deferredContent.map(e => (
				<li key={e.url}>{e.name}</li>
			))}
		</ul>
	)
}

export default ContentList
