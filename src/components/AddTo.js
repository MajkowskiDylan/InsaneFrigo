
import React, { useState, useEffect, Component } from 'react';
import { View, Text, StyleSheet, TextInput, TouchableHighlight, Image, Button, TouchableWithoutFeedback, TouchableOpacity, navigation, FlatList } from 'react-native';
	
import { colors } from '../definitions/colors';
import { assets } from '../definitions/assets';
import IngredientSearch from './IngredientSearch';
import MyItem from './MyItem';

const AddTo = ({navigation}) => {
	const src = navigation.state.params.src;
	const filterBis = navigation.state.params.filter;
	const _saveFilterBis = navigation.state.params.saveFilter;
	const searchTermBis = navigation.state.params.searchTerm;
	const _saveSearchTermBis = navigation.state.params.saveSearchTerm;

	const reload = navigation.state.params.reload;

	const [filter, setFilter] = useState(filterBis);

	_saveFilter = async(sort) => {
		setFilter(sort);
		_saveFilterBis(sort);
	}

	const [searchTerm, setSearchTerm] = useState(searchTermBis);

	_saveSearchTerm = async(sort) => {
		setSearchTerm(sort);
		_saveSearchTermBis(sort);
	}

	return (
		<View>
			<IngredientSearch addTo={true} myOrigin={src} filter={filter} saveFilter={_saveFilter} stringSearch={searchTerm} saveStringSearch={_saveSearchTerm} reload={reload}/>
    	</View>
    );
}

AddTo.navigationOptions = {
	title: 'Add to',
};

export default AddTo;