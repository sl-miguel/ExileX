function Loader() {
	return (
		<div className='flex flex-col items-center justify-center gap-6 h-screen'>
			<div className='w-36 h-36 animate-spin rounded-full inline-block border-solid border-t-4 border-t-black border-r-4 border-r-white'></div>
			<h3 className='font-medium text-3xl'>League Client</h3>
		</div>
	);
}

export default Loader;
