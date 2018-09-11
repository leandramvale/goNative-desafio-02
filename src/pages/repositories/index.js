import React, { Component } from 'react';
import {
  View,
  TextInput,
  TouchableOpacity,
  ActivityIndicator,
  AsyncStorage,
  FlatList,
  StatusBar,
} from 'react-native';

import PropTypes from 'prop-types';
import Icon from 'react-native-vector-icons/FontAwesome';

import api from 'services/api';

import RepositoryItem from './components/RepositoryItem';
import styles from './styles';

export default class Repositories extends Component {
  static navigationOptions = {
    title: 'Repositories',
  };

  static propTypes = {
    navigation: PropTypes.shape({
      dispatch: PropTypes.func,
    }).isRequired,
  };

  state = {
    repository: 'react-community/react-navigation',
    data: [],
    loading: false,
    refreshing: false,
    errorMessage: null,
  }

  componentDidMount() {
    this.loadRepositories();
  }

  loadRepositories = async () => {
    this.setState({ refreshing: true });

    setTimeout(async () => {
      const existingRespositorys = await AsyncStorage.getItem('@Githuber:repositories');
      let newRepository = JSON.parse(existingRespositorys);
      if (!newRepository) {
        newRepository = [];
      }

      this.setState({
        data: newRepository,
        // loading: false,
        refreshing: false,
      });
    }, 4000);
  };

  renderListItem = ({ item }) => (
    <RepositoryItem repository={item} navigation={this.props.navigation} />
  )

  // exemplo busca: rocketseat/rocketseat.com.br
  checkAndSaveRepository = async (busca) => {
    const repository = await api.get(`repos/${busca}`);

    // console.tron.log(repository);

    const itemRepository = {
      id: repository.data.id,
      nome: repository.data.name,
      organizacao: repository.data.full_name,
      avatar: repository.data.owner.avatar_url,
    };

    // console.tron.log(itemRepository);

    const existingRespositorys = await AsyncStorage.getItem('@Githuber:repositories');
    let newRepository = JSON.parse(existingRespositorys);
    if (!newRepository) {
      newRepository = [];
    }
    newRepository.push(itemRepository);

    await AsyncStorage.setItem('@Githuber:repositories', JSON.stringify(newRepository));

    this.loadRepositories();

    return repository;
  }


  issueIn = async () => {
    // console.tron.log(this.props);
    // console.tron.log(this.state);

    const { repository } = this.state;

    if (repository.length === 0) return;

    this.setState({ loading: true });

    try {
      await this.checkAndSaveRepository(repository);
      this.setState({ loading: false });
    } catch (err) {
      // erro
      this.setState({ loading: false, errorMessage: 'Repositório não existe!' });
    }
  };

  render() {
    return (
      <View style={styles.container}>
        <StatusBar barStyle="light-content" />
        <View style={styles.busca}>
          <TextInput
            style={styles.input}
            autoCapitalize="none"
            autoCorrect={false}
            placeholder="repositorio"
            underlineColorAndroid="rgba(0, 0, 0, 0)"
            value={this.state.repository}
            onChangeText={repository => this.setState({ repository })}
          />
          <TouchableOpacity style={styles.button} onPress={() => { this.issueIn(); }}>
            { this.state.loading
              ? <ActivityIndicator size="small" color="#333333" />
              : <Icon name="plus-circle" size={20} color="#333333" /> }
          </TouchableOpacity>
        </View>
        <View style={styles.lista}>
          <FlatList
            data={this.state.data}
            keyExtractor={item => String(item.id)}
            renderItem={this.renderListItem}
            onRefresh={this.loadRepositories}
            refreshing={this.state.refreshing}
          />
        </View>
      </View>
    );
  }
}
