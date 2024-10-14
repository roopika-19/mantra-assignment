import axios from 'axios';
import { API_URL } from '../../utils/constants';
import { IAPIResponse } from '../../interfaces/apis/apiResponse.interface';
import { handleAxiosError } from '../utils';
import { IChapter } from '../../interfaces/apis/chaptersResponse.interface';
import _ from 'lodash';
import { CHAPTERS } from '../../utils/apiData';

export const getChapterId = async ({ chapterId }: { chapterId: number }): Promise<IAPIResponse> => {
	// Comment this is CORS error
	try {
		const url = `${API_URL}/chapters/${chapterId}`;
		const result = await axios.get(url);
		return {
			code: result.status,
			data: result.data as IChapter,
		};
	} catch (e) {
		return handleAxiosError(e);
	}
	// Comment this is CORS error

	return {
		code: 200,
		data: _.get(CHAPTERS, `${chapterId}`),
	};
};
