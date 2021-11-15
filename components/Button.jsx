import React from "react";

function Button({ label, onClick, className, type = "primary", icon = false, imgPath, imgDesc }) {
	return (
		<button
			onClick={onClick}
			className={`${className} ${type === "primary" ? "bg-primary" : "bg-background-light"}  ${
				type === "primary" ? "hover:bg-primary-dark" : "hover:bg-background-dark"
			} text-white font-semibold px-8 py-3 hover:bg-primary-dark ease-in duration-200 flex justify-center items-center`}
		>
			{icon ? <img src={imgPath} alt={imgDesc} className='w-6 h-6 mr-3' /> : null}
			{label}
		</button>
	);
}

export default Button;
