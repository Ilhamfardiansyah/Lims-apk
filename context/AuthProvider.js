import axiosConfig from '@/helpers/axiosConfig';
import * as SecureStore from 'expo-secure-store';
import { createContext, useState } from "react";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState(null);

    return (
        <AuthContext.Provider
        value={{ 
            user,
            setUser,
            error,
            isLoading,
            login: (email, password) => {
                setIsLoading(true);
                axiosConfig.get('/sanctum/csrf-cookie').then(() => {
                    axiosConfig
                        .post('/api/login', {
                            email,
                            password,
                            device_name: 'mobile',
                        })
                        .then(response => {
                            const userResponse = {
                                token: response.data.token,
                                id: response.data.user.id,
                                name: response.data.user.name,
                                username: response.data.user.username,
                                email: response.data.user.email,
                                avatar: response.data.user.avatar,
                            };
                            setUser(userResponse);
                            setError(null);
                            SecureStore.setItemAsync('user', JSON.stringify(userResponse));
                            setIsLoading(false);
                        })
                        .catch(error => {
                            console.log(error.response);
                            setError(error.response?.data?.message || "Login gagal");
                            setIsLoading(false);
                        });
                });
            },

            logout: () => {
                setIsLoading(true)
                axiosConfig.defaults.headers.common[
                    'Authorization'
                    ] = `Bearer ${user.token}`;
                axiosConfig
                    .post('/api/logout')
                    .then(response => {
                            setUser(null);
                            SecureStore.deleteItemAsync('user')
                            setError(null);
                            setIsLoading(false)
                    })
                    .catch(error => {
                        console.log(error)
                        setUser(null);
                        SecureStore.deleteItemAsync('user')
                        setError(error.response.data.message)
                        setIsLoading(false)
                    });

            }
        }}
        >
            {children} 
        </AuthContext.Provider>
    )
    
}