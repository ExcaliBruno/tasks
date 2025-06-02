// index.js
import React from 'react';
import { AppRegistry, StyleSheet } from 'react-native';
import Navigator from './src/Navigator';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { name as appName } from './app.json';

const App = () => (
  <GestureHandlerRootView style={styles.container}>
    <Navigator />
  </GestureHandlerRootView>
);

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

AppRegistry.registerComponent(appName, () => App);
