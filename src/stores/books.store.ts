import { create } from 'zustand';
import { IBook } from '../interfaces/apis/booksResponse.interface';
import _ from 'lodash';

interface IBookStore {
	allBooks: IBook[];

	setAllBooks: (books: IBook[]) => void;
}

export const useBookStore = create<IBookStore>((set) => ({
	allBooks: [],

	setAllBooks: (books: IBook[]) => set({ allBooks: books }),
}));
