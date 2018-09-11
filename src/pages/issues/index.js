import React, { Component } from 'react';
import {
  View,
  ActivityIndicator,
  FlatList,
  AsyncStorage,
} from 'react-native';

import PropTypes from 'prop-types';

import api from 'services/api';

// import LogoTitle from 'components/logoTitle';
import IssueItem from './components/IssueItem';
import styles from './styles';


export default class Issues extends Component {
  static navigationOptions = ({ navigation }) => {
    const { params } = navigation.state;
    return {
      tabBarOnPress({ jumpToIndex, scene }) {
        // perform your logic here
        // console.tron.log(scene.index);
        // this.setFiltroTab(scene.index);
        // this is mandatory to perform the actual switch
        // you can omit this if you want to prevent it
        // jumpToIndex(this.getFiltroTab());
        // now we have access to Component methods
        params.onTabFocus(jumpToIndex, scene);
        // jumpToIndex(this.getFiltroTab());
      },
    };
  };

  static propTypes = {
    navigation: PropTypes.shape({
      dispatch: PropTypes.func,
    }).isRequired,
  };

  state = {
    buscaIssues: this.props.navigation.state.params.buscaIssues,
    data: [],
    loading: true,
    refreshing: false,
  }

  componentDidMount() {
    this.props.navigation.setParams({
      onTabFocus: async ({ jumpToIndex, scene }) => {
        // perform your logic here
        console.log(scene.index);
        this.setFiltroTab(scene.index);
        jumpToIndex(scene.index);
      },
    });
    console.tron.log('teste');
    this.loadIssues();
  }

  setFiltroTab = async (index) => {
    console.tron.log(index);
    await AsyncStorage.setItem('@Githuber:filtro', index);
  }

  getFiltroTab = async () => {
    const filtro = await AsyncStorage.getItem('@Githuber:filtro');
    console.tron.log(filtro);
    return filtro;
  }

  loadIssues = async () => {
    this.setState({ refreshing: true });

    setTimeout(async () => {
      const filtro = this.props.navigation.state.key;
      let filtroIssue = '';

      if (filtro === 'Abertas') {
        filtroIssue = 'open';
      }

      if (filtro === 'Fechadas') {
        filtroIssue = 'close';
      }

      const response = await api.get(`repos/${this.state.buscaIssues}/issues`);

      let filtrados = response.data;
      if (filtroIssue !== '') {
        filtrados = response.data.filter(issue => issue.state === filtroIssue);
      }

      this.setState({
        data: filtrados, // response.data,
        loading: false,
        refreshing: false,
      });
    }, 4000);
  }

  renderListItem = ({ item }) => (
    <IssueItem issue={item} />
  )

  renderList = () => (
    <FlatList
      data={this.state.data}
      keyExtractor={item => String(item.id)}
      renderItem={this.renderListItem}
      onRefresh={this.loadIssues}
      refreshing={this.state.refreshing}
    />
  )

  render() {
    return (
      <View style={styles.container}>
        { this.state.loading
          ? <ActivityIndicator size="small" color="#FFF" />
          : this.renderList() }
      </View>
    );
  }
}
