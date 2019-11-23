import React from 'react';
import { colors } from '../definitions/colors';
import { View, Text, StyleSheet, Button } from 'react-native';

const Me = () => {
	return (
		<View style = { styles.container }>
<View style = {styles.side}>
</View>
			<View style = {styles.middle}>
				<View style = {styles.middleTop}>
					<View style = {styles.bt1}>
				<Button title="My fridge" />
					</View>	
					<View style = {styles.bt2}>
					<Button title="My list" />
					</View>	
					<View style = {styles.bt1}>
					<Button title="My recipes"/>
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
	container: {
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
		backgroundColor: 'purple',
		flexDirection: 'column',
		height: '100%'
	},
	middleBottom: {
		flex: 1,
		justifyContent: "center"
	},
	bt1:{
		flex: 1,
		color: colors.mainGreenColor,
		backgroundColor: colors.mainOrangeColor,
		justifyContent: "center"
		
	},
	bt2:{
		flex: 1,
		backgroundColor: colors.mainGreenColor,
		justifyContent: "center"
	},
});