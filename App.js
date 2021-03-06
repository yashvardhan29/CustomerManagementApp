import React, { Component } from 'react';
import { enableScreens } from 'react-native-screens';
import { createStore, combineReducers, applyMiddleware } from 'redux';
import { Provider } from 'react-redux';
import ReduxThunk from 'redux-thunk';
import TodoStore from './data/TodoStore';
import NavigationContainer from "./navigation/NavigationContainer";
import profileReducer from './store/reducers/profile';
import productsReducer from './store/reducers/products';

import * as Permissions from 'expo-permissions';

enableScreens();

const rootReducer = combineReducers(
    {
        profile : profileReducer,
        products : productsReducer,
    });

const store  = createStore(rootReducer,applyMiddleware(ReduxThunk));

export default class App extends Component {

  async componentWillMount() {
    await this._askForCalendarPermissions();
    await this._askForReminderPermissions();
    await this._askForLocationPermissions();
  }

  _askForCalendarPermissions = async () => {
    await Permissions.askAsync(Permissions.CALENDAR);
  };

  _askForLocationPermissions = async () => {
    await Permissions.askAsync(Permissions.LOCATION);
  };

  _askForReminderPermissions = async () => {
    if (Platform.OS === 'android') {
      return true;
    }

    await Permissions.askAsync(Permissions.REMINDERS);
  };

  	render() {
  		return (
	        <Provider store={store}>
	            <NavigationContainer />
	        </Provider>
    	);
  	}
    
}
