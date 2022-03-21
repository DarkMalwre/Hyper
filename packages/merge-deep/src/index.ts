/**
 *
 * @param baseObject
 * @param secondary
 */
export default function mergeDeep<BaseType, SecondaryType>(baseObject: BaseType, secondary: SecondaryType) {
	const result: BaseType = {};

	const recursiveTravel = (innerObject: any) => {
		const properties = Object.keys(innerObject);
		const result = {} as any;

		properties.forEach((property) => {
			if (typeof innerObject[property] === 'object' && !Array.isArray(innerObject[property])) {
				result[property] = recursiveTravel(innerObject[property]);
			} else {
				result[property] = innerObject[property];
			}
		});

		return result;
	};

	return recursiveTravel(baseObject);
}
