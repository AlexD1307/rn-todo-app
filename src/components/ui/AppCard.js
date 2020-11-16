import React from 'react'
import { View, StyleSheet } from 'react-native'

export const AppCard = props => <View style={{...styles.default, ...props.style}}>
  {props.children}
</View>

const styles = StyleSheet.create({
  default: {
    padding: 20,
    backgroundColor: '#fff',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOpacity: 0.3,
    shadowOffset: {width: 2, height: 2},
    borderRadius: 10,
    elevation: 8,
  },
})
