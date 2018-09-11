import { StyleSheet } from 'react-native';
import { colors, metrics } from 'styles';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
    backgroundColor: colors.secundary,
    padding: metrics.basePadding,
  },

  busca: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    justifyContent: 'space-between',
  },

  lista: {
    flexDirection: 'column',
    alignItems: 'stretch',
    justifyContent: 'flex-start',
  },

  text: {
    textAlign: 'center',
    marginTop: metrics.baseMargin,
    color: colors.light,
    fontSize: 14,
    lineHeight: 21,
  },

  error: {
    color: colors.danger,
    textAlign: 'center',
    marginTop: metrics.baseMargin,
  },

  input: {
    backgroundColor: colors.white,
    borderRadius: metrics.baseRadius,
    height: 44,
    paddingHorizontal: metrics.basePadding,
    width: 260,
    fontSize: 12,
  },

  button: {
    backgroundColor: colors.secundary,
    borderRadius: metrics.baseRadius,
    height: 44,
    justifyContent: 'center',
    alignItems: 'center',
    width: 40,
  },

  buttonText: {
    color: colors.white,
    fontSize: 14,
    fontWeight: 'bold',
  },

});

export default styles;
