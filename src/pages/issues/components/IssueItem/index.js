import React, { Component } from 'react';
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  Linking,
} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import PropTypes from 'prop-types';

import styles from './styles';

export default class IssueItem extends Component {
  static propTypes = {
    issue: PropTypes.shape({
      url: PropTypes.string,
      user: {
        login: PropTypes.string,
      },
    }).isRequired,
  };

  openlink = async (url) => {
    Linking.canOpenURL(url)
      .then(supported => supported && Linking.openURL(url))
      .catch(err => console.error('An error ocurred', err));
  };


  render() {
    const { issue } = this.props;

    return (
      <View style={styles.container}>
        <View style={styles.imageContainer}>
          <Image style={styles.avatar} source={{ uri: issue.user.avatar_url }} />
        </View>
        <View style={styles.infoContainer}>
          <Text style={styles.repoTitle}>
            {`${issue.title.substring(0, issue.title.lastIndexOf(' ', 25))}...`}
          </Text>
          <Text style={styles.infoText}>{issue.user.login}</Text>
        </View>
        <View style={styles.iconContainer}>
          <TouchableOpacity
            style={styles.button}
            onPress={() => this.openlink(issue.html_url)}
          >
            <Icon name="angle-right" size={20} style={styles.infoIcon} />
          </TouchableOpacity>
        </View>
      </View>
    );
  }
}
