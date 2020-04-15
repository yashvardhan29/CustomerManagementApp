import React from 'react';
import { Platform, SafeAreaView, Button, View} from 'react-native'
import {createAppContainer,createSwitchNavigator} from 'react-navigation'
import {createStackNavigator} from 'react-navigation-stack'
import {createDrawerNavigator,DrawerNavigatorItems} from 'react-navigation-drawer'
import { useDispatch } from 'react-redux';

import LoginScreen from '../screens/LoginScreen'
import HomeScreen from '../screens/HomeScreen'
import ProfileScreen from '../screens/ProfileScreen'
import DutyScreen from '../screens/DutyScreen'
import StartupScreen from "../screens/StartupScreen";
import AttendanceScreen from '../screens/Attendance/AttendanceScreen'
import MarkScreen from "../screens/Attendance/Mark";
import LeaveScreen from "../screens/Attendance/Leave";
import StatusScreen from "../screens/Attendance/Status";

import * as authActions from '../store/actions/auth';
import Colors from "../constants/Colors";
import AttendanceNavigator from "./Attendance/AttendanceNavigator";

const defaultNavOptions = {
    headerStyle: {
        backgroundColor: Platform.OS === 'android' ? Colors.primary : ''
    },
    headerTintColor: Platform.OS === 'android' ? 'white' : Colors.primary
};

const HomeStack = createStackNavigator(
    {Home : HomeScreen},
    {
        defaultNavigationOptions: defaultNavOptions
    }
);

const ProfileStack = createStackNavigator(
    {Profile : ProfileScreen},
    {navigationOptions : defaultNavOptions}
);

const DutyStack = createStackNavigator(
    {Duty : DutyScreen},
    {navigationOptions : defaultNavOptions}
);



const MainDrawerNavigator = createDrawerNavigator(
    {
            Home : {
              screen: HomeStack,
              navigationOptions:{
                drawerLabel: 'Home '
              }
            },
            Profile : {
              screen: ProfileStack,
              navigationOptions:{
                drawerLabel: 'Profile '
              }
            },
            Attendance : {
                screen: AttendanceNavigator,
                navigationOptions:{
                    drawerLabel: 'Attendance '
                }
            },
            Duty : {
              screen: DutyStack,
              navigationOptions:{
                drawerLabel: 'Duty Mode'
              }
            },
        },
    {
        contentOptions: {
            activeTintColor: Colors.primary
        },
        contentComponent: props => {
            const dispatch = useDispatch();
            return (
                <View style={{ flex: 1, paddingTop: 20 }}>
                    <SafeAreaView forceInset={{ top: 'always', horizontal: 'never' }}>
                        <DrawerNavigatorItems {...props} />
                        <View style = {{
                            alignItems: 'center',
                        }}>
                            <Button
                                title="Logout "
                                color={Colors.primary}
                                onPress={() => {
                                    dispatch(authActions.logout());
                                    // props.navigation.navigate('Auth');
                                }}
                            />
                        </View>
                    </SafeAreaView>
                </View>
            );
        }
    }
    );

const AuthNavigator = createStackNavigator(
    {Auth : LoginScreen},
    {defaultNavigationOptions : defaultNavOptions}
);

const MainNavigator = createSwitchNavigator({
    Startup : StartupScreen,
    Auth : AuthNavigator,
    MainApp : MainDrawerNavigator
});

export default  createAppContainer(MainNavigator);
