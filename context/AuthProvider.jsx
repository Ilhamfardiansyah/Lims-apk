import * as SecureStore from 'expo-secure-store';
import { createContext, useState } from "react";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);

    return (
        <AuthContext.Provider
        value={{ 
            user,
            setUser,
            login: (email, password) => {
                setUser('Ilham');
                SecureStore.setItemAsync('user', 'Ilham')
            },
            logout: () => {
                setUser(null)
                SecureStore.deleteItemAsync('user', 'Ilham')
            }
        }}
        >
            {children}
        </AuthContext.Provider>
    )
    
}