import React from 'react';
import { useSelector } from 'react-redux';
import { RootState } from '../store/store';

function CounterReadOnlySample() {
	const state = useSelector((store: RootState) => store.counterState);

	return (
		<div>
			<h1>ReadOnly Component</h1>
			Sayaç : {state.count}
		</div>
	);
}

export default CounterReadOnlySample;
