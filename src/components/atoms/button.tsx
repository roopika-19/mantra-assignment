interface Props {
	text: string;
	id: number;
	active: boolean;
	clickHandler: ({ id }: { id: number }) => any;
}

export const Button = (props: Props) => {
	const { text, id, active, clickHandler } = props;

	const handleClick = () => {
		clickHandler({ id });
	};

	return (
		<button
			onClick={handleClick}
			className={`${!active ? 'bg-slate-200' : 'bg-green-400'} border-2 border-black rounded-sm`}
		>
			{text}
		</button>
	);
};
