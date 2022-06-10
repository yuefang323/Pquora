import { formatRelative, parseISO } from "date-fns";

const UpdatedAt = ({ updated_at }) => {
	if (updated_at) {
		return (
			<div className="updated-at">
				{formatRelative(parseISO(updated_at), new Date())}
			</div>
		);
	} else {
		return <div className="updated-at"></div>;
	}
};

export default UpdatedAt;