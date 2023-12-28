import React, { useEffect, useMemo } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { ProductDto, fetchProductsState } from '../store/slices/ProductSlice';
import { AppDispatch, RootState } from '../store/store';
import moment from 'moment';

function ServerStateWithRedux() {
	const { isError, isFinished, data, loading, error, fetched, loadTime } =
		useSelector((state: RootState) => state.productState);

	if (isError) return <>Yükleme yapılırken hata oluştu</>;

	if (loading) return <>... Loading</>;

	if (fetched) {
		return (
			<>
				<p>load Time : {moment(loadTime).format('DD-MM-YYYY HH:mm')}</p>
				{data.map((item: ProductDto) => {
					return <div key={item.ProductID}>{item.ProductName}</div>;
				})}
			</>
		);
	}

	return <></>;
}

export default ServerStateWithRedux;
