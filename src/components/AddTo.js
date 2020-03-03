
import React, { useState, useEffect, Component } from 'react';
import { View, Text, StyleSheet, TextInput, TouchableHighlight, Image, Button, TouchableWithoutFeedback, TouchableOpacity, navigation, FlatList } from 'react-native';
	
import { colors } from '../definitions/colors';
import { assets } from '../definitions/assets';
import IngredientSearch from './IngredientSearch';
import MyItem from './MyItem';

const AddTo = ({navigation}) => {
	const src = navigation.state.params.src;
	const callBack = navigation.state.params.refresh;
	return (
		<View>
			<IngredientSearch addTo={true} myOrigin={src} refresh={callBack}/>
    	</View>
    );
}

AddTo.navigationOptions = {
	title: 'Add to',
};

export default AddTo;