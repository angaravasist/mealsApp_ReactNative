import React from 'react';
import { Platform, StyleSheet, Text, View } from 'react-native';
import { useSelector } from 'react-redux';
import MealList from '../components/MealList';
import { HeaderButtons, Item } from 'react-navigation-header-buttons';
import HeaderButton from '../components/headerButtons';
import Colors from '../constants/colors';
import defaultFonts from '../constants/defaultFonts';

const FavoritesScreen = props => {
    const favMeals = useSelector(state => state.meals.favoriteMeals);

    if(favMeals.length === 0 || !favMeals) {
        return (
            <View style={Styles.content}>
                <Text style={defaultFonts.openSans}>No favorite meals found, start adding some!</Text>
            </View>
        )
    }

    return <MealList listData={favMeals} navigation={props.navigation} />
}

FavoritesScreen.navigationOptions = (navData) => {
    return {
        headerTitle: "You're Favorites",
        headerLeft: () => (
            <HeaderButtons HeaderButtonComponent={HeaderButton}>
                <Item title="Menu" iconName='ios-menu' onPress={() => {
                    navData.navigation.toggleDrawer();
                }} />
            </HeaderButtons>
        ),
        headerStyle: {
            backgroundColor: Platform.OS === 'android' ? Colors.accentColor : ''
        },
    }
};

const Styles = StyleSheet.create({
    screen: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    },
    content: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    }
})

export default FavoritesScreen;