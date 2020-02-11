import React from 'react';
import { View, Text, StyleSheet, TextInput, TouchableHighlight, Image, Button, TouchableWithoutFeedback, TouchableOpacity, navigation } from 'react-native';

import { colors } from '../definitions/colors';
import { assets } from '../definitions/assets';
import { ButtonGroup } from 'react-native-elements';
import IngredientSearch from './IngredientSearch';
import AddTo from './AddTo';

const Fridge = ({navigation}) => {


	return (
		<View style = { styles.mainView }>
			<View>
				<IngredientSearch/>
			</View>
			<View>
				<Text> My Fridge List From API !</Text>
				<Button onPress={() => navigation.navigate('AddTo')} title="Add ingredient"/>
			</View>
		</View>
    );
}

Fridge.navigationOptions = {
	title: 'Fridge',
};

export default Fridge;

const styles = StyleSheet.create({
	mainView: {
		flex: 1,
	},
	searchView: {
		alignItems: 'stretch',
		flexDirection: 'row',
	},
	searchField: {
		flex: 1,
		height: 100,
		fontSize: 20,
		paddingLeft: 10,
		backgroundColor: colors.mainSilverColor,
	},
	button: {
		flex: 1,
		alignItems: 'center',
		justifyContent: 'center',
		width: 100,
		height: 100,
	},
	searchIcon: {
		width: 50,
		height: 50,
	}
});