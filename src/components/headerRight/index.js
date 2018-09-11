import React, { Component } from 'react';
import { TouchableOpacity, AsyncStorage } from 'react-native';
import { StackActions, NavigationActions } from 'react-navigation';
import PropTypes from 'prop-types';

import Icon from 'react-native-vector-icons/FontAwesome';

import styles from './styles';

export default class HeaderRight extends Component {
  static propTypes = {
    navigation: PropTypes.shape({
      dispatch: PropTypes.func,
    }).isRequired,
  };

  signOut = async () => {
    // deslogar o usuário.
    await AsyncStorage.clear();

    // rota
    const resetAction = StackActions.reset({
      index: 0,
      actions: [NavigationActions.navigate({ routeName: 'Repositories' })],
    });
    this.props.navigation.dispatch(resetAction);
  }

  render() {
    return (
      <TouchableOpacity style={styles.button} onPress={() => { this.signOut(); }}>
        <Icon name="exchange" size={16} style={styles.icon} />
      </TouchableOpacity>
    );
  }
}
