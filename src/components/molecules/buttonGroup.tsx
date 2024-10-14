import _ from 'lodash';
import { Button } from '../atoms/button';

interface KeyValue {
	id: number;
	title: string;
}

interface Props {
	data: KeyValue[];
	activeId: any;
	clickHandler: ({ id }: { id: number }) => any;
}

export const ButtonGroup = (props: Props) => {
	const { data, activeId, clickHandler } = props;

	return (
		<div className="flex gap-1 h-fit justify-center align-middle content-center">
			{data &&
				data.map((ele) => {
					return (
						<Button
							text={_.get(ele, 'title', '-')}
							id={_.get(ele, 'id', -1)}
							key={_.get(ele, 'id', -1)}
							active={_.get(ele, 'id', -1) === activeId}
							clickHandler={clickHandler}
						/>
					);
				})}
			{!data && 'Loading...'}
		</div>
	);
};
