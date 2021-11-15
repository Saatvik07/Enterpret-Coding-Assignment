import React from "react";
import { conditionOptions } from "../utils/conditionOptions";
import { criteriaOptions } from "../utils/criteriaOptions";
import { fieldOptions } from "../utils/fieldOptions";
import Dropdown from "./Dropdown";
function QueryComponent({ error, value, onFieldChange, onConditionChange, onCriteriaChange }) {
	return (
		<div className='w-full flex my-4'>
			<Dropdown
				error={error?.field}
				categories={true}
				fieldName='Field'
				value={value.field}
				options={fieldOptions}
				className='w-1/3 mx-3'
				onChange={(e) => {
					onFieldChange(e);
				}}
				placeholder='Select field'
			/>
			<Dropdown
				error={error?.condition}
				categories={false}
				fieldName='Condition'
				value={value.condition}
				options={conditionOptions}
				className='w-1/3 mx-3'
				onChange={(e) => {
					onConditionChange(e);
				}}
				placeholder='Select condition'
			/>
			<Dropdown
				value={value.criteria}
				error={error?.criteria}
				categories={false}
				fieldName='Criteria'
				options={criteriaOptions}
				className='w-1/3 mx-3'
				onChange={(e) => {
					onCriteriaChange(e);
				}}
				placeholder='Select criteria'
			/>
		</div>
	);
}

export default QueryComponent;
