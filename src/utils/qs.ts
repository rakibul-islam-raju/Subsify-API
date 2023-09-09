export const generateQueryString = (
	query: Record<string, string | number>
): string => {
	return Object.keys(query)
		.map(
			(key) => encodeURIComponent(key) + "=" + encodeURIComponent(query[key])
		)
		.join("&");
};
