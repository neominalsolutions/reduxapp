import React, { useEffect, useState } from 'react';
import { useQuery } from 'react-query';
import { fetchProducts } from '../network/ProductApi';
import { ProductDto } from '../store/slices/ProductSlice';

function ServerStateReactQuery() {
	// key değerine göre refetch etme, yada çekilen verinin cache bozma gibi işlemler için kullanılıyor.

	const [index, setIndex] = useState<number>(1);

	// Hooklar sadece ana function içinden çalıştırılabilirler.

	const onMyClick = (nm: number) => {
		setIndex(nm);
	};

	// const loadData = () => {
	// method if blokları içinde hook kullanamayız
	//        const result = useQuery({
	// 						queryKey: ['data', index],
	// 						queryFn: () => {
	// 							return { id: 1 };
	// 						},
	// 					});
	// }
	// const result = useQuery({
	// 		queryKey: ['data',index],
	// 		queryFn: () => {
	// 			return { id: 1 };
	// 		},
	// 	});

	// useEffect(() => {
	// Hook içinde hook çağıramayız
	// }, [index]);

	// 2.adım
	const { data, isSuccess, isLoading, isFetched, isFetching, error, refetch } =
		useQuery({
			queryKey: ['FETCH_PRODUCTS', index], // dependecy index, state ile query cache key invalid oldu
			queryFn: async () => {
				return await fetchProducts();
			},
			onSuccess(data: ProductDto[]) {
				console.log('success', data);
				// toaster, swal message
			},
			onError(err) {
				console.log('err', err);
				// toastr ile mesaj atma
			},
			onSettled(data, error) {
				console.log('hata olsun olması çalışan kod blogu', data, error);
				// socket.terminate();
			},
			// cacheTime default 5dk cacheden çalışır, ms cinsinden değer atanabilir.
			//refetchInterval: 3000, // her 3 snyede bir veri güncelle, bayat datayı güncelle (pooling)
			retry: false, // eğer api call yapılrıken timeout düşerse yada bağlantı kesilirse arka arkaya 3 kere istek at.
			// retryDelay: 3000, // 3s bekletip yeni 3 kez üst üste istek
			// retryDelay(count: number, error: any) {
			// 	console.log('retryDelay', error);
			// 	return count;
			// },
		});

	if (isLoading) return <>... Loading</>;

	if (isFetched && isSuccess) {
		return (
			<div>
				<button
					onClick={() => {
						refetch();
					}}
				>
					{/* Yeniden veriyi sıfıran çeker */}
					Refetch (Manuel Cache Bozma)
				</button>
				<p>Number: {index}</p>
				<button
					onClick={(e: any) => {
						const random = Math.round(Math.random() * 100);
						onMyClick(random);
					}}
				>
					Set Number
				</button>
				<hr></hr>
				{data.map((item: ProductDto) => {
					return (
						<div key={item.ProductID}>
							{item.ProductName}
							<button
								onClick={() => {
									//dispath Sepete ekle
								}}
							>
								Sepete Ekle
							</button>
						</div>
					);
				})}
			</div>
		);
	}

	return <div></div>;
}

export default ServerStateReactQuery;
