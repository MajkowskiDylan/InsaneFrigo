import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { CheckBox, Button } from 'react-native-elements'
import Icon from 'react-native-vector-icons';

import { colors } from '../definitions/colors';
import { assets } from '../definitions/assets';

const Settings = () => {
	return (
		 <View style={{flex: 10, flexDirection: 'column'}}>
        	<View style = { styles.configuration }>
				<Text style ={styles.title}	>Configuration</Text>
				<CheckBox title = 'Add ingredients removed from the fridge to the shopping list.' />
				<CheckBox title = 'When adding an ingredient to the fridge from the shopping liste remove it from the shopping list.' />
			</View>
			<View style = { styles.api}>
				<Text style ={styles.title}>API</Text>
				<Text style ={styles.txt}>API's credits remaining:</Text>
				<Text style ={styles.txt}>Last updates:</Text>
			</View>
			<View style = { styles.clearData }>
				<View style = { styles.clearDataSub }>
					<Button title = 'Clear Data'  style = {styles.button } icon={{name: "delete-forever", size: 30, color: "white"}} />
				</View>
			</View>
      </View>
	);
}

Settings.navigationOptions = {
	title: 'Settings',
};

export default Settings;

const styles = StyleSheet.create({
	configuration: {
		margin:10,
		flex:3,
	},
	api: {
		margin:10,
		flex:3,
	},
	clearData: {
		flex : 4, 
		alignSelf: 'stretch', 
        alignItems: 'center',
	},
	clearDataSub: {
		margin:10,
		width :180,
	},
	button: {
		color: colors.mainOrangeColor,
	},
	title:{
		fontSize : 30,
		fontWeight :"bold",
		color : colors.mainOrangeColor,
	},
	txt :{
		margin : 5,
		marginLeft : 10
	}
});