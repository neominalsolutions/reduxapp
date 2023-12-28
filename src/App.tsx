import React, { useState } from 'react';
import logo from './logo.svg';
import './App.css';
import CounterSample from './pages/CounterSample';
import CounterReadOnlySample from './pages/CounterReadOnlySample';

function App() {
	const [readOnly, setReadOnly] = useState(false);

	return (
		<div className="App">
			<button
				onClick={() => {
					setReadOnly(!readOnly);
				}}
			>
				Toggle State
			</button>
			<hr></hr>
			{readOnly ? <CounterReadOnlySample /> : <CounterSample />}
		</div>
	);
}

export default App;
