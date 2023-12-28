// 1.aşama store tanımı

import { configureStore } from '@reduxjs/toolkit';
import { CounterReducer } from './slices/CounterSlice';

// store uygulama içerisinde kullanılan reducer tanımlarını bağladığımız yer
// reducer üzerinden state okuma işlemi yapıyoruz
export const store = configureStore({
	reducer: {
		counterState: CounterReducer, // 4. aşama uygula için tanımlanan sliceları reducer olarak store tanıttık.
	},
});

// Root State tipi ile uygulama içerisinde tüm statelere tek bir tip üzerinden bağlabileceğiz.
export type RootState = ReturnType<typeof store.getState>;
