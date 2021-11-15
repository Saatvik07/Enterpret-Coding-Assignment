import { useEffect, useState } from "react";
import ActiveQueryContainer from "../components/ActiveQueryContainer";
import Button from "../components/Button";
import Dialog from "../components/Dialog";
import Dropdown from "../components/Dropdown";
import PageTitle from "../components/PageTitle";
import { complexQueryGenerator, getRuleObject, queryGenerator } from "../utils/queryGenerator";
import Link from "next/link";
import QueryComponent from "../components/QueryComponent";
export default function Complex() {
	const [visible, setVisible] = useState({
		dialog: false,
		info: false,
	});
	const [infoQuery, setInfoQuery] = useState({});
	const [currentID, setCurrentID] = useState(1);
	const [query, setQuery] = useState(() => {
		const initialStateInner = {
			children: [
				{
					field: null,
					condition: null,
					criteria: null,
				},
			],
			conjunction: "AND",
			not: false,
			query: "",
		};
		const initialState = {};
		initialState[`query${currentID}`] = initialStateInner;
		return initialState;
	});
	const [conjunction, setConjunction] = useState("AND");
	const [value, setValue] = useState(() => {
		const initialState = {};
		initialState[`query${currentID}`] = [
			{
				field: null,
				condition: null,
				criteria: null,
			},
		];
		return initialState;
	});
	const [negate, setNegate] = useState(false);
	const [queryString, setQueryString] = useState("");
	const resetState = () => {
		setConjunction("AND");
		setNegate(false);
		// setCurrentID(currentID + 1);
		setQuery((prev) => {
			const initialStateInner = {
				children: [
					{
						field: null,
						condition: null,
						criteria: null,
					},
				],
				conjunction: "AND",
				not: false,
				query: "",
			};
			const initialState = { ...prev };
			initialState[`query${currentID}`] = initialStateInner;
			return initialState;
		});
		setValue((prev) => {
			const initialState = { ...prev };
			initialState[`query${currentID}`] = [
				{
					field: null,
					condition: null,
					criteria: null,
				},
			];
			return initialState;
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
		setQuery((prev) => {
			const newObj = { ...prev };
			newObj[`query${currentID}`].conjunction = conjunction;
			return newObj;
		});
	}, [conjunction]);
	useEffect(() => {
		setQuery((prev) => {
			const newObj = { ...prev };
			newObj[`query${currentID}`].not = negate;
			return newObj;
		});
	}, [negate]);
	return (
		<div className='flex w-full px-16 py-10 h-screen'>
			<PageTitle title={"Build Complex Query"} />
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
					label='Build Complex Query'
					className='my-3'
				/>
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
				{Object.values(query).length > 1
					? Object.values(query).map((queryObj) => {
							if (queryObj.query) {
								return (
									<div className='w-full bg-primary text-white p-4 my-4 flex justify-between'>
										<p className='text-medium w-90%'>{queryObj.query}</p>
										<img
											src='/info-icon.png'
											alt='Rule Group Object Info'
											className='w-5 h-5 cursor-pointer'
											onClick={() => {
												setInfoQuery(queryObj);
												setVisible((prev) => {
													return {
														...prev,
														info: true,
													};
												});
											}}
										/>
									</div>
								);
							}
							return null;
					  })
					: null}
			</div>
			<Dialog
				onProgress={() => {
					let generatedQUery = null;
					console.log(currentID);
					if (
						query[`query${currentID}`].children[query[`query${currentID}`].children.length - 1]
							.condition &&
						query[`query${currentID}`].children[query[`query${currentID}`].children.length - 1]
							.criteria &&
						query[`query${currentID}`].children[query[`query${currentID}`].children.length - 1]
							.field &&
						query[`query${currentID}`].query === ""
					) {
						const prevQuery = query[`query${currentID}`];
						generatedQUery = complexQueryGenerator(prevQuery, queryString);
						setQueryString(generatedQUery);
					}

					setCurrentID(currentID + 1);
					setConjunction("AND");
					setNegate(false);
					setQuery((prev) => {
						const initialStateInner = {
							children: [
								{
									field: null,
									condition: null,
									criteria: null,
								},
							],
							conjunction: "AND",
							not: false,
							query: "",
						};
						const initialState = { ...prev };
						console.log(initialState, currentID);
						initialState[`query${currentID}`].query = generatedQUery ? generatedQUery : queryString;
						initialState[`query${currentID + 1}`] = initialStateInner;
						return initialState;
					});
					setValue((prev) => {
						const initialState = { ...prev };
						initialState[`query${currentID + 1}`] = [
							{
								field: null,
								condition: null,
								criteria: null,
							},
						];
						return initialState;
					});
					setQueryString("");
					setVisible((prev) => {
						return {
							...prev,
							dialog: false,
						};
					});
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
				subHeading={`Query: ${queryString}`}
			>
				<div className='w-2/5 ml-14 mt-8 flex'>
					<div className='w-3/5 flex'>
						<Button
							onClick={() => {
								setConjunction("AND");
							}}
							label='AND'
							type={conjunction === "AND" ? "primary" : "dark"}
						/>
						<Button
							onClick={() => {
								setConjunction("OR");
							}}
							label='OR'
							type={conjunction === "OR" ? "primary" : "dark"}
						/>
					</div>
					<Button
						label='NOT'
						onClick={() => {
							setNegate(!negate);
						}}
						type={negate ? "primary" : "dark"}
					/>
				</div>
				<div className={`px-1 mt-4 w-90% self-center bg-background-light flex flex-col`}>
					{query[`query${currentID}`]?.children.map((ruleObj, idx) => {
						return (
							<QueryComponent
								value={value[`query${currentID}`][idx]}
								onFieldChange={(e) => {
									setValue((prev) => {
										const prevValue = value[`query${currentID}`][idx];
										const newObj = { ...prev };
										newObj[`query${currentID}`][idx] = {
											...prevValue,
											field: e.target.innerText,
										};
										return newObj;
									});
									setQuery((prev) => {
										console.log(prev, idx);
										const prevValue = query[`query${currentID}`].children[idx];
										const newObj = { ...prev };
										newObj[`query${currentID}`].children[idx] = {
											...prevValue,
											field: e.target.id,
										};
										return newObj;
									});
								}}
								onConditionChange={(e) => {
									setValue((prev) => {
										const prevValue = value[`query${currentID}`][idx];
										const newObj = { ...prev };
										newObj[`query${currentID}`][idx] = {
											...prevValue,
											condition: e.target.innerText,
										};
										return newObj;
									});
									setQuery((prev) => {
										console.log(prev, idx);
										const prevValue = query[`query${currentID}`].children[idx];
										const newObj = { ...prev };
										newObj[`query${currentID}`].children[idx] = {
											...prevValue,
											condition: e.target.id,
										};
										return newObj;
									});
								}}
								onCriteriaChange={(e) => {
									setValue((prev) => {
										const prevValue = value[`query${currentID}`][idx];
										const newObj = { ...prev };
										newObj[`query${currentID}`][idx] = {
											...prevValue,
											criteria: e.target.innerText,
										};
										return newObj;
									});
									setQuery((prev) => {
										console.log(prev, idx);
										const prevValue = query[`query${currentID}`].children[idx];
										const newObj = { ...prev };
										newObj[`query${currentID}`].children[idx] = {
											...prevValue,
											criteria: e.target.id,
										};
										return newObj;
									});
								}}
							/>
						);
					})}
				</div>
				<Button
					label='Add filter'
					onClick={() => {
						const prevQuery = query[`query${currentID}`];
						const generatedQUery = complexQueryGenerator(prevQuery, queryString);
						setQueryString(generatedQUery);
						setQuery((prev) => {
							const queryID = `query${currentID}`;
							const prevValue = query[`query${currentID}`];
							const prevChildren = prevValue.children;
							prevChildren.push({
								field: null,
								condition: null,
								criteria: null,
							});
							const newObj = { ...prev };
							newObj[queryID] = {
								children: prevChildren,
								...prevValue,
							};
							return newObj;
						});
						setValue((prev) => {
							const prevValue = value[`query${currentID}`];
							prevValue.push({
								field: null,
								condition: null,
								criteria: null,
							});
							const newObj = { ...prev };
							newObj[`query${currentID}`] = prevValue;
							return newObj;
						});
					}}
					className='w-1/5 mt-4 ml-14 rounded-default'
				/>
			</Dialog>
			<Dialog
				visible={visible.info}
				onHide={() => {
					setVisible((prev) => {
						return {
							...prev,
							info: false,
						};
					});
				}}
				onProgress={() => {
					setVisible((prev) => {
						return {
							...prev,
							info: false,
						};
					});
				}}
				heading='Query String'
				subHeading={`${infoQuery?.query}`}
			>
				<div className='w-90% self-center flex flex-col bg-primary mt-8 p-4'>
					<span className='text-large text-white mb-2'>RULE GROUP OBJECT</span>
					{Object.keys(infoQuery).map((key) => {
						if (key !== "children") {
							return (
								<span className='text-large text-white mb-2'>{`${key.toUpperCase()}: ${
									infoQuery[key]
								}`}</span>
							);
						} else {
							return infoQuery[key].map((ruleObj, idx) => {
								const generatedRuleObject = getRuleObject(ruleObj);
								return (
									<div className='p-1  flex flex-col'>
										{generatedRuleObject ? (
											<>
												<span className='text-large text-white mb-1'>{`Child ${idx + 1}`}</span>

												{Object.keys(generatedRuleObject).map((key) => {
													return (
														<span className='text-medium text-white mb-1 ml-3'>{`${key}: ${generatedRuleObject[key]}`}</span>
													);
												})}
											</>
										) : null}
									</div>
								);
							});
						}
					})}
				</div>
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
