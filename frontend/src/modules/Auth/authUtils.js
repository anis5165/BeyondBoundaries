import { jwtDecode } from 'jwt-decode';
import { getLocalStorage } from '@/utils/helpers';

export const isTokenValid = () => {
    try {
        const token = getLocalStorage('token');
        if (!token) return false;

        const decodedToken = jwtDecode(token);
        const currentTime = Date.now() / 1000;

        return decodedToken.exp > currentTime;
    } catch (error) {
        console.error('Token validation error:', error);
        return false;
    }
};

export const getAuthHeader = () => {
    const token = getLocalStorage('token');
    return token ? { Authorization: `Bearer ${token}` } : {};
};

export const isAuthenticated = () => {
    return !!getLocalStorage('member') && isTokenValid();
};

export const requireAuth = (gssp) => {
    return async (context) => {
        const { req, res } = context;
        
        if (!isAuthenticated()) {
            return {
                redirect: {
                    destination: '/login',
                    permanent: false,
                },
            };
        }

        return await gssp(context);
    };
};

export const redirectIfAuthenticated = (gssp) => {
    return async (context) => {
        if (isAuthenticated()) {
            const member = getLocalStorage('member');
            return {
                redirect: {
                    destination: member.role === 'business' 
                        ? '/business-dashboard' 
                        : '/partner-dashboard',
                    permanent: false,
                },
            };
        }

        return await gssp?.(context) || { props: {} };
    };
};