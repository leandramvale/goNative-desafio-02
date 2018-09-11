import React, { Component } from 'react';
import {
  View,
  Text,
  Image,
  TouchableOpacity,
} from 'react-native';
import { StackActions, NavigationActions } from 'react-navigation';
import PropTypes from 'prop-types';

import Icon from 'react-native-vector-icons/FontAwesome';
import styles from './styles';

export default class RepositoryItem extends Component {
  static propTypes = {
    navigation: PropTypes.shape({
      dispatch: PropTypes.func,
    }).isRequired,
    repository: PropTypes.shape({
      nome: PropTypes.string,
      organizacao: PropTypes.string,
      avatar: PropTypes.string,
    }).isRequired,
  };

  issue = async ({ busca }) => {
    // console.tron.log(busca);
    try {
      // rota
      const resetAction = StackActions.reset({
        index: 0,
        actions: [NavigationActions.navigate({ routeName: 'Issues', params: { buscaIssues: busca } })],
      });
      this.props.navigation.dispatch(resetAction);
    } catch (err) {
      // erro
    }
  };


  render() {
    // console.tron.log(this.props);

    const { repository } = this.props;

    return (
      <View style={styles.container}>
        <View style={styles.imageContainer}>
          <Image style={styles.avatar} source={{ uri: repository.avatar }} />
        </View>
        <View style={styles.infoContainer}>
          <Text style={styles.repoTitle}>{repository.nome}</Text>
          <Text style={styles.infoText}>{repository.organizacao}</Text>
        </View>
        <View style={styles.iconContainer}>
          <TouchableOpacity
            style={styles.button}
            onPress={() => { this.issue({ busca: repository.organizacao }); }}
          >
            <Icon name="angle-right" size={20} style={styles.infoIcon} />
          </TouchableOpacity>
        </View>
      </View>
    );
  }
}
