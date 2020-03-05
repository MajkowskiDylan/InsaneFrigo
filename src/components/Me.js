import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image  } from 'react-native';

import { colors } from '../definitions/colors';
import { assets } from '../definitions/assets';

const Me = ({navigation}) => {
	return (
		<View style = { styles.mainView }>
			<View style = {styles.btns}>
				<TouchableOpacity style = {styles.btn} onPress = {() => navigation.navigate('My', {origin: "Fridge"}) } >
					<View style = {styles.btnIcon}>
						<Image style = {styles.icon} source = {assets.fridgIcon}/>
					</View>
					<Text style = {styles.btnText}>My Fridge</Text>
				</TouchableOpacity>

				<TouchableOpacity style = {styles.btn} onPress = {() => navigation.navigate('My', {origin: "ShoppingList"}) } >
					<View style = {styles.btnIcon}>
						<Image style = {styles.icon} source = {assets.shoppingIcon}/>
					</View>
					<Text style = {styles.btnText}>My List</Text>
				</TouchableOpacity>

				<TouchableOpacity style = {styles.btn} onPress = {() => navigation.navigate('SavedRecipes') } >
					<View style = {styles.btnIcon}>
						<Image style = {styles.icon} source = {assets.heartIcon}/>
					</View>
					<Text style = {styles.btnText}>My Recipes</Text>
				</TouchableOpacity>
			</View>
			<View style = {styles.fond}>
				<Image style = { styles.img } source = { assets.fond } />
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
		paddingTop: 20,
	},
	btn:{
		width: 340,
		height: 60,
		margin: 10,
		backgroundColor: colors.mainGreenColor,
		flexDirection: 'row',
	},
	btnIcon: {
		flex: 1,
		justifyContent: "center",
	},
	icon: {
		left: 100,
		width: 30,
		height: 30,
		tintColor: colors.mainWhiteColor,
	},
	btnText: {
		left: 50,
		flex: 2,
		fontSize: 15,
		fontWeight: 'bold',
		textAlignVertical: "center",
		color: colors.mainWhiteColor,
	},
	fond: {

	},
	img: {
		width: 360,
		height: 400,
	}
});