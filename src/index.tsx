import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { Provider } from 'react-redux'; // redux yapısının react uygulamasında kullanılması için içerisinde Provider,useSelector, useDispatch gibi hooklar barındıran paket
import { store } from './store/store';
import { BrowserRouter } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from 'react-query';

/*
  2.Adım

	<Provider store={store}>
			<App />
		</Provider>
    Context API gibi tüm uygulamayı sardığım için artık uygulama geneli global state yönetimi yapabiliriz.
*/

const root = ReactDOM.createRoot(
	document.getElementById('root') as HTMLElement
);

// 1. adım
const client = new QueryClient(); // client store

root.render(
	<>
		<BrowserRouter>
			<Provider store={store}>
				<QueryClientProvider client={client}>
					<App />
				</QueryClientProvider>
			</Provider>
		</BrowserRouter>
	</>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
