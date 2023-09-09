export const pickQueryParams = <
	T extends Record<string, unknown>,
	K extends keyof T
>(
	obj: T,
	keys: K[]
): Record<string, unknown> => {
	const finalObject: Record<string, unknown> = {};

	for (const key of keys) {
		const lowerCase: string = String(key).toLowerCase();

		if (obj) {
			const isKeyExist = Object.keys(obj).find(
				(key: string) => key.toLowerCase() === lowerCase
			);

			if (isKeyExist) {
				finalObject[lowerCase] = obj[lowerCase];
			}
		}
	}

	return finalObject;
};
