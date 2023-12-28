// state yönetimin yapıldığı dosya
// 3. adım
import { PayloadAction, createSlice } from '@reduxjs/toolkit';

export type CounterState = {
	count: number;
};

// ACTION TYPES
// COUNTER_INCREMENT
// COUNTER_RESET
// COUNTER_DECREMENT
const initialCounter: CounterState = { count: 0 };

const CounterSlice = createSlice({
	name: 'COUNTER',
	initialState: initialCounter,
	reducers: {
		// senkron çağırılar için
		increment: (state: CounterState) => {
			// 1 artırma işlemi
			state.count = state.count + 1;
			// return { ...state }; ihtiyaç yok
		},
		reset: (state: CounterState) => {
			// sıfırlama
			state.count = 0;
		},
		decrement: (state: CounterState) => {
			// 1 azaltma
			state.count = state.count - 1;
		},
		incrementByValue: (
			// gönderilen değere göre arttırma
			state: CounterState,
			action: PayloadAction<{ value: number }> // payload ile state güncellenecek ise payloadAction tipinde bir değer tanımı yapıyoruz
		) => {
			state.count = action.payload.value;
		},
	},
});

export const CounterReducer = CounterSlice.reducer;
export const { increment, decrement, reset, incrementByValue } =
	CounterSlice.actions;
