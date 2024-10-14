import { AxiosError } from 'axios';
import { IAPIResponse } from '../interfaces/apis/apiResponse.interface';

export const handleAxiosError = (e: any): IAPIResponse => {
	const error = e as AxiosError;
	return {
		error: true,
		code: error.status,
		message: error.message,
	};
};
