import React, { useReducer } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
	decrement,
	increment,
	incrementByValue,
	reset,
} from '../store/slices/CounterSlice';
import { RootState } from '../store/store';

function CounterSample() {
	// 5.adım sayfada kullanımı

	// client state değişmesi için tetitikleme yaptığımız yapı
	const dispatch = useDispatch();
	// useSelector ile state çağırdık
	const count = useSelector((store: RootState) => store.counterState.count);

	const onIncrement = () => {
		dispatch(increment());
	};

	const onReset = () => {
		dispatch(reset());
	};

	const onDecrement = () => {
		dispatch(decrement());
	};

	const onIncrementByValue = (e: any) => {
		dispatch(incrementByValue({ value: Number(e.target.value) }));
	};

	return (
		<div>
			<h1>Read/Write Component</h1>
			Sayaç : {count}
			<br></br>
			<h1>Counter State Güncelleme</h1>
			<hr></hr>
			<button onClick={onIncrement}>(+)</button>
			<button onClick={onDecrement}>(-)</button>
			<button onClick={onReset}>(0)</button>
			<br></br>
			<input onChange={onIncrementByValue} type="number" />
		</div>
	);
}

export default CounterSample;
