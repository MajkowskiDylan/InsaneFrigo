
import React, { useState, useEffect, Component } from 'react';
import { View, Text, StyleSheet, TextInput, TouchableHighlight, Image, Button, TouchableWithoutFeedback, TouchableOpacity, navigation, FlatList } from 'react-native';
	
import { colors } from '../definitions/colors';
import { assets } from '../definitions/assets';
import IngredientSearch from './IngredientSearch';
import MyItem from './MyItem';

const AddTo = (props) => {
	const src = props.navigation.state.params.src;
	return (
		<View>
			<IngredientSearch addTo={src}/>
    	</View>
    );
}

AddTo.navigationOptions = {
	title: 'Add to',
};

export default AddTo;