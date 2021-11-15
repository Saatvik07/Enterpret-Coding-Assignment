import Head from "next/head";
function PageTitle({ title }) {
	return (
		<Head>
			<title>{title}</title>
			<link rel='icon' href='/favicon.ico' />
		</Head>
	);
}

export default PageTitle;
