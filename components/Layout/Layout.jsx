import React from "react";
import TopBar from "./TopBar";

function Layout(props) {
	const { children } = props;
	return (
		<div className='w-full flex flex-col h-screen scrollbar-track-background-light scrollbar-thin scrollbar-thumb-primary'>
			<TopBar />
			<div className='content bg-background-dark'>{children}</div>
		</div>
	);
}

export default Layout;
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
