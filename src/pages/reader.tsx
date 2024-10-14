import { ButtonGroup } from '../components/molecules/buttonGroup';
import { Footer } from '../components/atoms/footer';
import { IBook } from '../interfaces/apis/booksResponse.interface';
import { ImageButton } from '../components/molecules/imageButton';
import _ from 'lodash';
import { IChapter } from '../interfaces/apis/chaptersResponse.interface';

interface Props {
	allBooks: IBook[];
	currentBookChapters: any[];
	currentChapter?: IChapter;
	currentPageNumber: number;
	totalPageNumber: number;
	changeBookHandler: ({ id }: { id: number }) => void;
	changeChapterHandler: ({ id, moveToLast }: { id: number; moveToLast?: boolean }) => void;
	nextPage: () => void;
	previousPage: () => void;
}

const Reader = (props: Props) => {
	const {
		allBooks,
		currentBookChapters,
		currentChapter,
		currentPageNumber,
		totalPageNumber,
		changeBookHandler,
		changeChapterHandler,
		nextPage,
		previousPage,
	} = props;

	const handlePageChange = ({ pageNumber }: { pageNumber: number }) => {
		if (pageNumber >= 0 && pageNumber < totalPageNumber) {
			if (pageNumber > currentPageNumber) nextPage();
			else if (pageNumber < currentPageNumber) previousPage();
		} else {
			const chapters = currentChapter?.book.chapter_ids;
			const currentChapterId = currentChapter?.id;
			if (pageNumber < 0) {
				const previousChapterIndex =
					(_.findIndex(chapters, (ele) => ele === currentChapterId) ?? 0) - 1;
				if (previousChapterIndex >= 0) {
					// @ts-ignore
					changeChapterHandler({ id: chapters[previousChapterIndex], moveToLast: true });
				}
			} else {
				const nextChapterIndex =
					(_.findIndex(chapters, (ele) => ele === currentChapterId) ?? 999) + 1;
				if (nextChapterIndex < _.size(chapters)) {
					// @ts-ignore
					changeChapterHandler({ id: chapters[nextChapterIndex] });
				}
			}
		}
	};

	return (
		<>
			<ButtonGroup
				data={allBooks}
				clickHandler={changeBookHandler}
				activeId={currentChapter?.book.id}
			/>
			<ButtonGroup
				data={currentBookChapters}
				clickHandler={changeChapterHandler}
				activeId={currentChapter?.id}
			/>
			<ImageButton
				imageUrl={currentChapter?.pages[currentPageNumber].image.file ?? ''}
				clickHandler={handlePageChange}
				leftId={currentPageNumber - 1}
				rightId={currentPageNumber + 1}
			/>
			<Footer current={currentPageNumber + 1} total={totalPageNumber} />
		</>
	);
};

export default Reader;
