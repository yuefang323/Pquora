import { formatRelative, parseISO } from "date-fns";

const CreatedAt = ({ created_at }) => {
	if (created_at) {
		return (
			<div className="created-at">
				{formatRelative(parseISO(created_at), new Date())}
			</div>
		);
	} else {
		return <div className="created-at"></div>;
	}
};

export default CreatedAt;