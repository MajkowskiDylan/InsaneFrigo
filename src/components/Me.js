import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

const Me = () => {
	return (
		<View style = { styles.container }>
			<Text>Me</Text>
		</View>
	);
}

Me.navigationOptions = {
	title: 'Me',
};

export default Me;

const styles = StyleSheet.create({
	container: {
		flex: 1,
		alignItems: 'center',
		justifyContent: 'center',
	},
});