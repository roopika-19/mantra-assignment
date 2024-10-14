import axios from 'axios';
import { API_URL } from '../../utils/constants';
import { IAPIResponse } from '../../interfaces/apis/apiResponse.interface';
import { handleAxiosError } from '../utils';
import { IBook } from '../../interfaces/apis/booksResponse.interface';
import _ from 'lodash';
import { BOOKS } from '../../utils/apiData';

export const getBooks = async (): Promise<IAPIResponse> => {
	// Comment this is CORS error
	try {
		const url = `${API_URL}/books`;
		const result = await axios.get(url);

		return {
			code: result.status,
			data: result.data as IBook[],
		};
	} catch (e) {
		return handleAxiosError(e);
	}
	// Comment this is CORS error

	return {
		code: 200,
		data: BOOKS as IBook[],
	};
};

export const getBookId = async ({ bookId }: { bookId: number }): Promise<IAPIResponse> => {
	// Comment this is CORS error
	try {
		const url = `${API_URL}/books/${bookId}`;
		const result = await axios.get(url);
		return {
			code: result.status,
			data: result.data as IBook,
		};
	} catch (e) {
		return handleAxiosError(e);
	}
	// Comment this is CORS error

	return {
		code: 200,
		data: _.find(BOOKS, (ele) => ele.id === bookId) as IBook,
	};
};
