export const getFieldName = (variableName, type) => {
	let name;
	if (type === "field") {
		name = `field.${variableName[0].toUpperCase()}`;
	} else {
		name = `\\"${variableName[0].toUpperCase()}`;
	}
	let prev = variableName[0];
	for (let i = 1; i < variableName.length; i++) {
		let curr = variableName[i];
		if (prev == prev.toLowerCase() && curr == curr.toUpperCase()) {
			name += ` ${curr}`;
		} else {
			name += curr;
		}
		prev = curr;
	}
	if (type === "criteria") {
		name += `\"\\`;
	}
	return name;
};
export const queryGenerator = (query) => {
	const field = getFieldName(query.field, "field");
	const criteria = getFieldName(query.criteria, "criteria");
	let condition = null;
	switch (query.condition) {
		case "equals":
			condition = "==";
			break;
		case "notEqual":
			condition = "!=";
			break;
		case "like":
			condition = "like";
			break;
		case "notLike":
			condition = "not like";
			break;
		case "empty":
			condition = "is empty";
			break;
		case "exists":
			condition = "is";
			break;
		case "notExists":
			condition = "is not";
			break;
		case "gte":
			condition = ">=";
			break;
		case "lte":
			condition = "<=";
			break;
		case "contains":
			condition = "contains";
			break;
		default:
			condition = "==";
	}
	const queryString = `\"${field} ${condition} ${criteria}\"`;
	console.log(queryString);
	return queryString;
};

export const getConjunction = (conjunction) => {
	switch (conjunction) {
		case "AND":
			return "&&";
		case "OR":
			return "||";
		default:
			return "||";
	}
};
export const complexQueryGenerator = (ruleGroupObj, queryString) => {
	console.log(ruleGroupObj);
	const ruleObj = ruleGroupObj.children[ruleGroupObj.children.length - 1];
	console.log(ruleObj);
	const negate = ruleGroupObj.not;
	const conjunction = getConjunction(ruleGroupObj.conjunction);
	if (queryString === "") {
		queryString += queryGenerator(ruleObj);
	} else {
		queryString += ` ${conjunction} ${queryGenerator(ruleObj)}`;
	}
	return negate ? `!(${queryString})` : queryString;
};

export const getRuleObject = (query) => {
	if (query.field && query.condition && query.criteria) {
		return {
			field: query.field,
			condition: query.condition,
			value: query.criteria,
			queryString: queryGenerator(query),
			type: "rule",
		};
	}
};

export const getRuleGroupObject = (ruleGroupObj) => {
	return {
		children: ruleGroupObj.children.map((ruleObj) => {
			return getRuleObject(ruleObj);
		}),
		not: ruleGroupObj.not,
		conjunction: ruleGroupObj.conjunction,
		type: "rule_group",
	};
};
