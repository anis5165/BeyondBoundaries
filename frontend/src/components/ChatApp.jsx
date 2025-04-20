'use client';
import { useState, useEffect, useRef } from 'react';
import { useAuth } from '@/context/AuthContext';
import { io } from 'socket.io-client';
import { messageAPI } from '@/utils/api';
import { timeAgo } from '@/utils/helpers';

const ChatApp = ({ receiverId, receiverName, onClose }) => {
    const [messages, setMessages] = useState([]);
    const [newMessage, setNewMessage] = useState('');
    const [socket, setSocket] = useState(null);
    const { currentMember } = useAuth();
    const messagesEndRef = useRef(null);
    const chatRoomId = [currentMember._id, receiverId].sort().join('-');

    useEffect(() => {
        const socketInstance = io('http://localhost:5000', {
            query: { userId: currentMember._id }
        });

        socketInstance.emit('join chat', chatRoomId);

        socketInstance.on('private message', (message) => {
            setMessages(prev => [...prev, message]);
            scrollToBottom();
        });

        setSocket(socketInstance);

        return () => {
            socketInstance.emit('leave chat', chatRoomId);
            socketInstance.disconnect();
        };
    }, [currentMember._id, chatRoomId]);

    useEffect(() => {
        loadMessages();
    }, [currentMember._id, receiverId]);

    const loadMessages = async () => {
        try {
            const response = await messageAPI.getMessages(currentMember._id, receiverId);
            setMessages(response.data);
            scrollToBottom();
        } catch (error) {
            console.error('Error loading messages:', error);
        }
    };

    const sendMessage = async (e) => {
        e.preventDefault();
        if (!newMessage.trim()) return;

        try {
            const messageData = {
                sender: currentMember._id,
                receiver: receiverId,
                text: newMessage,
                senderName: currentMember.name
            };

            const response = await messageAPI.sendMessage(messageData);
            socket?.emit('private message', {
                ...response.data,
                chatRoom: chatRoomId
            });

            setMessages(prev => [...prev, response.data]);
            setNewMessage('');
            scrollToBottom();
        } catch (error) {
            console.error('Error sending message:', error);
        }
    };

    const scrollToBottom = () => {
        messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    };

    return (
        <div className="flex flex-col h-full">
            {/* Chat Header */}
            <div className="bg-blue-600 text-white px-4 py-3 flex justify-between items-center">
                <h2 className="text-lg font-semibold">{receiverName}</h2>
                <button 
                    onClick={onClose}
                    className="text-white hover:text-gray-200 text-xl"
                >
                    ×
                </button>
            </div>

            {/* Messages Area */}
            <div className="flex-1 overflow-y-auto p-4 space-y-4">
                {messages.map((message, index) => (
                    <div 
                        key={message._id || index}
                        className={`flex ${message.sender === currentMember._id ? 'justify-end' : 'justify-start'}`}
                    >
                        <div 
                            className={`max-w-[70%] rounded-lg px-4 py-2 ${
                                message.sender === currentMember._id 
                                    ? 'bg-blue-600 text-white' 
                                    : 'bg-gray-200'
                            }`}
                        >
                            <p className="text-sm">{message.text}</p>
                            <p className="text-xs opacity-70 mt-1">
                                {timeAgo(message.timestamp)}
                            </p>
                        </div>
                    </div>
                ))}
                <div ref={messagesEndRef} />
            </div>

            {/* Message Input */}
            <form onSubmit={sendMessage} className="border-t p-4">
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
                        className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition-colors"
                    >
                        Send
                    </button>
                </div>
            </form>
        </div>
    );
};

export default ChatApp;