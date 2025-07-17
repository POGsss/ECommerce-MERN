

const Dialog = ({ text, onCancel, onConfirm, visible }) => {
    if (!visible) return null;

    return (
        <div className="fixed top-0 left-0 bg-[rgba(0,0,0,0.5)] w-full h-full flex items-center justify-center p-8 z-50">
            <div className="flex flex-col w-full max-w-[400px] bg-white gap-4 p-4">
                <h1 className="font-title text-xl">Confirmation</h1>
                <p>{text}</p>
                <div className="flex flex-col xs:flex-row gap-2">
                    <button onClick={onCancel} className="flex-1 w-full font-text md:text-base px-8 py-4 border border-black cursor-pointer active:bg-black active:text-white">CANCEL</button>
                    <button onClick={onConfirm} className="flex-1 w-full font-text md:text-base px-8 py-4 bg-black text-white cursor-pointer active:bg-gray-500">CONFIRM</button>
                </div>
            </div>
        </div>
    )
}

export default Dialog;