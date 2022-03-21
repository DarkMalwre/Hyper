/**
 * Extend a base object, this is primary used for merging a default config with a user config.
 * @param baseObject The base object to extend.
 * @param secondary The object to extend with.
 * @returns The extended object.
 */
export default function mergeDeep<BaseType, SecondaryType>(baseObject: BaseType, secondary: SecondaryType) {
	const recursiveTravel = (innerObject: any, innerSecondaryObject: any) => {
		const properties = Object.keys(innerObject);
		const result = {} as any;

		properties.forEach((baseInner) => {
			const baseInnerValue = innerObject[baseInner];
			const secondaryInner = innerSecondaryObject[baseInner];

			if (typeof secondaryInner === 'object' && !Array.isArray(secondaryInner)) {
				result[baseInner] = recursiveTravel(baseInnerValue, secondaryInner);
			} else if (typeof secondaryInner !== 'undefined') {
				result[baseInner] = secondaryInner;
			} else {
				result[baseInner] = baseInnerValue;
			}
		});

		return result;
	};

	return recursiveTravel(baseObject, secondary);
}
