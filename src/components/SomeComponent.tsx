import React, { FunctionComponent, ReactNode } from 'react'
import useMatchMedia from '../hooks/useMatchMedia'

interface OwnProps {
	children: ReactNode
	name: string
}

type Props = OwnProps

const SomeComponent: FunctionComponent<Props> = props => {
	const isMatches = useMatchMedia('(max-width: 900px)')

	return (
		<h1 style={{ color: isMatches ? 'black' : 'red' }}>
			{isMatches ? props.children : 'Component doesn`t match'}
		</h1>
	)
}

export default SomeComponent
