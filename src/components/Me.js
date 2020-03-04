import React from 'react';
import { View, Text, StyleSheet,Image, navigation, TouchableHighlight, TouchableOpacity  } from 'react-native';
import { Button } from 'react-native-elements'

import MyRecipes from './SavedRecipes';

import { colors } from '../definitions/colors';
import { assets } from '../definitions/assets';

const Me = ({navigation}) => {
	return (
		<View style = { styles.mainView }>
			<View style = {styles.side}>
			</View>
			<View style = {styles.middle}>
				<View style = {styles.middleTop}>
					<View style = {styles.btn}>
						<Button buttonStyle={{height:70, backgroundColor : colors.mainBlueColor}} titleStyle={{fontSize: 20}} icon={{name: "kitchen", size: 30, color: "white"}} onPress={() => navigation.navigate('My', {origin: "Fridge"})}  title="My Fridge" />
					</View>
					<View style = {styles.btn}>
						<Button buttonStyle={{height:70, backgroundColor : colors.mainBlueColor}} titleStyle={{fontSize: 20}} icon={{name: "shopping-cart", size: 30, color: "white"}} onPress={() => navigation.navigate('My', {origin: "ShoppingList"})} title="My List" />
					</View>	
					<View style = {styles.btn}>
						<Button buttonStyle={{height:70, backgroundColor : colors.mainBlueColor}} titleStyle={{fontSize: 20}} icon={{name: "collections-bookmark", size: 30, color: "white"}} onPress={() => navigation.navigate('SavedRecipes')} title="My Recipes"/>
					</View>
				</View>
			<View style = {styles.middleBottom}></View>
			</View>
			<View style = {styles.side}>
			</View>
		</View>
	);
}

Me.navigationOptions = {
	title: 'Me',
};

export default Me;

const styles = StyleSheet.create({
	mainView: {
		flex: 1,
		flexDirection: 'row'
	},
	side: {
		flex: 2
	},
	middle: {
		flex: 3,
		flexDirection: 'column'
	},
	middleTop: {
		flex: 1,
		flexDirection: 'column',
		height: '100%'
	},
	middleBottom: {
		flex: 1,
		justifyContent: "center"
	},
	btn:{
		flex: 1,
		justifyContent: "center"
		
	}
});