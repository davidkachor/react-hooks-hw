import React, { Reducer, ReducerState, useEffect, useReducer } from 'react'
import s from './App.module.css'
import useFetch from './hooks/useFetch'
import LoadingBar from './components/LoadingBar/LoadingBar'
import Person from './types/Person'
import FilterTransition from './components/FilterTransition/FilterTransition'
import FilterDeferred from './components/FilterDeferred/FilterDeferred'

type Action =
	| { type: 'SET_PAGE'; page: number }
	| { type: 'SET_ITEMS_AMOUNT'; itemsAmount: number }
	| { type: 'ADD_LOADED_ITEMS_AMOUNT'; loadedItemsAmount: number }
	| { type: 'ADD_CONTENT'; content: Person[] }
	| { type: 'NEXT_PAGE' }
	| { type: 'PREVIOUS_PAGE' }

type State = {
	page: number
	itemsAmount: number
	loadedItemsAmount: number
	content: Person[]
}

type R = Reducer<State, Action>

const initialState: ReducerState<R> = {
	page: 1,
	itemsAmount: 0,
	loadedItemsAmount: 0,
	content: [],
}

const reducer: R = (state, action) => {
	switch (action.type) {
		case 'SET_PAGE':
			return { ...state, page: action.page }
		case 'NEXT_PAGE':
			return { ...state, page: state.page + 1 }
		case 'PREVIOUS_PAGE':
			return { ...state, page: state.page - 1 }
		case 'SET_ITEMS_AMOUNT':
			return { ...state, itemsAmount: action.itemsAmount }
		case 'ADD_LOADED_ITEMS_AMOUNT':
			return {
				...state,
				loadedItemsAmount: state.loadedItemsAmount + action.loadedItemsAmount,
			}
		case 'ADD_CONTENT':
			return { ...state, content: [...state.content, ...action.content] }
		default:
			return state
	}
}

function App() {
	const [{ page, itemsAmount, loadedItemsAmount, content }, dispatch] =
		useReducer<R>(reducer, initialState)
	const [data, isLoading] = useFetch(
		`https://swapi.dev/api/people${page === 1 ? '' : `/?page=${page}`}`
	)

	useEffect(() => {
		if (data) {
			if (!itemsAmount) {
				dispatch({ type: 'SET_ITEMS_AMOUNT', itemsAmount: data.count })
			}
			dispatch({ type: 'ADD_CONTENT', content: data.results })
			dispatch({
				type: 'ADD_LOADED_ITEMS_AMOUNT',
				loadedItemsAmount: data.results.length,
			})
			if (data.next) {
				dispatch({ type: 'NEXT_PAGE' })
			}
		}
	}, [data])

	return (
		<div className={s.container}>
			{(loadedItemsAmount !== itemsAmount || isLoading) && (
				<LoadingBar maxValue={itemsAmount} initialValue={loadedItemsAmount} />
			)}
			{!!itemsAmount && !!loadedItemsAmount && (
				<h1>
					Loaded {loadedItemsAmount} of {itemsAmount}
				</h1>
			)}
			{!isLoading && loadedItemsAmount === itemsAmount && (
				<div className={s.formWrapper}>
					<FilterTransition data={content} />
					<FilterDeferred data={content} />
				</div>
			)}
		</div>
	)
}

export default App
