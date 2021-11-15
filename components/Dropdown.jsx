import React from "react";

function Dropdown({
	value,
	placeholder,
	categories = false,
	options,
	className,
	onChange,
	fieldName,
	error,
}) {
	return (
		<div className={`relative inline-block text-left dropdown ${className}`}>
			<span className='text-small text-white'>{fieldName}</span>
			<span className='rounded-md shadow-sm '>
				<button
					className='w-full px-4 py-2  font-medium  transition duration-150 ease-in-out bg-background-lighter  text-white rounded-md hover:text-gray-300 focus:outline-none focus:border-blue-300 focus:shadow-outline-blue flex justify-between'
					type='button'
				>
					<span>{value ? value : placeholder}</span>
					<svg className='w-5 h-5 ml-2 -mr-1' viewBox='0 0 20 20' fill='currentColor'>
						<path
							fill-rule='evenodd'
							d='M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z'
							clip-rule='evenodd'
						></path>
					</svg>
				</button>
			</span>
			{error ? (
				<span className='font-small text-red-500'>{`${fieldName} is mandatory`}</span>
			) : null}
			<div className='opacity-0 invisible dropdown-menu transition-all duration-300 transform origin-top-right -translate-y-2 scale-95'>
				<div className='absolute right-0 w-full mt-2  bg-background-light  rounded-md shadow-lg outline-none'>
					<div className='py-1 flex flex-col max-h-64 overflow-y-scroll'>
						{categories
							? options.map((optionObj) => {
									return (
										<div className='px-2 my-2 mx-2 text-gray-400 flex flex-col'>
											<span className='text-gray-400 mx-1 mb-2'>
												{optionObj.category.toUpperCase()}
											</span>

											{optionObj.options.map((optObj) => {
												return (
													<span
														id={optObj.value}
														className='py-1 px-3 my-1 w-full text-white hover:bg-background-lighter rounded-default cursor-pointer'
														onClick={(event) => {
															onChange(event);
														}}
													>
														{optObj.label}
													</span>
												);
											})}
										</div>
									);
							  })
							: options.map((optObj) => {
									return (
										<span
											id={optObj.value}
											className='py-1 px-3 my-1 w-full text-white hover:bg-background-lighter rounded-default cursor-pointer'
											onClick={(event) => {
												onChange(event);
											}}
										>
											{optObj.label}
										</span>
									);
							  })}
					</div>
				</div>
			</div>
		</div>
	);
}

export default Dropdown;
