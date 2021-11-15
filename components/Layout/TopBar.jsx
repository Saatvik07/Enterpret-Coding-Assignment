import React from "react";
import Image from "next/image";
function TopBar() {
	return (
		<div className='w-full bg-background-light flex justify-between'>
			<div className='flex items-center'>
				<img
					src='https://uploads-ssl.webflow.com/6006f854ea6add7c371c2862/600700ff605e88084f78d8ab_Enterpret%20Logo%20Colour.svg'
					className='my-6 mx-4'
				/>
				<div className='flex justify-evenly ml-4'>
					<div className='mx-4 flex items-center px-3 py-2 bg-gray-700 rounded-default cursor-pointer'>
						<img src='/settings-icon.png' alt='thematic analysis' className='w-5 h-5 mr-2' />
						<span className='text-large text-bold text-default text-white'>Thematic Analysis</span>
					</div>
					<div className='mx-4 flex items-center opacity-60 cursor-pointer rounded-default'>
						<img src='/settings-icon.png' alt='nascent analysis' className='w-5 h-5 mr-2' />
						<span className='text-large text-bold text-default text-white'>Nascent Analysis</span>
					</div>
					<div className='mx-4 flex items-center opacity-60 cursor-pointer rounded-default'>
						<img src='/chart-icon.png' alt='settings' className='w-5 h-5 mr-2' />
						<span className='text-large text-bold text-default text-white'>Settings</span>
					</div>
				</div>
			</div>
			<div className='flex items-center'>
				<img src='/profile.png' className='w-12 h-12 mx-5' alt='user profile' />
			</div>
		</div>
	);
}

export default TopBar;
{
	/* <div>
	Icons made by{" "}
	<a href='https://www.flaticon.com/authors/pixel-perfect' title='Pixel perfect'>
		Pixel perfect
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
	<a href='https://www.flaticon.com/authors/phoenix-group' title='Phoenix Group'>
		Phoenix Group
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
