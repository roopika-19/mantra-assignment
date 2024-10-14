interface Props {
	leftId?: number;
	rightId?: number;
	imageUrl: string;

	clickHandler: ({ pageNumber }: { pageNumber: number }) => void;
}

export const ImageButton = (props: Props) => {
	const { leftId, rightId, imageUrl, clickHandler } = props;

	const handleClick = (id: number) => {
		clickHandler({ pageNumber: id });
	};

	return (
		<div className="relative h-full w-full">
			<img className="h-full w-full absolute -z-10" src={imageUrl} />
			<div className="flex h-full z-10">
				<button
					id="left"
					onClick={() => {
						handleClick(leftId ?? 0);
					}}
					className="bg-transparent h-full w-full"
				/>
				<button
					id="right"
					onClick={() => {
						handleClick(rightId ?? 0);
					}}
					className="bg-transparent h-full w-full"
				/>
			</div>
		</div>
	);
};
