import React, { useState, Component } from 'react';
import { View, Text, StyleSheet, TextInput, TouchableHighlight, Image, Button, TouchableWithoutFeedback, TouchableOpacity, navigation, FlatList } from 'react-native';
	
import { colors } from '../definitions/colors';
import { assets } from '../definitions/assets';
import IngredientSearch from './IngredientSearch';
import MyItem from './MyItem';

const AddTo = (props) => {
	const params = props.navigation.state.params;
	console.log(props);
	return (
		<View>
			<Text> Je viens de { params.src } </Text>
			<IngredientSearch/>
            </View>
    );
}

AddTo.navigationOptions = {
	title: 'Add to',
};

export default AddTo;