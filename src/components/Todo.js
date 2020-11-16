import React from 'react'
import { View, StyleSheet, TouchableOpacity } from "react-native"
import { AppText } from "./ui/AppText"

export const Todo = ({todo, onRemove, onOpen}) => {
  return (
    <TouchableOpacity
      activeOpacity={0.5}
      onPress={onOpen.bind(null, todo.id)}
      // delayLongPress="10000"
      // onLongPress={() => onRemove(todo.id)}
    >
      <View style={styles.todo}>
        <AppText>{todo.title}</AppText>
      </View>
    </TouchableOpacity>
  )
}

const styles = StyleSheet.create({
  todo: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 15,
    borderWidth: 1,
    borderColor: '#eee',
    borderRadius: 5,
  },
})
