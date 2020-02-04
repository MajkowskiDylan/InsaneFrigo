import React from 'react';
import { Image, StyleSheet } from 'react-native';
import { createAppContainer } from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';
import { createBottomTabNavigator } from 'react-navigation-tabs';

import Me from '../components/Me';
import Search from '../components/Search';
import Settings from '../components/Settings';

import { colors } from '../definitions/colors';
import { assets } from '../definitions/assets';

// Navigation de l'onglet Me
const MeNavigation = createStackNavigator({
	Me: Me,
	// Liste des components accessibles depuis l'onglet Me
},
{
	initialRouteName: 'Me',
});

// Navigation de l'onglet Search
const SearchNavigation = createStackNavigator({
	Search: Search,
},
{
	initialRouteName: 'Search',
});

// Navigation de l'onglet Settings
const SettingsNavigation = createStackNavigator({
	Settings: Settings,
},
{
	initialRouteName: 'Settings',
});

// Barre de navigation
const TabNavigation = createBottomTabNavigator({
	Search: {
		screen: SearchNavigation,
		navigationOptions: {
			title: 'Search',
			tabBarIcon: ({focused}) => {
				if (focused) return <Image style = { styles.tabIcon } source = { assets.searchIcon }/>
				else return <Image style = { styles.tabIconUnselected } source = { assets.searchIcon }/>
			},
		},
	},
	Me: {
		screen: MeNavigation,
		navigationOptions: {
			title: 'Me',
			tabBarIcon: ({focused}) => {
				if (focused) return <Image style = { styles.tabIcon } source = { assets.userIcon }/>
				else return <Image style = { styles.tabIconUnselected } source = { assets.userIcon }/>
			},
		},
	},
	Settings: {
		screen: SettingsNavigation,
		navigationOptions: {
			title: 'Settings',
			tabBarIcon: ({focused}) => {
				if (focused) return <Image style = { styles.tabIcon } source = { assets.settingsIcon }/>
				else return <Image style = { styles.tabIconUnselected } source = { assets.settingsIcon }/>
			},
		},
	},
},{
	tabBarOptions: {
		activeBackgroundColor: colors.mainGreenColor,
		activeTintColor: 'white',
	},
	initialRouteName: 'Search',	// CHANGER ET METTRE 'ME'
});

export default createAppContainer(TabNavigation);

const styles = StyleSheet.create({
	tabIcon: {
		width: 20,
		height: 20,
		tintColor: 'white',
	},
	tabIconUnselected: {
		width: 20,
		height: 20,
		tintColor: 'black',
	}
});