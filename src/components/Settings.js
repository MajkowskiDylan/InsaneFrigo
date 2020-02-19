import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { CheckBox, Button } from 'react-native-elements'
import { connect } from 'react-redux';
import Icon from 'react-native-vector-icons';

import { colors } from '../definitions/colors';
import { assets } from '../definitions/assets';

const Settings = ({quota, settingPreferance, dispatch}) => {

	_updateQuota = async () => {
	const action = { type: 'UPDATE', value: 300 };
		dispatch(action);
	}
	_addQuota = async () => {
	const action = { type: 'CHANGE', value: 1 };
		dispatch(action);
	}

     _updateFtoL= async () => {
	const action = { type: 'UPFTOL', value: !(settingPreferance.FtoL) };
		dispatch(action);
	}
	_updateLtoF= async () => {
	const action = { type: 'UPLTOF', value: !(settingPreferance.LtoF) };
		dispatch(action);
    }
	return (
		 <View style={{flex: 10, flexDirection: 'column'}}>
        	<View style = { styles.configuration }>
				<Text style ={styles.title}	>Configuration</Text>
				<CheckBox checked={settingPreferance.FtoL} onPress={this._updateFtoL} title = 'Add ingredients removed from the fridge to the shopping list.' />
				<CheckBox checked={settingPreferance.LtoF} onPress={this._updateLtoF} title = 'When adding an ingredient to the fridge from the shopping liste remove it from the shopping list.' />
			</View>
			<View style = { styles.api}>
				<Text style ={styles.title}>API </Text>
				<Text style ={styles.txt}>API's credits remaining : <Text style={{fontWeight: 'bold'}}> {quota.quota} token</Text></Text>
				<Text style ={styles.txt}>Last updates: <Text style={{fontWeight: 'bold'}}> {quota.date} </Text></Text>
			</View>
			<View style = { styles.clearData }>
				<View style = { styles.clearDataSub }>
					<Button title = 'Clear Data'  style = {styles.button } icon={{name: "delete-forever", size: 30, color: "white"}} onPress= {this._addQuota} />
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