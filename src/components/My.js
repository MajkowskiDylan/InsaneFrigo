import React, { useState, Component } from 'react';
import { View, Text, StyleSheet, TextInput, TouchableHighlight, Image, FlatList, navigation } from 'react-native';
import { Button} from 'react-native-elements'


import IngredientSearch from './IngredientSearch';
import MyItem from './MyItem';
import { getIngredients } from '../api/spoonacular';

import { colors } from '../definitions/colors';
import { assets } from '../definitions/assets';


const My = ({navigation}) => {
	const origine = navigation.state.params.origin;
	// params.origin fait référence à la page d'origine, par exemple si on a cliqué sur My Fridge ou My Shopping List dans la page Me.js
	return (
		<View style = { styles.all }>
			<IngredientSearch myOrigin={origine} addTo={false}/>
			<View style={ styles.bot} >
				<Button buttonStyle={{height:32}} titleStyle={{fontSize: 15}} onPress={() => navigation.navigate('AddTo', {src: origine,})} title="Add ingredient" icon={{name: "add", size: 28, color: "white"}} />
			</View>
		</View>
    );
}

export default My;

My.navigationOptions = {
	title: 'My Fridge / Shopping List ',
};


const styles = StyleSheet.create({
	all: {
		flex:1,
		alignItems: 'center',
        justifyContent: 'center',
	  },
	bot: {
		width:'100%',
		position: 'absolute',
		bottom:0
	}
});