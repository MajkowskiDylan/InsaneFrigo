import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

const Search = () => {
	return (
		<View style = { styles.container }>
			<Text>Recherche</Text>
		</View>
	);
}

Search.navigationOptions = {
	title: 'Search',
};

export default Search;

const styles = StyleSheet.create({
	container: {
		flex: 1,
		alignItems: 'center',
		justifyContent: 'center',
	},
});