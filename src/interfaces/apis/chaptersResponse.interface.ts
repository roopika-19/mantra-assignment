import { IBook } from './booksResponse.interface';

export interface IChapter {
	id: number;
	title: string;
	book: IBook;
	chapter_index: number;
	pages: IPage[];
}

export interface IPage {
	id: number;
	page_index: number;
	image: IImage;
}

export interface IImage {
	id: number;
	file: string;
	width: number;
	height: number;
	created_at: string;
	updated_at: string;
}
