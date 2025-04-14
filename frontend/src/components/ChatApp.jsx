import React, { useState, useEffect, useRef } from 'react'
import { io } from 'socket.io-client'
import axios from 'axios'
import { toast } from 'react-hot-toast'

const ChatApp = ({ receiverId, receiverName, onClose }) => {
    const [messages, setMessages] = useState([]);
    const [newMessage, setNewMessage] = useState('');
    const [socket, setSocket] = useState(null);
    const messagesEndRef = useRef(null);
    const [user, setUser] = useState(null);

    useEffect(() => {
        try {
            const newSocket = io('http://localhost:5000');
            setSocket(newSocket);

            // Get user from localStorage
            const userData = JSON.parse(localStorage.getItem('user'));
            if (userData) {
                setUser(userData);
                
                // Join chat room
                const chatRoom = [userData._id, receiverId].sort().join('-');
                newSocket.emit('join chat', chatRoom);

                // Load chat history
                fetchChatHistory(userData._id, receiverId);
            }

            return () => newSocket.close();
        } catch (error) {
            console.error('Socket connection error:', error);
            toast.error('Failed to connect to chat server');
        }
    }, [receiverId]);

    const fetchChatHistory = async (userId1, userId2) => {
        try {
            const response = await axios.get(`http://localhost:5000/message/chat/${userId1}/${userId2}`);
            setMessages(response.data);
        } catch (error) {
            console.error('Error fetching chat history:', error);
            toast.error('Failed to load chat history');
        }
    };

    // Scroll to bottom of messages
    const scrollToBottom = () => {
        messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    };

    useEffect(() => {
        scrollToBottom();
    }, [messages]);

    // Listen for private messages
    useEffect(() => {
        if (!socket) return;

        socket.on('private message', (message) => {
            setMessages(prev => [...prev, message]);
        });

        return () => {
            socket.off('private message');
        };
    }, [socket]);

    const sendMessage = (e) => {
        e.preventDefault();
        if (!newMessage.trim()) return;

        const messageData = {
            text: newMessage,
            sender: user?._id,
            senderName: user?.name,
            timestamp: new Date().toISOString()
        };

        socket?.emit('private message', messageData);
        setNewMessage('');
    };

    return (
        <div className="flex flex-col h-full">
            {/* Chat Header */}
            <div className="bg-blue-600 text-white px-4 py-3 flex justify-between items-center">
                <div>
                    <h2 className="text-xl font-semibold">Chat with {receiverName}</h2>
                    {user && <p className="text-sm">You: {user.name}</p>}
                </div>
                <button 
                    onClick={onClose}
                    className="text-white hover:text-gray-200"
                >
                    ×
                </button>
            </div>

            {/* Messages Container */}
            <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-gray-50">
                {messages.map((message, index) => (
                    <div 
                        key={index}
                        className={`flex ${message.sender === user?._id ? 'justify-end' : 'justify-start'}`}
                    >
                        <div 
                            className={`max-w-[70%] rounded-lg px-4 py-2 ${
                                message.sender === user?._id 
                                    ? 'bg-blue-600 text-white' 
                                    : 'bg-gray-200'
                            }`}
                        >
                            <p className="break-words">{message.text}</p>
                            <p className="text-xs text-right mt-1 opacity-70">
                                {new Date(message.timestamp).toLocaleTimeString()}
                            </p>
                        </div>
                    </div>
                ))}
                <div ref={messagesEndRef} />
            </div>

            {/* Message Input */}
            <form onSubmit={sendMessage} className="p-4 bg-white border-t">
                <div className="flex gap-2">
                    <input
                        type="text"
                        value={newMessage}
                        onChange={(e) => setNewMessage(e.target.value)}
                        placeholder="Type a message..."
                        className="flex-1 px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                    <button
                        type="submit"
                        disabled={!user}
                        className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition-colors disabled:bg-gray-400"
                    >
                        Send
                    </button>
                </div>
            </form>
        </div>
    )
}

export default ChatApp