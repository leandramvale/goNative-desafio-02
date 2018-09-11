import { StyleSheet } from 'react-native';
import { general, colors, metrics } from 'styles';

const styles = StyleSheet.create({
  container: {
    ...general.box,
    marginTop: metrics.baseMargin,
    flex: 3,
    flexDirection: 'row',
    alignItems: 'flex-start',
  },

  imageContainer: {
    alignItems: 'center',
  },

  avatar: {
    width: 45,
    height: 45,
  },

  infoContainer: {
    flex: 1,
    flexDirection: 'column',
    alignItems: 'flex-start',
    marginLeft: metrics.baseMargin,
  },

  repoTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    marginLeft: metrics.baseMargin / 2,
  },

  infoText: {
    color: colors.regular,
    fontSize: 12,
    marginLeft: metrics.baseMargin / 2,
  },

  iconContainer: {
    alignItems: 'center',
  },

  infoIcon: {
    color: colors.dark,
  },

  button: {
    backgroundColor: colors.white,
    borderRadius: metrics.baseRadius,
    height: 44,
    width: 30,
    marginTop: metrics.baseMargin / 2,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default styles;
