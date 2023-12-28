import { PayloadAction, createSlice } from '@reduxjs/toolkit';

export interface CartItem {
	quantity: number;
	listPrice: number;
	id: number;
	productName: string;
}

export interface CartState {
	items: CartItem[];
	totalPrice: number;
}

const initialCartState: CartState = {
	items: [],
	totalPrice: 0,
};

const calculateTotal = (state: CartState) => {
	let total = 0;
	state.items.forEach((item) => {
		total += Number(item.quantity * item.listPrice);
	});

	return total;
};

const CartSlice = createSlice({
	name: 'CART',
	initialState: initialCartState,
	reducers: {
		addToCart: (state: CartState, action: PayloadAction<CartItem>) => {
			const itemExist = state.items.find((x) => x.id === action.payload.id);
			if (itemExist) {
				itemExist.quantity += 1;
			} else {
				state.items = [...state.items, action.payload];
			}

			state.totalPrice = calculateTotal(state);
		},
		removeFromCart: (
			state: CartState,
			action: PayloadAction<{ id: number }>
		) => {
			const notRemovedItems = state.items.filter(
				(x) => x.id !== action.payload.id
			);
			state.items = [...notRemovedItems];
			state.totalPrice = calculateTotal(state);
		},
		updateQuantity: (
			state: CartState,
			action: PayloadAction<{ quantity: number; id: number }>
		) => {
			const existItem = state.items.find((x) => x.id === action.payload.id);
			if (existItem) {
				existItem.quantity = action.payload.quantity;
			}
			state.items = [...state.items];
		},
	},
});

export const CartReducer = CartSlice.reducer;
export const { addToCart, removeFromCart } = CartSlice.actions;
