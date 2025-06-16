

const Title = ({ text1, text2 }) => {
	return (
		<div className="flex justify-center items-center mb-3">
			<div className="flex flex-col gap-2 items-center">
				<p className="text-black font-subtitle">{text1} <span className="text-black">{text2}</span></p>
				<p className="w-2/3 h-[3px] bg-black"></p>
			</div>
		</div>
	)
}

export default Title