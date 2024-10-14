interface Props {
	current: any;
	total: any;
}

export const Footer = (props: Props) => {
	const { current, total } = props;

	return (
		<div className="w-full flex justify-center content-center">
			{current}/{total}
		</div>
	);
};
