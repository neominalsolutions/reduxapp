import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../store/store';
import { removeFromCart } from '../store/slices/CartSlice';

function CartSummary() {
	const cartState = useSelector((state: RootState) => state.cartState);
	const dispatch = useDispatch();

	return (
		<div>
			{cartState && (
				<div>
					{cartState.items.map((item) => {
						return (
							<div>
								{item.productName} : Adet {item.quantity} Fiyat:{' '}
								{item.listPrice}{' '}
								<button
									onClick={() => {
										dispatch(removeFromCart({ id: item.id }));
									}}
								>
									Sil
								</button>
							</div>
						);
					})}
				</div>
			)}
			<div>Total: {cartState.totalPrice}</div>
		</div>
	);
}

export default CartSummary;
