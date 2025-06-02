import React from 'react'
import { NavigationContainer } from '@react-navigation/native'
import { createNativeStackNavigator } from '@react-navigation/native-stack'

import Auth from './screens/Auth'
import TaskList from './screens/TaskList'

const Stack = createNativeStackNavigator()

export default function App() {
    return (
        <NavigationContainer>
            <Stack.Navigator initialRouteName="Auth" >
                <Stack.Screen name="Auth" component={Auth} />
                <Stack.Screen name="Home" component={TaskList} />
            </Stack.Navigator>
        </NavigationContainer>
    )
}
