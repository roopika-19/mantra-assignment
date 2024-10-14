import _, { size } from 'lodash';
import { useCallback, useEffect } from 'react';
import { getBookId, getBooks } from './apis/books/books.api';
import { getChapterId } from './apis/chapters/chapters.api';
import Reader from './pages/reader';
import { useBookStore } from './stores/books.store';
import { useUserStore } from './stores/user.store';
import { ErrorBoundary } from 'react-error-boundary';

function App() {
	const bookStore = useBookStore();
	const userStore = useUserStore();

	const initUserStore = useCallback(async () => {
		const allBooks = bookStore.allBooks;

		if (!_.isEmpty(allBooks)) {
			userStore.setCurrentBookId(allBooks[0].id);
			const firstChapter = await getChapterId({ chapterId: allBooks[0].chapter_ids[0] });

			if (!firstChapter.error) {
				userStore.setAllChapters(firstChapter.data.book.chapter_ids);
				userStore.setCurrentChapter(firstChapter.data);
				userStore.setTotalPageInChapter(size(firstChapter.data.pages));
			}
		}
	}, [bookStore]);

	const initBookStore = useCallback(async () => {
		const allBooks = await getBooks();
		if (!allBooks.error) {
			bookStore.setAllBooks(allBooks.data);
		}
	}, []);

	const handleChangeBook = async ({ id }: { id: number }) => {
		userStore.setCurrentBookId(id);
		const currentBook = await getBookId({ bookId: id });
		userStore.setAllChapters(currentBook.data.chapter_ids);
		const firstChapter = await getChapterId({ chapterId: currentBook.data.chapter_ids[0] });
		if (!firstChapter.error) {
			userStore.setCurrentChapter(firstChapter.data);
			userStore.setCurrentPageNumber(0);
			userStore.setTotalPageInChapter(size(firstChapter.data.pages));
		}
	};

	const handleChangeChapter = async ({ id, moveToLast }: { id: number; moveToLast?: boolean }) => {
		const currentChapter = await getChapterId({ chapterId: id });
		if (!currentChapter.error) {
			userStore.setCurrentChapter(currentChapter.data);
			userStore.setCurrentPageNumber(!moveToLast ? 0 : _.size(currentChapter.data.pages) - 1);
			userStore.setTotalPageInChapter(_.size(currentChapter.data.pages));
		}
	};

	useEffect(() => {
		initBookStore();
	}, [initBookStore]);

	useEffect(() => {
		initUserStore();
	}, [bookStore]);

	return (
		<ErrorBoundary fallback={<div>Something went wrong</div>}>
			<div className="h-[99vh] w-[99vw] flex justify-center content-center">
				<div className="w-1/3 h-full flex flex-col gap-2">
					<Reader
						allBooks={_.get(bookStore, 'allBooks', [])}
						currentBookChapters={userStore.allChapters}
						currentChapter={userStore.currentChapter}
						currentPageNumber={_.get(userStore, 'currentPageNumber', 0)}
						totalPageNumber={_.get(userStore, 'totalPageInChapter', 0)}
						changeBookHandler={handleChangeBook}
						changeChapterHandler={handleChangeChapter}
						nextPage={userStore.nextPage}
						previousPage={userStore.previousPage}
					/>
				</div>
			</div>
		</ErrorBoundary>
	);
}

export default App;
