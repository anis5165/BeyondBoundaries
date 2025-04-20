import axios from 'axios';
import { getAuthHeader } from '@/modules/Auth/authUtils';

const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000';

// Create axios instance with default config
const api = axios.create({
    baseURL: API_URL,
    headers: {
        'Content-Type': 'application/json'
    }
});

// Add auth token to requests
api.interceptors.request.use((config) => {
    const headers = getAuthHeader();
    config.headers = { ...config.headers, ...headers };
    return config;
});

// Auth API
export const authAPI = {
    login: (credentials) => api.post('/user/login', credentials),
    register: (userData) => api.post('/user/register', userData),
    verifyToken: () => api.get('/user/verify')
};

// Business Owner API
export const businessOwnerAPI = {
    createProfile: (data) => api.post('/businessOwner/add', data),
    updateProfile: (id, data) => api.put(`/businessOwner/${id}`, data),
    getProfile: (id) => api.get(`/businessOwner/${id}`),
    getAllProfiles: () => api.get('/businessOwner/all')
};

// Partner API
export const partnerAPI = {
    createProfile: (data) => api.post('/partner/add', data),
    updateProfile: (id, data) => api.put(`/partner/${id}`, data),
    getProfile: (id) => api.get(`/partner/${id}`),
    getAllProfiles: () => api.get('/partner/all')
};

// Connection API
export const connectionAPI = {
    requestConnection: (data) => api.post('/connection/request', data),
    acceptConnection: (connectionId) => 
        api.put(`/connection/${connectionId}/status`, { status: 'accepted' }),
    rejectConnection: (connectionId) => 
        api.put(`/connection/${connectionId}/status`, { status: 'rejected' }),
    getConnections: (userId) => api.get(`/connection/user/${userId}`),
    getPendingRequests: (userId) => api.get(`/connection/pending/${userId}`)
};

// Message API
export const messageAPI = {
    sendMessage: (data) => api.post('/message/add', data),
    getMessages: (userId1, userId2) => api.get(`/message/chat/${userId1}/${userId2}`),
    markAsRead: (messageId) => api.put(`/message/${messageId}/read`)
};

// Feedback API
export const feedbackAPI = {
    addFeedback: (data) => api.post('/feedback/add', data),
    getFeedback: (userId) => api.get(`/feedback/user/${userId}`),
    getRating: (userId) => api.get(`/feedback/rating/${userId}`)
};

// Notification API
export const notificationAPI = {
    getNotifications: (userId) => api.get(`/notification/${userId}`),
    markAsRead: (notificationId) => api.put(`/notification/${notificationId}/read`),
    markAllAsRead: (userId) => api.put(`/notification/user/${userId}/read-all`),
    getUnreadCount: (userId) => api.get(`/notification/${userId}/unread`)
};

// File Upload API
export const fileAPI = {
    uploadBusinessPlan: (file) => {
        const formData = new FormData();
        formData.append('file', file);
        return api.post('/upload/business-plan', formData, {
            headers: {
                'Content-Type': 'multipart/form-data'
            }
        });
    }
};

export default api;