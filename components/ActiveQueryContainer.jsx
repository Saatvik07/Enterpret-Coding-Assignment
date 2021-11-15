import React from "react";

function ActiveQueryContainer({ query, onDelete, className }) {
	return (
		<div className={`flex ${className} bg-primary p-2 w-full items-center`}>
			<span className='font-medium text-white w-90% m-1'>{query}</span>
			<img
				src='/close-icon.png'
				alt='remove query'
				onClick={onDelete}
				className='h-5 w-5 p-1 hover:bg-primary-dark cursor-pointer'
			/>
		</div>
	);
}

export default ActiveQueryContainer;
