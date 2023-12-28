import axios from 'axios';

const baseUrl: string = 'https://services.odata.org/northwind/northwind.svc';

export const fetchProducts = async () => {
	console.log('fetchProducts');

	try {
		const response = (await axios.get(`${baseUrl}/Products?format=json`)).data;

		return response.value;
	} catch (error) {
		return Promise.reject(error);
	}
};
