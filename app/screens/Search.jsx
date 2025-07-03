import { AuthContext } from '@/context/AuthProvider';
import { useContext, useEffect } from 'react';
import { Text, View } from 'react-native';

export default function Search() {
const { user } = useContext(AuthContext);

    useEffect(() => {
        console.log(user.avatar)
        // axiosConfig.defaults.headers.common[
        //             'Authorization'
        //             ] = `Bearer ${user.token}`;
        //         axiosConfig
        //             .get('api/user')
        //             .then(response => {
        //                 console.log(response.data)
        //             })
        //             .catch(error => {
        //                 console.log(error)
        //             });
    })

    return (
        <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
            <Text>Search</Text>
        </View>
    )
}