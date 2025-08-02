import { useState } from "react";
import { assets } from "../assets/assets"; 
import { generateResponse } from "../lib/Gemini.jsx";

const Chatbot = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [input, setInput] = useState("");
  const [messages, setMessages] = useState([
    { sender: "bot", text: "Hi! I'm here to help all your inquiries about Boss D Apparel." }
  ]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!input.trim()) return;

    const newUserMessage = { sender: "user", text: input };
    setMessages((prev) => [...prev, newUserMessage]);
    setInput("");

    const reply = await generateResponse(input);
    const newBotMessage = { sender: "bot", text: reply };
    setMessages((prev) => [...prev, newBotMessage]);
  };

  const toggleChat = () => {
    setIsOpen((prev) => !prev);
  };

  return (
    <div>
      {/* Floating Button */}
      <button onClick={toggleChat} className="fixed bottom-5 right-5 z-50 bg-[#bfbfbf] p-4 border border-black shadow-lg">
        <img src={assets.chat_icon} alt="Chat Icon" />
      </button>

      {/* Chatbox */}
      {isOpen && (
        <div className="fixed flex flex-col z-50 bottom-[20px] right-[20px] w-[calc(100%-40px)] min-h-[400px] max-h-[500px] bg-white border border-black xs:w-[300px]">
          {/* Header */}
          <div className="p-4 flex flex-row items-center justify-between border-b border-black">
            <p className="text-xl font-subtitle">BossD Chat</p>
            <img className="cursor-pointer" onClick={toggleChat} src={assets.cross_icon} alt="" />
          </div>

          {/* Messages */}
          <div className="flex-1 p-3 overflow-y-auto space-y-2">
            {messages.map((msg, index) => (
              <div key={index} className={`p-2 max-w-[80%] border border-black ${ msg.sender === "user" ? "bg-[#bfbfbf] self-end text-right ml-auto" : "bg-white self-start text-left mr-auto"}`}>
                {msg.text}
              </div>
            ))}
          </div>

          {/* Input */}
          <div className="p-2 border-t border-black flex gap-2">
            <input value={input} onChange={(e) => setInput(e.target.value)} type="text" placeholder="Ask anything..." className="w-full px-4 py-2 border border-black" />
            <button onClick={handleSubmit} className="w-[50px] border border-black bg-[#bfbfbf] flex items-center justify-center">
              <img className="" src={assets.send_icon} alt="" />
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Chatbot;