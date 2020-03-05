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
				<Button
					buttonStyle={ styles.btnStyle} 
					style = {styles.button } 
					icon={{name: "add", size: 40, color: "white"}}
					onPress={() => navigation.navigate('AddTo', {reload:reload, src: origine, filter:filter, saveFilter:_saveFilter, searchTerm:searchTerm, saveSearchTerm:_saveSearchTerm})} 
					/>
			</View>
		</View>
    );
}


My.navigationOptions = {
	title: 'My',
};

const mapStateToProps = (state) => {
	return {
    updateIngredients: state.updateIngredients
	}
}

export default connect(mapStateToProps)(My);


const styles = StyleSheet.create({
	all: {
		flex:1,
		alignItems: 'center',
        justifyContent: 'center',
	  },
	bot: {
		alignItems: 'flex-end',
		width:'100%',
		position: 'absolute',
		bottom:20,
		right:20
	},
	btnStyle: {
		width:60,
		height:60,
		borderRadius:30,
		padding:0,
		shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 5,
        },
        shadowOpacity: 0.8,
        shadowRadius: 5,
		elevation: 10,
		backgroundColor: colors.mainGreenColor,
	}
});