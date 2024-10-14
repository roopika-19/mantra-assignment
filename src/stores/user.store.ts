import { create } from 'zustand';
import { IChapter } from '../interfaces/apis/chaptersResponse.interface';
import _ from 'lodash';

interface IUserStore {
	currentBookId: number | undefined;
	currentChapter: IChapter | undefined;
	currentPageNumber: number | undefined;
	totalPageInChapter: number | undefined;
	allChapters: any[];

	setCurrentBookId: (currentBookId: number) => void;
	setCurrentChapter: (currentChapter: IChapter) => void;
	setCurrentPageNumber: (currentPageNumber: number) => void;
	setTotalPageInChapter: (totalPageInChapter: number) => void;
	setAllChapters: (chapters: number[]) => void;

	nextPage: () => void;
	previousPage: () => void;
}

export const useUserStore = create<IUserStore>((set, get) => ({
	currentBookId: undefined,
	currentChapter: undefined,
	currentPageNumber: 0,
	totalPageInChapter: undefined,
	allChapters: [],

	setCurrentBookId: (currentBookId: number) => set({ currentBookId }),
	setCurrentChapter: (currentChapter: IChapter) => set({ currentChapter }),
	setCurrentPageNumber: (currentPageNumber: number) => set({ currentPageNumber }),
	setTotalPageInChapter: (totalPageInChapter: number) => set({ totalPageInChapter }),
	setAllChapters: (chapters: number[]) => {
		set({
			allChapters: _.map(chapters, (ele, index) => {
				return {
					id: ele,
					title: index + 1,
				};
			}),
		});
	},

	nextPage: () => {
		const currentPage = get().currentPageNumber ?? 0;
		set({ currentPageNumber: currentPage + 1 });
	},
	previousPage: () => {
		const currentPage = get().currentPageNumber ?? 0;
		set({ currentPageNumber: currentPage - 1 });
	},
}));
