import React, { FunctionComponent, ReactNode } from 'react'
import useMatchMedia from '../hooks/useMatchMedia'
import useDeviceType from '../hooks/useDeviceType'

interface OwnProps {
	children: ReactNode
	name: string
}

type Props = OwnProps

const SomeComponent: FunctionComponent<Props> = props => {
	const isMatches = useMatchMedia('(max-width: 900px)')
	const { isPhone, isPrint, isDesktop, isTablet } = useDeviceType()

	return (
		<>
			<h1 style={{ color: isMatches ? 'black' : 'red' }}>
				{isMatches ? props.children : 'Component doesn`t match'}
			</h1>
			<p>
				<span style={{ fontWeight: 'bold' }}>Is phone: </span> {`${isPhone}`}
			</p>
			<p>
				<span style={{ fontWeight: 'bold' }}>Is tablet: </span> {`${isTablet}`}
			</p>
			<p>
				<span style={{ fontWeight: 'bold' }}>Is desktop: </span> {`${isDesktop}`}
			</p>
			<p>
				<span style={{ fontWeight: 'bold' }}>Is Printing: </span> {`${isPrint}`}
			</p>
		</>
	)
}

export default SomeComponent
