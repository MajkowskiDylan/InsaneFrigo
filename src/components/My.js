import React, { useState, Component } from 'react';
import { View, Text, StyleSheet, TextInput, TouchableHighlight, Image, Button, TouchableWithoutFeedback, TouchableOpacity, navigation } from 'react-native';
import IngredientSearch from './IngredientSearch';
import { getIngredients } from '../api/spoonacular';
import { colors } from '../definitions/colors';
import { assets } from '../definitions/assets';
import { ButtonGroup } from 'react-native-elements';

const My = (props) => {
	const [filter, setFilter] = useState(0);
    const filters = ['Name', 'Aisle'];


    
    console.log(props);
    _searchIngredient = () => {
		console.log('Recherche d\'un ingredient...');
    }


	return (
        <View>
			<IngredientSearch/>
            <Button onPress={() => props.navigation.navigate('AddTo', {src: props.navigation.state.params.origin,})} title="Add ingredient" />
            <Text> My {props.navigation.state.params.origin} List From API !</Text>
		</View>
    );
}

My.navigationOptions = {
	title: 'My',
};

export default My;

const styles = StyleSheet.create({
	selectedButtonStyle: {
		backgroundColor: 'red',
	},
	selectedTextStyle: {
		color: 'orange',
		fontWeight: '900',
	},
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
	},
	buttonContainer: {
		flexDirection: 'row',
		margin: 10
	  },
	  button: {
		height: 20,
		width: 20,
		borderRadius: 10,
		borderWidth: 1,
		borderColor: '#DCDCDC',
		alignItems: 'center',
		justifyContent: 'center',
		marginRight: 20
	  },
	  checkedButton: {
		width: 14,
		height: 14,
		borderRadius: 7,
		backgroundColor:'#04549b'
	  }
});