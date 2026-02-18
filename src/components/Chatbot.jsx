import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { styles } from '../styles';
import { personalInfo, technologies, experiences, projects } from '../constants'; // Import constants

const Chatbot = () => {
    const [isOpen, setIsOpen] = useState(false);
    const [messages, setMessages] = useState([
        { text: "Hi! I'm Mano Teja Reddy's AI Assistant. Ask me anything about him!", isUser: false },
    ]);
    const [input, setInput] = useState("");
    const messagesEndRef = useRef(null);

    const scrollToBottom = () => {
        messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    };

    useEffect(scrollToBottom, [messages]);

    const generateResponse = (query) => {
        const lowerQuery = query.toLowerCase();

        // Simple keyword matching for "about me" logic
        if (lowerQuery.includes("hi") || lowerQuery.includes("hello")) {
            return "Hello! How can I help you today?";
        }
        if (lowerQuery.includes("who is") || lowerQuery.includes("about") || lowerQuery.includes("bio")) {
            return personalInfo.about;
        }
        if (lowerQuery.includes("contact") || lowerQuery.includes("email") || lowerQuery.includes("phone")) {
            return `You can contact Mano at ${personalInfo.email} or ${personalInfo.mobile}.`;
        }
        if (lowerQuery.includes("skills") || lowerQuery.includes("tech") || lowerQuery.includes("technologies")) {
            const techList = technologies.map(t => t.name).join(", ");
            return `Mano is skilled in: ${techList}.`;
        }
        if (lowerQuery.includes("experience") || lowerQuery.includes("work") || lowerQuery.includes("company")) {
            const expList = experiences.map(e => `${e.title} at ${e.company_name}`).join(". ");
            return `His experience includes: ${expList}.`;
        }
        if (lowerQuery.includes("project") || lowerQuery.includes("portfolio")) {
            const projList = projects.map(p => `${p.name}`).join(", ");
            return `Check out his projects: ${projList}.`;
        }
        if (lowerQuery.includes("resume") || lowerQuery.includes("cv")) {
            return "You can find his resume on the website navigation bar.";
        }

        return "I'm not sure about that. For all detailed references, please visit www.manotejareddy.xyz or check the About section.";
    };

    const handleSend = () => {
        if (!input.trim()) return;

        // Add user message
        const newMessages = [...messages, { text: input, isUser: true }];
        setMessages(newMessages);
        setInput("");

        // Simulate AI delay
        setTimeout(() => {
            const response = generateResponse(input);
            setMessages([...newMessages, { text: response, isUser: false }]);
        }, 1000);
    };

    return (
        <div className="fixed bottom-5 right-5 z-50 flex flex-col items-end pointer-events-auto">
            <AnimatePresence>
                {isOpen && (
                    <motion.div
                        initial={{ opacity: 0, scale: 0.8, y: 20 }}
                        animate={{ opacity: 1, scale: 1, y: 0 }}
                        exit={{ opacity: 0, scale: 0.8, y: 20 }}
                        transition={{ type: "spring", stiffness: 260, damping: 20 }}
                        className="bg-black-100 border border-secondary rounded-2xl w-80 h-96 shadow-card overflow-hidden flex flex-col mb-4 mr-2"
                    >
                        {/* Header */}
                        <div className="bg-tertiary p-4 border-b border-gray-700 flex justify-between items-center">
                            <h3 className="text-white font-bold">Mano's AI</h3>
                            <button onClick={() => setIsOpen(false)} className="text-gray-400 hover:text-white">✕</button>
                        </div>

                        {/* Messages */}
                        <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-primary custom-scrollbar">
                            {messages.map((msg, index) => (
                                <div
                                    key={index}
                                    className={`max-w-[80%] p-3 rounded-xl text-sm ${msg.isUser
                                            ? "bg-violet-600 text-white self-end ml-auto rounded-tr-none"
                                            : "bg-tertiary text-gray-200 self-start mr-auto rounded-tl-none border border-gray-700"
                                        }`}
                                >
                                    {msg.text}
                                </div>
                            ))}
                            <div ref={messagesEndRef} />
                        </div>

                        {/* Input */}
                        <div className="p-3 bg-tertiary border-t border-gray-700 flex gap-2">
                            <input
                                type="text"
                                value={input}
                                onChange={(e) => setInput(e.target.value)}
                                onKeyPress={(e) => e.key === "Enter" && handleSend()}
                                placeholder="Ask something..."
                                className="flex-1 bg-primary text-white text-sm rounded-lg px-3 py-2 outline-none border border-transparent focus:border-violet-500 transition-colors"
                                style={{ caretColor: 'cyan' }}
                            />
                            <button
                                onClick={handleSend}
                                className="bg-violet-600 hover:bg-violet-700 text-white rounded-lg px-4 py-2 text-sm font-semibold transition-colors"
                            >
                                Send
                            </button>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>

            {/* Toggle Button */}
            <motion.button
                onClick={() => setIsOpen(!isOpen)}
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                className="w-14 h-14 rounded-full bg-gradient-to-r from-violet-600 to-indigo-600 shadow-lg shadow-violet-500/50 flex justify-center items-center text-white cursor-pointer z-50 pointer-events-auto"
            >
                {isOpen ? (
                    <span className="text-2xl font-bold">✕</span>
                ) : (
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-8 h-8">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M8.625 12a.375.375 0 11-.75 0 .375.375 0 01.75 0zm0 0H8.25m4.125 0a.375.375 0 11-.75 0 .375.375 0 01.75 0zm0 0H12m4.125 0a.375.375 0 11-.75 0 .375.375 0 01.75 0zm0 0h-.375M21 12c0 4.556-4.03 8.25-9 8.25a9.764 9.764 0 01-2.555-.337A5.972 5.972 0 015.41 20.97a5.969 5.969 0 01-.474-.065 4.48 4.48 0 00.978-2.025c.09-.457-.133-.901-.467-1.226C3.93 16.178 3 14.159 3 12c0-4.556 4.03-8.25 9-8.25s9 3.694 9 8.25z" />
                    </svg>
                )}
            </motion.button>
        </div>
    );
};

export default Chatbot;
