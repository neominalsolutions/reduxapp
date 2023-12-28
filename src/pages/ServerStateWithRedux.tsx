import moment from 'moment';
import { useSelector } from 'react-redux';
import { ProductDto } from '../store/slices/ProductSlice';
import { RootState } from '../store/store';

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
