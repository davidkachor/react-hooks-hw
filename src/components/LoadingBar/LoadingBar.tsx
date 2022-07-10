import s from './LoadingBar.module.css'
import React from "react";

const LoadingBar: React.FC<{
	maxValue: number
	initialValue: number
}> = props => {
	const progress = (props.initialValue / props.maxValue) * 100

	return (
		<div className={s.container}>
			<div className={s.status} style={{ width: `${progress}%` }}>
				{isNaN(progress) ? (
					<p className={s.progress}>Loading...</p>
				) : (
					<p className={s.progress}>{progress.toFixed(2)}%</p>
				)}
			</div>
		</div>
	)
}

export default LoadingBar
