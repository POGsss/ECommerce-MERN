import { useState } from "react";
import { assets } from "../assets/assets"; 

const Chatbot = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [input, setInput] = useState("");
  const [messages, setMessages] = useState([
    { from: "bot", text: "Hi! How can I help you with your shopping today?" },
  ]);

  const toggleChat = () => setIsOpen(!isOpen);

  const handleSend = async () => {
    if (!input.trim()) return;

    const newMessages = [...messages, { from: "user", text: input }];
    setMessages(newMessages);

    // Replace this block with actual Gemini API call
    const botReply = await mockGeminiResponse(input);
    setMessages([...newMessages, { from: "bot", text: botReply }]);

    setInput("");
  };

  const mockGeminiResponse = async (message) => {
    return "Thanks for asking! For inquiries about shipping, return policies, or latest arrivals, I'm here to help.";
  };

  return (
    <div>
      {/* Floating Button */}
      <button onClick={toggleChat} className="fixed bottom-5 right-5 z-50 bg-[#bfbfbf] p-4 border border-black shadow-lg">
        <img src={assets.chat_icon} alt="Chat Icon" />
      </button>

      {/* Chatbox */}
      {isOpen && (
        <div className="fixed flex flex-col z-50 bottom-0 right-0 w-full h-full bg-white border border-black xs:bottom-5 xs:right-5 xs:w-[300px] xs:h-[400px]">
          {/* Header */}
          <div className="p-4 flex flex-row items-center justify-between border-b border-black">
            <p className="text-xl font-subtitle">BossDShop Chat</p>
            <img className="cursor-pointer" onClick={toggleChat} src={assets.cross_icon} alt="" />
          </div>

          {/* Messages */}
          <div className="flex-1 p-3 overflow-y-auto space-y-2">
            {messages.map((msg, index) => (
              <div key={index} className={`p-2 max-w-[80%] ${ msg.from === "user" ? "bg-black text-white self-end text-right ml-auto" : "bg-[#bfbfbf] self-start text-left mr-auto"}`}>
                {msg.text}
              </div>
            ))}
          </div>

          {/* Input */}
          <div className="p-2 border-t border-black flex gap-2">
            <input value={input} onChange={(e) => setInput(e.target.value)} onKeyDown={(e) => e.key === "Enter" && handleSend()} type="text" placeholder="Type your message..." className="flex-1 px-4 py-2 border border-black" />
            <button onClick={handleSend} className="flex-1 border border-black bg-[#bfbfbf] flex items-center justify-center">
              <img className="" src={assets.send_icon} alt="" />
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Chatbot;