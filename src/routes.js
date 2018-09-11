import React from 'react';
import { createStackNavigator, TabNavigator } from 'react-navigation';

import { colors, metrics } from 'styles';

import HeaderRight from 'components/headerRight';
import Repositories from 'pages/repositories';
import Issues from 'pages/issues';

const createNavigator = () => createStackNavigator({
  Repositories: { screen: Repositories },
  Issues: {
    screen: TabNavigator({
      Todas: {
        screen: Issues,
        navigationOptions: {
          tabBarLabel: 'All',
        },
      },
      Abertas: {
        screen: Issues,
        navigationOptions: {
          tabBarLabel: 'Open',
        },
      },
      Fechadas: {
        screen: Issues,
        navigationOptions: {
          tabBarLabel: 'Close',
        },
      },
    }, {
      tabBarPosition: 'buttom',
      tabBarOptions: {
        showLabel: true,
        activeTintColor: colors.dark,
        inactiveTintColor: colors.whiteTransparent,
        style: {
          backgroundColor: colors.light,
        },
      },
    }),
    navigationOptions: {
      title: 'Issues',
    },
  },
}, {
  initialRouteName: 'Repositories',
  navigationOptions: ({ navigation }) => ({
    headerStyle: {
      paddingHorizontal: metrics.basePadding,
    },
    headerRight: <HeaderRight navigation={navigation} />,
  }),
});

export default createNavigator;
