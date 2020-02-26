import React from 'react';
import { assets } from '../definitions/assets';
import { colors } from '../definitions/colors';
import { View, StyleSheet, Image, Text } from 'react-native';

const Error = ({msgError}) => {
	return (
		<View style = { styles.mainContainer }>
			<Image style = { styles.errorIcon } source = { assets.errorIcon } />
			<Text style = { styles.errorText } > { msgError } </Text>
		</View>
	);
}

export default Error;

const styles = StyleSheet.create({
	mainContainer: {
		marginTop: 50,
		paddingVertical: 10,
		paddingHorizontal: 15,
		alignItems: "center",
	},
	errorIcon: {
		width: 100,
		height: 100,
        margin: 50,
        tintColor: colors.mainRedColor,
	},
	errorText: {
		textAlign: "center",
        fontWeight: 'bold',
        fontSize: 25,
        color: colors.mainRedColor,
	}
});