

const Dialog = ({ rating, setRating, comment, setComment, onCancel, onConfirm, visible }) => {
    if (!visible) return null;

    return (
        <div className="fixed top-0 left-0 bg-[rgba(0,0,0,0.5)] w-full h-full flex items-center justify-center p-8 z-50">
            <div className="flex flex-col w-full max-w-[400px] bg-light-light gap-4 p-4 rounded-[20px]">
                <div className="flex flex-row justify-between items-start gap-2">
                    <h1 className="font-title text-xl">Leave a Review</h1>
                    <div className="flex gap-1">
                        {[1, 2, 3, 4, 5].map((star) => (<span key={star} onClick={() => setRating(star)} className={`cursor-pointer text-2xl ${star <= rating ? "text-primary" : "text-light-dark"}`}>★</span>))}
                    </div>
                </div>
                <textarea className="w-full bg-light-dark outline-none rounded-[10px] p-2 text-sm resize-none" rows="5" placeholder="Write your feedback..." value={comment} onChange={(e) => setComment(e.target.value)}/>
                <div className="flex flex-col xs:flex-row gap-2">
                    <button onClick={onCancel} className="flex-1 w-full font-text md:text-base px-8 py-4 bg-secondary rounded-[10px] text-white cursor-pointer active:bg-primary active:text-black">CANCEL</button>
                    <button onClick={onConfirm} className="flex-1 w-full font-text md:text-base px-8 py-4 bg-primary rounded-[10px] text-black cursor-pointer active:bg-secondary active:text-white">CONFIRM</button>
                </div>
            </div>
        </div>
    )
}

export default Dialog;