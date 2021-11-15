import { useEffect, useState } from "react";
import ActiveQueryContainer from "../components/ActiveQueryContainer";
import Button from "../components/Button";
import Dialog from "../components/Dialog";
import Dropdown from "../components/Dropdown";
import PageTitle from "../components/PageTitle";
import { conditionOptions } from "../utils/conditionOptions";
import { criteriaOptions } from "../utils/criteriaOptions";
import { fieldOptions } from "../utils/fieldOptions";
import { getRuleObject, queryGenerator } from "../utils/queryGenerator";
export default function Home() {
	const [visible, setVisible] = useState({
		dialog: false,
		queryOutput: false,
	});
	const [query, setQuery] = useState({
		field: null,
		condition: null,
		criteria: null,
	});
	const [queryRuleObj, setQueryRuleObj] = useState(null);
	const [value, setValue] = useState({
		field: null,
		condition: null,
		criteria: null,
	});
	const [error, setError] = useState({
		field: null,
		condition: null,
		criteria: null,
	});
	const [activeQueries, setActiveQueries] = useState([]);
	const [queryString, setQueryString] = useState(null);
	const resetState = () => {
		setError({
			field: null,
			condition: null,
			criteria: null,
		});
		setValue({
			field: null,
			condition: null,
			criteria: null,
		});
		setQuery({
			query: null,
			condition: null,
			criteria: null,
		});
		setQueryString(null);
		setVisible((prev) => {
			return {
				...prev,
				queryOutput: false,
			};
		});
	};
	useEffect(() => {
		if (queryString) {
			setVisible((prev) => {
				return { ...prev, queryOutput: true };
			});
		}
	}, [queryString]);
	const validateInputs = () => {
		let valid = true;
		if (!query.field) {
			setError((prev) => {
				return {
					...prev,
					field: true,
				};
			});
			valid = false;
		}
		if (!query.condition) {
			setError((prev) => {
				return {
					...prev,
					condition: true,
				};
			});
			valid = false;
		}
		if (!query.criteria) {
			setError((prev) => {
				return {
					...prev,
					criteria: true,
				};
			});
			valid = false;
		}
		if (valid) {
			setError({
				field: false,
				condition: false,
				criteria: false,
			});
		}
		return valid;
	};
	return (
		<div className='flex w-full px-16 py-10 h-screen'>
			<PageTitle title={"Build Query"} />
			<div className='flex w-1/5 flex-col'>
				<div className='flex'>
					<img src='/filter-icon.png' alt='filter' className='w-5 h-5 mr-3' />
					<span className='text-large text-white font-semibold'>Build your query</span>
				</div>
				<p className='text-medium text-gray-400 mt-3'>
					{" "}
					Narrow down further searches by applying some filters
				</p>
				<Button
					onClick={() => {
						setVisible((prev) => {
							return {
								...prev,
								dialog: true,
							};
						});
					}}
					label='Build Query'
					className='my-3'
				/>
				{activeQueries.length > 0 ? (
					<>
						<span className='mt-4 font-large text-white text-large mb-2'>Active Queries</span>
						{activeQueries.map((queryObj) => {
							return (
								<ActiveQueryContainer
									className='mb-3'
									query={queryObj.query}
									onDelete={() => {
										setActiveQueries((prev) => {
											console.log(prev);
											const update = prev.filter((prevQueryObj) => {
												return prevQueryObj.ID !== queryObj.ID;
											});
											console.log(update);
											return update;
										});
									}}
								/>
							);
						})}
					</>
				) : null}
			</div>
			<div className='flex w-4/5 pl-8 flex-col'>
				<div className='flex w-full'>
					<input
						type='text'
						className='bg-background-light py-2 px-4 w-2/5 mr-3'
						placeholder='Search for product feedback'
					/>
					<Button
						icon={true}
						imgPath='/download-icon.png'
						imgDesc='Export Feedback'
						type='dark'
						label='Export Feedback'
						className='  mx-3'
					/>
					<Button label='View Feedback' className='  mx-3' />
					<Button
						icon={true}
						imgPath='/calendar-icon.png'
						imgDesc='Select Date'
						label='Select Date'
						type='dark'
						className='  ml-3'
					/>
				</div>
				<div className='border-gray-400 border-2 rounded-default h-28 bg-background-light mb-4 mt-10'></div>
				<div className='border-gray-400 border-2 rounded-default h-28 bg-background-light my-4'></div>
				<div className='border-gray-400 border-2 rounded-default h-28 bg-background-light my-4'></div>
			</div>
			<Dialog
				onProgress={() => {
					setVisible((prev) => {
						return {
							...prev,
							dialog: false,
						};
					});
					setActiveQueries((prev) => {
						const prevActive = prev;
						prevActive.push({
							ID: prev.length + 1,
							query: queryString,
						});
						return prevActive;
					});
					resetState();
				}}
				visible={visible.dialog}
				onHide={() => {
					setVisible((prev) => {
						return {
							...prev,
							dialog: false,
						};
					});
					resetState();
				}}
				heading='Create Tag and Query'
				subHeading='The query you build will be saved in your active view'
			>
				<div className='px-1 h-1/5 w-90% mt-12 self-center bg-background-light flex items-center'>
					<Dropdown
						error={error.field}
						categories={true}
						fieldName='Field'
						value={value.field}
						options={fieldOptions}
						className='w-1/3 mx-3'
						onChange={(e) => {
							console.log(e.target);
							setValue((prev) => {
								return {
									...prev,
									field: e.target.innerText,
								};
							});
							setQuery((prev) => {
								return {
									...prev,
									field: e.target.id,
								};
							});
						}}
						placeholder='Select field'
					/>
					<Dropdown
						error={error.condition}
						categories={false}
						fieldName='Condition'
						value={value.condition}
						options={conditionOptions}
						className='w-1/3 mx-3'
						onChange={(e) => {
							setValue((prev) => {
								return {
									...prev,
									condition: e.target.innerText,
								};
							});
							setQuery((prev) => {
								return {
									...prev,
									condition: e.target.id,
								};
							});
						}}
						placeholder='Select condition'
					/>
					<Dropdown
						value={value.criteria}
						error={error.criteria}
						categories={false}
						fieldName='Criteria'
						options={criteriaOptions}
						className='w-1/3 mx-3'
						onChange={(e) => {
							console.log(e.target);
							setValue((prev) => {
								return {
									...prev,
									criteria: e.target.innerText,
								};
							});
							setQuery((prev) => {
								return {
									...prev,
									criteria: e.target.id,
								};
							});
						}}
						placeholder='Select criteria'
					/>
				</div>
				<Button
					label='Generate Query'
					onClick={() => {
						const valid = validateInputs();
						if (valid) {
							const generatedQUery = queryGenerator(query);
							const generatedRuleObject = getRuleObject(query);
							setQueryString(generatedQUery);
							setQueryRuleObj(generatedRuleObject);
						}
					}}
					className='w-1/5 mt-4 ml-14 rounded-default'
				/>
				{visible.queryOutput ? (
					<div className='w-90% self-center mt-8 bg-primary  flex flex-col p-3 rounded-default'>
						<span className='text-large text-white mb-2'>Generated Query</span>
						<span className='text-medium text-white mb-4'>{queryString}</span>
						<span className='text-large text-white mb-2'>Generated Rule Object</span>
						{Object.keys(queryRuleObj).map((key) => {
							return (
								<span className='text-medium text-white mb-2'>{`${key}: ${queryRuleObj[key]}`}</span>
							);
						})}
					</div>
				) : null}
			</Dialog>
		</div>
	);
}
{
	/* <div>
	Icons made by{" "}
	<a href='https://www.flaticon.com/authors/debi-alpa-nugraha' title='Debi Alpa Nugraha'>
		Debi Alpa Nugraha
	</a>{" "}
	from{" "}
	<a href='https://www.flaticon.com/' title='Flaticon'>
		www.flaticon.com
	</a>
</div>; */
}
{
	/* <div>
	Icons made by{" "}
	<a href='https://www.freepik.com' title='Freepik'>
		Freepik
	</a>{" "}
	from{" "}
	<a href='https://www.flaticon.com/' title='Flaticon'>
		www.flaticon.com
	</a>
</div>; */
}
