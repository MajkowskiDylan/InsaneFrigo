import React from 'react';
import { StyleSheet } from 'react-native';
import { Provider } from 'react-redux';

import Navigation from './src/navigation/Navigation';
import Store from './src/store/config';

export default function App() {
	return (
	<Provider store={ Store }>
      	<Navigation/>
    </Provider>
	);
}

const styles = StyleSheet.create({});
