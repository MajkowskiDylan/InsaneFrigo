import React from 'react';
import { assets } from '../definitions/assets';
import { colors } from '../definitions/colors';
import { View, StyleSheet, Image, Text } from 'react-native';

const Error = ({msgError}) => {
	return (
		<View style = { styles.mainContainer }>
			<Image style = { styles.errorIcon } source = { assets.error } />
			<Text style = { styles.errorText } > { msgError } </Text>
		</View>
	);
}

export default Error;

const styles = StyleSheet.create({
	mainContainer: {
		paddingVertical: 10,
        paddingHorizontal: 15,
	},
	errorIcon: {
		height: 200,
		width: 200,
        tintColor: colors.mainGreenColor,
        alignItems: "center",
	},
	errorText: {
        fontWeight: 'bold',
        fontSize: 25,
        color: colors.mainGreenColor,
	}
});