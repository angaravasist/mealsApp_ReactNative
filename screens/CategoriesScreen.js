import React from 'react';
import { View, Text, StyleSheet, FlatList, TouchableOpacity, Platform, TouchableNativeFeedback } from 'react-native';
import { CATEGORIES } from '../data/dummy-data';
import { HeaderButtons, Item } from 'react-navigation-header-buttons';
import HeaderButton from '../components/headerButtons';

const CategoriesScreen = props => {
    let Touchablecmp = TouchableOpacity;
    if (Platform.OS === 'android') {
        Touchablecmp = TouchableNativeFeedback
    }
    const rederGridItem = (itemData) => {
        return (
            <View style={Styles.gridItem}>
                <Touchablecmp onPress={() => {
                    props.navigation.navigate('CategoryMeals', { categoryId: itemData.item.id });
                }}>
                    <View style={{ ...Styles.container, ...{ backgroundColor: itemData.item.color } }}>
                        <Text style={Styles.title} numberOfLines={2}>{itemData.item.title}</Text>
                    </View>
                </Touchablecmp>
            </View>
        );
    }
    return (
        <FlatList data={CATEGORIES} renderItem={rederGridItem} numColumns={2} />
    );
};

CategoriesScreen.navigationOptions = (navData) => {
    return {
        headerTitle: 'Meal Categories',
        headerLeft: () => (
            <HeaderButtons HeaderButtonComponent={HeaderButton}>
                <Item title="Menu" iconName='ios-menu' onPress={() => {
                    navData.navigation.toggleDrawer();
                }} />
            </HeaderButtons>
        )
    }
};

const Styles = StyleSheet.create({
    gridItem: {
        flex: 1,
        margin: 15,
        height: 150,
        borderRadius: 10,
        overflow: Platform.OS === 'android' && Platform.Version >= 21 ? 'hidden' : 'visible',
        elevation: 5,
    },
    container: {
        flex: 1,
        borderRadius: 10,
        shadowColor: 'black',
        shadowOpacity: 0.26,
        shadowOffset: { width: 0, height: 2 },
        shadowRadius: 10,
        padding: 15,
        justifyContent: 'flex-end',
        alignItems: 'flex-end'
    },
    title: {
        fontFamily: 'open-sans-bold',
        fontSize: 22,
        textAlign: 'right'
    }
})

export default CategoriesScreen;