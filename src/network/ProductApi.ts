import axios from 'axios';

const baseUrl: string = 'https://services.odata.org/northwind/northwind.svc';

export const fetchProducts = async () => {
	console.log('fetchProductsAPI');

	try {
		const response = (await axios.get(`${baseUrl}/Products?format=json`)).data;

		console.log('response', response.value);

		return response.value;
	} catch (error) {
		return Promise.reject(error);
	}
};
