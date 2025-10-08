

const Dialog = ({ text, onCancel, onConfirm, visible }) => {
    if (!visible) return null;

    return (
        <div className="fixed top-0 left-0 bg-[rgba(0,0,0,0.5)] w-full h-full flex items-center justify-center p-8 z-50">
            <div className="flex flex-col w-full max-w-[400px] bg-light-light gap-4 p-4 rounded-[20px]">
                <h1 className="font-title text-xl">Confirmation</h1>
                <p>{text}</p>
                <div className="flex flex-col xs:flex-row gap-2">
                    <button onClick={onCancel} className="flex-1 w-full font-text md:text-base px-8 py-4 bg-secondary rounded-[10px] text-white cursor-pointer active:bg-primary active:text-black">CANCEL</button>
                    <button onClick={onConfirm} className="flex-1 w-full font-text md:text-base px-8 py-4 bg-primary rounded-[10px] text-black cursor-pointer active:bg-secondary active:text-white">CONFIRM</button>
                </div>
            </div>
        </div>
    )
}

export default Dialog;