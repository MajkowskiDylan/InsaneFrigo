import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

const Settings = () => {
	return (
		<View style = { styles.container }>
			<Text>Paramètres</Text>
		</View>
	);
}

Settings.navigationOptions = {
	title: 'Settings',
};

export default Settings;

const styles = StyleSheet.create({
	container: {
		flex: 1,
		alignItems: 'center',
		justifyContent: 'center',
	},
});