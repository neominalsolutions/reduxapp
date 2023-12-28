import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { fetchProducts } from '../../network/ProductApi';

export interface ProductDto {
	ProductID: number;
	ProductName: string;
	UnitPrice: number;
}

export type ProductState = {
	data: ProductDto[]; // yüklenen server state veriyi temsil eder
	selectedItem: ProductDto | null; // yüklenen veri üzerindeki seçimi temsil eder.
	fetched: boolean; // verinin success olarak yüklendiği anı temsil eder.
	isError: boolean; // yükleme sırasında hatayı temsil eder.
	error: any; // yükleme sırasındaki hata durumu
	loading: boolean; // yükleme zamanının başlangıç ve bitişini takip etmeyi temsil eder.
	isFinished: boolean;
	loadTime?: Date;
};

// server state bir veri olduğu için ilk load işlemi Thunk middleware ile olucak.
// dispatch edilecek olan asenkron state bunu dispatch edince server state client state dönmüş olucak
export const fetchProductsState = createAsyncThunk(
	'PRODUCTS_FETCH',
	async () => {
		return await fetchProducts();
	}
);

const productInitialState: ProductState = {
	data: [],
	selectedItem: null,
	fetched: false,
	isError: false,
	error: null,
	loading: false,
	isFinished: false,
};

const ProductSlice = createSlice({
	name: 'PRODUCTS',
	initialState: productInitialState,
	reducers: {
		select: (state: ProductState, action: any) => {
			state.selectedItem = action.payload;
		}, // seçim state'i productlar asenkron olarak yüklendikten sonra bu state üzerinden yüklü productlara ait seçim yapılabilir.
	},
	extraReducers(builder) {
		// asenkron işlemlerde kullanılan reducer type
		builder.addCase(
			// promise.resolve anı
			fetchProductsState.fulfilled, // fetchTodosState success olup verinin çekildiğine emin olduğumuz an
			(state: ProductState, action: any) => {
				// action.payload; apiden dönen result olucak.
				state.data = [...action.payload];
				state.fetched = true;
				state.loading = false;
				state.loadTime = new Date();
			}
		);
		builder.addCase(
			fetchProductsState.rejected, // verinin çekilemediği an promise.reject
			(state: ProductState, action: any) => {
				state.isError = true;
				state.fetched = false;
				state.data = [];
				state.error = { ...action.payload };
				state.loading = false;
			}
		);
		builder.addCase(
			fetchProductsState.pending,
			(state: ProductState, action: any) => {
				// promise.pending
				state.loading = true;
			}
		);
		builder.addMatcher(
			fetchProductsState.settled,
			(state: ProductState, action: any) => {
				// error veya success durumu farketmeksizin yapılacak olan işlemlerin state güncellemeleri bu kısımda işlenir.
				state.isFinished = true;
				state.loading = false;
			}
		);
	},
});

// Extra reducers yapısı veri çekerken kendi içinde çalışır bu methodlar dışarıdan tetiklenmez.

export const ProductReducer = ProductSlice.reducer;
export const { select } = ProductSlice.actions;
// export edilecek olanlar reducer altındaki actionlar.
