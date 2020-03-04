import React, { useState, Component } from 'react';
import { View, Text, StyleSheet, TextInput, TouchableHighlight, Image, FlatList, navigation } from 'react-native';
import { Button} from 'react-native-elements'
import { connect } from 'react-redux';


import IngredientSearch from './IngredientSearch';
import MyItem from './MyItem';
import { getIngredients } from '../api/spoonacular';

import { colors } from '../definitions/colors';
import { assets } from '../definitions/assets';


const My  = ({navigation, updateIngredients}) => {
	const origine = navigation.state.params.origin
	
	const [filter, setFilter] = useState(0);

	_saveFilter = async(sort) => {
		await setFilter(sort);
	}

	const [searchTerm, setSearchTerm] = useState("");

	_saveSearchTerm = async(sort) => {
		await setSearchTerm(sort);
		console.log("filter mageule = " + searchTerm)
	}

	triggerChildAlert = () => {
        this.refs.child.showAlert();
    }

	reload = () => {
		
	}

	// params.origin fait référence à la page d'origine, par exemple si on a cliqué sur My Fridge ou My Shopping List dans la page Me.js
	return (
		<View style = { styles.all }>
			<IngredientSearch updateIngredients={updateIngredients} myOrigin={origine} addTo={false} filter={filter} saveFilter={_saveFilter} stringSearch={searchTerm} saveStringSearch={_saveSearchTerm} reload={reload}/>
			<View style={ styles.bot} >
				<Button buttonStyle={{height:32}} titleStyle={{fontSize: 15}} onPress={() => navigation.navigate('AddTo', {reload:reload, src: origine, filter:filter, saveFilter:_saveFilter, searchTerm:searchTerm, saveSearchTerm:_saveSearchTerm})} title="Add ingredient" icon={{name: "add", size: 28, color: "white"}} />
				<Button onClick={this.triggerChildAlert} title="click"/>
			</View>
		</View>
    );
}


const mapStateToProps = (state) => {
	return {
    updateIngredients: state.updateIngredients
	}
}

export default connect(mapStateToProps)(My);

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
		marginTop:60,
		width:'100%',
		position: 'absolute',
		bottom:0
	}
});