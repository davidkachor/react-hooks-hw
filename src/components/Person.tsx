import React, { FunctionComponent } from 'react'

interface OwnProps {
	name: string
}

type Props = OwnProps

const Person: FunctionComponent<Props> = props => {
	return (
		<article>
			<h2>{props.name}</h2>
		</article>
	)
}

export default Person
