'use client';
import { useState, useEffect } from 'react';
import { useAuth } from '@/context/AuthContext';
import axios from 'axios';
import ChatWindow from '../Chat/ChatWindow';

const ConnectionDashboard = () => {
    const [connections, setConnections] = useState([]);
    const [selectedConnection, setSelectedConnection] = useState(null);
    const [loading, setLoading] = useState(true);
    const { currentMember } = useAuth();

    useEffect(() => {
        if (currentMember) {
            fetchConnections();
        }
    }, [currentMember]);

    const fetchConnections = async () => {
        try {
            const response = await axios.get(`http://localhost:5000/connections/${currentMember._id}`);
            setConnections(response.data);
            setLoading(false);
        } catch (error) {
            console.error('Error fetching connections:', error);
            setLoading(false);
        }
    };

    const startChat = (connection) => {
        setSelectedConnection(connection);
    };

    if (loading) {
        return (
            <div className="flex justify-center items-center h-64">
                <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
            </div>
        );
    }

    return (
        <div className="container mx-auto px-4">
            <h2 className="text-2xl font-bold mb-6">Your Connections</h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {connections.map((connection) => (
                    <div key={connection._id} className="border rounded-lg p-4 hover:shadow-lg transition-shadow">
                        <div className="flex items-start justify-between">
                            <div>
                                <h3 className="font-semibold">{connection.name}</h3>
                                <p className="text-sm text-gray-600">{connection.role === 'business' ? 'Business Owner' : 'Partner'}</p>
                                <p className="text-sm text-gray-600">{connection.country}</p>
                            </div>
                            <div className="flex items-center space-x-2">
                                <button
                                    onClick={() => startChat(connection)}
                                    className="text-blue-600 hover:text-blue-800"
                                >
                                    Chat
                                </button>
                            </div>
                        </div>
                        
                        <div className="mt-4">
                            <p className="text-sm">
                                <span className="font-medium">Connected since:</span>{' '}
                                {new Date(connection.connectedAt).toLocaleDateString()}
                            </p>
                        </div>
                    </div>
                ))}
            </div>

            {connections.length === 0 && (
                <div className="text-center text-gray-500 mt-8">
                    No connections yet. Start matching with potential partners!
                </div>
            )}

            {selectedConnection && (
                <div className="fixed bottom-0 right-4 w-96 h-[600px] bg-white shadow-2xl rounded-t-lg">
                    <ChatWindow
                        receiverId={selectedConnection._id}
                        receiverName={selectedConnection.name}
                        onClose={() => setSelectedConnection(null)}
                    />
                </div>
            )}
        </div>
    );
};

export default ConnectionDashboard;