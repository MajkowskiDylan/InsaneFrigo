import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { CheckBox, Button } from 'react-native-elements'
import { connect } from 'react-redux';
import { Alert} from 'react-native'

import { colors } from '../definitions/colors';
import { assets } from '../definitions/assets';

const Settings = ({quota, settingPreferance, dispatch}) => {
	
     _updateFtoL= async () => {
	const action = { type: 'UPFTOL', value: !(settingPreferance.FtoL) };
		dispatch(action);
	}
	_updateLtoF= async () => {
	const action = { type: 'UPLTOF', value: !(settingPreferance.LtoF) };
		dispatch(action);
	}
	
	_reset = ( ) =>{
		Alert.alert( 'Caution','Are you sur to clear all data ?',[{text: 'Yes', onPress: () => {_clear()}}, {text: 'no', onPress: () => {}}]);
	}

	_clear = async( ) =>{
		const action1 = { type: 'RESET_RECIPE', value: !(settingPreferance.LtoF) };
		dispatch(action1);
		const action2 = { type: 'RESET_SETTING', value: !(settingPreferance.LtoF) };
		dispatch(action2);
		const action3 = { type: 'RESET_INGREDIENT', value: !(settingPreferance.LtoF) };
		dispatch(action3);
	}

	return (
		 <View style={styles.mainView}>
        	<View style = { styles.configuration }>
				<Text style ={styles.title}	>Configuration</Text>
				<CheckBox checked={settingPreferance.FtoL} onPress={this._updateFtoL} checkedColor={colors.mainOrangeColor} title = 'Add ingredients removed from the fridge to the shopping list.' />
				<CheckBox checked={settingPreferance.LtoF} onPress={this._updateLtoF} checkedColor={colors.mainOrangeColor} title = 'When adding an ingredient to the fridge from the shopping liste remove it from the shopping list.' />
			</View>
			<View style = { styles.api}>
				<Text style ={styles.title}>API </Text>
				<Text style ={styles.txt}>API's credits remaining : <Text style={{fontWeight: 'bold', color: colors.mainOrangeColor}}> {quota.quota} token</Text></Text>
				<Text style ={styles.txt}>Last updates: <Text style={{fontWeight: 'bold', color: colors.mainOrangeColor}}> {quota.date} </Text></Text>
			</View>
			<View style = { styles.clearData }>
				<View style = { styles.clearDataSub }>
					<Button title = 'Clear Data' buttonStyle={{ backgroundColor : colors.mainOrangeColor}} style = {styles.button } icon={{name: "delete-forever", size: 30, color: "white"}} onPress= {this._reset} />
				</View>
			</View>
      </View>
	);
}

Settings.navigationOptions = {
	title: 'Settings',
};

const mapStateToProps = (state) => {
	return {
	  quota: state.updateQuota,
	  settingPreferance: state.settingPreferance
	}
  }
  
export default connect(mapStateToProps)(Settings);

const styles = StyleSheet.create({
	mainView: {
		flex: 1,
		flexDirection: 'column',
		padding: 10,
	},
	configuration: {
		marginTop:10,
		flex:1,
	},
	api: {
		marginTop:40,
		flex:1,
	},
	clearData: {
		flex : 1, 
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
		fontSize : 20,
		fontWeight :"bold",
		color : colors.mainGreenColor,
	},
	txt :{
		margin : 5,
		marginLeft : 10
	}
});