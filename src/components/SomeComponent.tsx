import React, { useEffect, useState } from 'react'
import useMatchMedia from '../hooks/useMatchMedia'
import useDeviceType from '../hooks/useDeviceType'
import useFetch from '../hooks/useFetch'
import Person from './Person'

type swPerson = {
	birth_year: string
	created: string
	edited: string
	eye_color: string
	films: string[]
	gender: string
	hair_color: string
	height: string
	homeworld: string
	mass: string
	name: string
	skin_color: string
	species: string[]
	starships: string[]
	url: string
	vehicles: string[]
}

let isFirstRender = true

const SomeComponent: React.FC<{ name?: string; children: string }> = props => {
	const [content, setContent] = useState<swPerson[]>([])
	const [page, setPage] = useState(1)
	const isMatches = useMatchMedia('(max-width: 900px)')
	const { isPhone, isPrint, isDesktop, isTablet } = useDeviceType()
	const [data, isLoading, error] = useFetch(
		`https://swapi.dev/api/people${page === 1 ? '' : `/?page=${page}`}`
	)

	if (error) {
		console.log(error)
	}

	useEffect(() => {
		if (isFirstRender) {
			isFirstRender = false
		} else {
			setContent(prev => [...prev, ...data.results])
			// if (data.next) {
			// 	setPage(prev => prev + 1)
			// }
		}
	}, [data])

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
				<span style={{ fontWeight: 'bold' }}>Is desktop: </span>{' '}
				{`${isDesktop}`}
			</p>
			<p>
				<span style={{ fontWeight: 'bold' }}>Is Printing: </span> {`${isPrint}`}
			</p>
			{/*{!!data?.previous && (*/}
			{/*	<button onClick={() => setPage(prev => prev - 1)}>prev</button>*/}
			{/*)}*/}
			{content.length !== 0 &&
				content.map(e => <Person name={e.name} key={Math.random()} />)}
			{isLoading && <p>Loading...</p>}
			{!!data?.next && (
				<button onClick={() => setPage(prev => prev + 1)}>more</button>
			)}
		</>
	)
}

export default SomeComponent
