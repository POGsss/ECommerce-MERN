import { useState } from "react";
import { assets } from "../assets/assets"; 
import { generateChat } from "../lib/Gemini.jsx";

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

    const reply = await generateChat(input);
    const newBotMessage = { sender: "bot", text: reply };
    setMessages((prev) => [...prev, newBotMessage]);
  };

  const toggleChat = () => {
    setIsOpen((prev) => !prev);
  };

  return (
    <div>
      {/* Floating Button */}
      <button onClick={toggleChat} id="floatingButton" className="flex flex-row items-center gap-4 fixed overflow-hidden w-auto transition-all bottom-5 right-5 z-9 bg-primary rounded-[10px] p-4 shadow-lg animate-pulse">
        <img src={assets.chat_icon} alt="Chat Icon" />
        <h1 className="font-subtitle text-sm text-nowrap">Chatbot</h1>
      </button>

      {/* Chatbox */}
      {isOpen && (
        <div className="fixed flex flex-col z-50 bottom-[20px] right-[20px] w-[calc(100%-40px)] min-h-[400px] overflow-hidden max-h-[500px] bg-light-dark rounded-[10px] xs:w-[300px] shadow-lg">
          {/* Header */}
          <div className="p-4 flex flex-row items-center justify-between bg-light-light">
            <p className="text-xl font-subtitle">BossD Chat</p>
            <img className="cursor-pointer" onClick={toggleChat} src={assets.cross_icon} alt="" />
          </div>

          {/* Messages */}
          <div className="flex-1 p-3 overflow-y-auto space-y-2">
            {messages.map((msg, index) => (
              <div key={index} className={`p-2 rounded-[5px] max-w-[80%] ${ msg.sender === "user" ? "bg-primary self-start text-left ml-auto" : "bg-white self-start text-left mr-auto"}`}>
                {msg.text}
              </div>
            ))}
          </div>

          {/* Input */}
          <div className="p-4 bg-light-light flex gap-2">
            <input value={input} onChange={(e) => setInput(e.target.value)} type="text" placeholder="Ask anything..." className="w-full px-4 py-2 bg-light-dark rounded-[5px] outline-none" />
            <button onClick={handleSubmit} className="w-[50px] rounded-[5px] bg-primary flex items-center justify-center">
              <img className="" src={assets.send_icon} alt="" />
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Chatbot;