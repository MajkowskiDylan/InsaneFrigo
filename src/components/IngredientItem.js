import React from 'react';
import { View, StyleSheet, Image, Text, TouchableOpacity } from 'react-native';
import { connect } from 'react-redux';

import { colors } from '../definitions/colors';
import { assets } from '../definitions/assets';

const IngredientItem = ({original, image}) => {

	return (
        <Text>{original}</Text>
	);
}

export default IngredientItem;

const styles = StyleSheet.create({
	mainView: {
        flex: 1,
    }
});