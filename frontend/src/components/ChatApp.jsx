import React, { useState, useEffect, useRef } from 'react'
import { io } from 'socket.io-client'
import axios from 'axios'
import { toast } from 'react-hot-toast'

const ChatApp = () => {
    const [messages, setMessages] = useState([])
    const [newMessage, setNewMessage] = useState('')
    const [socket, setSocket] = useState(null)
    const messagesEndRef = useRef(null)
    const [user, setUser] = useState(null)

    // Initialize socket connection
    useEffect(() => {
        const newSocket = io('http://localhost:5000')
        setSocket(newSocket)

        // Get user from localStorage
        const userData = JSON.parse(localStorage.getItem('user'))
        setUser(userData)

        return () => newSocket.close()
    }, [])

    // Scroll to bottom of messages
    const scrollToBottom = () => {
        messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' })
    }

    useEffect(() => {
        scrollToBottom()
    }, [messages])

    // Listen for messages
    useEffect(() => {
        if (!socket) return

        socket.on('message', (message) => {
            setMessages(prev => [...prev, message])
        })

        return () => {
            socket.off('message')
        }
    }, [socket])

    const sendMessage = (e) => {
        e.preventDefault()
        if (!newMessage.trim()) return

        const messageData = {
            text: newMessage,
            sender: user?._id,
            senderName: user?.name,
            timestamp: new Date().toISOString()
        }

        socket?.emit('message', messageData)
        setNewMessage('')
    }

    return (
        <div className="flex flex-col h-[80vh] max-w-2xl mx-auto mt-28 shadow-lg rounded-lg">
            {/* Chat Header */}
            <div className="bg-blue-600 text-white px-4 py-3 rounded-t-lg">
                <h2 className="text-xl font-semibold">Chat Room</h2>
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
                            <p className="text-sm font-semibold">{message.senderName}</p>
                            <p>{message.text}</p>
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
                        className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition-colors"
                    >
                        Send
                    </button>
                </div>
            </form>
        </div>
    )
}

export default ChatApp