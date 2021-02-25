import React, { useState, useEffect, useCallback } from 'react';
import { View, Text, StyleSheet, Switch } from 'react-native';
import { HeaderButtons, Item } from 'react-navigation-header-buttons';
import HeaderButton from '../components/headerButtons';
import colors from '../constants/colors';
import { useDispatch } from 'react-redux';
import { setFilters } from '../store/actions/meals';

const FilterSwitch = props => {
    return (
        <View style={Styles.filterContainer}>
            <Text>{props.label}</Text>
            <Switch
                trackColor={{ true: 'rgba(74, 20, 140, 0.8)', false: 'rgba(74, 20, 140, 0.3)' }}
                thumbColor={colors.primaryColor}
                value={props.state}
                onValueChange={props.onChange}
            />
        </View>
    );
};

const FilterScreen = props => {
    const {navigation} = props;
    const [isGlutenFree, setGlutenFree] = useState(false);
    const [isLactoseFree, setIsLactoseFree] = useState(false);
    const [isVegan, setIsVegan] = useState(false);
    const [isVegetarian, setIsVegetarian] = useState(false);

    const dispatch = useDispatch();

    const saveFilters = useCallback(() => {
        const appliedFilters = {
            glutenFree: isGlutenFree,
            lactoseFree: isLactoseFree,
            vegan: isVegan,
            vegetarian: isVegetarian
        };
        dispatch(setFilters(appliedFilters));
    }, [isGlutenFree, isLactoseFree, isVegan, isVegetarian, dispatch]);

    useEffect(() => {
        navigation.setParams({ save: saveFilters })
    }, [saveFilters]);
    
    return (
        <View style={Styles.screen}>
            <Text style={Styles.title}>Available Filters / Restrictions</Text>
            <FilterSwitch state={isGlutenFree} label='Gluten-free' onChange={newValue => setGlutenFree(newValue)} />
            <FilterSwitch state={isLactoseFree} label='Lactose-Free' onChange={newValue => setIsLactoseFree(newValue)} />
            <FilterSwitch state={isVegan} label='Vegan' onChange={newValue => setIsVegan(newValue)} />
            <FilterSwitch state={isVegetarian} label='Vegetarian' onChange={newValue => setIsVegetarian(newValue)} />
        </View>
    )
}

FilterScreen.navigationOptions = (navData) => {
    return {
        headerTitle: "Fliters Screen",
        headerLeft: () => (
            <HeaderButtons HeaderButtonComponent={HeaderButton}>
                <Item title="Menu" iconName='ios-menu' onPress={() => {
                    navData.navigation.toggleDrawer();
                }} />
            </HeaderButtons>
        ),
        headerRight: () => (
            <HeaderButtons HeaderButtonComponent={HeaderButton}>
                <Item title="Save"
                    iconName='ios-save' 
                    onPress={navData.navigation.getParam('save')}
                    />
            </HeaderButtons>
        )
    }
};

const Styles = StyleSheet.create({
    screen: {
        flex: 1,
        alignItems: 'center'
    },
    title: {
        fontFamily: 'open-sans-bold',
        fontSize: 22,
        margin: 20,
        textAlign: 'center'
    },
    filterContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        width: '80%',
        marginVertical: 10
    }
})

export default FilterScreen;