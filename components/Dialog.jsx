import React from "react";
import Button from "./Button";

function Dialog({ heading, subHeading, visible, onHide, onProgress, ...props }) {
	const { children } = props;
	return visible ? (
		<div className='fixed inset-0 z-10 w-screen h-screen bg-black bg-opacity-50 flex justify-center items-center'>
			<div className='w-3/4 h-90% shadow-xl z-20 bg-background-dark flex flex-col'>
				<div className='h-15% w-full bg-primary flex justify-between py-4 px-6'>
					<div className='flex flex-col'>
						<span className='text-white text-large'>{heading}</span>
						<span className='text-gray-300 text-medium'>{subHeading}</span>
					</div>
					<img
						src='/close-icon.png'
						className='h-8 w-8 mt-2 p-2 hover:bg-primary-dark cursor-pointer'
						onClick={onHide}
					/>
				</div>
				<div className='h-3/4  max-h-75% overflow-auto w-full bg-background-dark flex flex-col scrollbar-track-background-light scrollbar-thin scrollbar-thumb-primary'>
					{children}
				</div>
				<div className='h-10% w-90% self-center flex justify-between m-4 p-2'>
					<Button label='Cancel' type='dark' onClick={onHide} className='rounded-default' />
					<Button label='Finish' onClick={onProgress} className='rounded-default' />
				</div>
			</div>
		</div>
	) : null;
}

export default Dialog;
{
	/* <div>
	Icons made by{" "}
	<a href='https://www.flaticon.com/authors/ariefstudio' title='ariefstudio'>
		ariefstudio
	</a>{" "}
	from{" "}
	<a href='https://www.flaticon.com/' title='Flaticon'>
		www.flaticon.com
	</a>
</div>; */
}
