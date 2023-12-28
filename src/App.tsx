import React, { useEffect, useState } from 'react';
import logo from './logo.svg';
import './App.css';
import CounterSample from './pages/CounterSample';
import CounterReadOnlySample from './pages/CounterReadOnlySample';
import { Link, useRoutes } from 'react-router-dom';
import ServerStateWithRedux from './pages/ServerStateWithRedux';
import { useDispatch } from 'react-redux';
import { fetchProductsState } from './store/slices/ProductSlice';
import { AppDispatch } from './store/store';
import ServerStateReactQuery from './pages/ServerStateReactQuery';

function App() {
	// Hangi uygulama 1 sefere mahsus bir daha load olana kadar buradaki component asla girmez bu sebeple verilerimizi 1 sefer çekip burada schedule edebiliriz.

	const dispatch = useDispatch<AppDispatch>();

	// const schedular = setInterval(() => {
	// 	dispatch(fetchProductsState()); // reFetching işlemi
	// 	clearInterval(schedular);
	// }, 5000); // 5s sonra yada 5 dk bir

	useEffect(() => {
		// dispatch(fetchProductsState());
		// web socket dinleyerek data bir değişim olduğu durumda onMessage eventi içinde bunu tetikle.
		// Mobile uygulamada ise bu tarz veri çekme işlemlerin splash screen kullanırız.
	}, []);

	const routes = useRoutes([
		{
			path: '/counterStateWriteAndRead',
			Component: CounterSample,
		},
		{
			path: '/counterStateReadOnly',
			Component: CounterReadOnlySample,
		},
		{
			path: '/serverStateWithRedux',
			Component: ServerStateWithRedux,
		},
		{
			path: '/serverStateReactQuery',
			Component: ServerStateReactQuery,
		},
	]);

	return (
		<>
			<div style={{ padding: '20px' }}>
				<Link to="/counterStateWriteAndRead">Counter State Write And Read</Link>{' '}
				<Link to="/counterStateReadOnly">Counter State Read Only</Link>{' '}
				<Link to="/serverStateWithRedux">Server State With Redux</Link> {'  '}
				<Link to="/serverStateReactQuery">Server State React Query</Link>
				<br></br>
				<hr></hr>
				{routes}
			</div>
		</>
	);
	// const [readOnly, setReadOnly] = useState(false);

	// return (
	// 	<div className="App">
	// 		<button
	// 			onClick={() => {
	// 				setReadOnly(!readOnly);
	// 			}}
	// 		>
	// 			Toggle State
	// 		</button>
	// 		<hr></hr>
	// 		{readOnly ? <CounterReadOnlySample /> : <CounterSample />}
	// 	</div>
	// );
}

export default App;
