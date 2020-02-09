import React from 'react';
import { colors } from '../definitions/colors';
import { View, Text, StyleSheet,Image, Button, navigation, TouchableHighlight } from 'react-native';
import { assets } from '../definitions/assets';
import MyFridge from './Fridge';
import MyShoppingList from './ShoppingList';
import MyRecipes from './SavedRecipes';

const Me = ({navigation}) => {
	return (
		<View style = { styles.mainView }>
			<View style = {styles.side}>
			</View>
			<View style = {styles.middle}>
				<View style = {styles.middleTop}>
					<View style = {styles.btn}>
					<Button onPress={() => navigation.navigate('Fridge')}  title="My Fridge" />
					</View>
					<View style = {styles.btn}>
						<Button onPress={() => navigation.navigate('ShoppingList')} title="My Shopping List" />
					</View>	
					<View style = {styles.btn}>
						<Button onPress={() => navigation.navigate('SavedRecipes')} title="Saved Recipes"/>
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
		
	},
});