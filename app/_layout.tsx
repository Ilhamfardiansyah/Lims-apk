import { AuthProvider } from '@/context/AuthProvider';
import Root from '@/Root';
import React from 'react';
import { GestureHandlerRootView } from 'react-native-gesture-handler';

export default function _layout() {
  return (
    <GestureHandlerRootView>
      <AuthProvider>
        <Root />
      </AuthProvider>
    </GestureHandlerRootView>
  )
}