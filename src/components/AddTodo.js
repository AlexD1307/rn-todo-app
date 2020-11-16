import React, { useState } from 'react'
import { View, StyleSheet, TextInput, Alert, Keyboard } from "react-native"
import {AntDesign} from "@expo/vector-icons"
import { THEME } from "../theme"

export const AddTodo = ({onSubmit}) => {
  const [value, setValue] = useState('')

  const pressHandler = () => {
    if (!value.trim()) {
      Alert.alert('Task name cannot be empty')
      return
    }

    onSubmit(value)
    setValue('')
    Keyboard.dismiss()
  }

  return (
    <View style={styles.block}>
      <TextInput
        style={styles.input}
        onChangeText={setValue}
        value={value}
        placeholder="Write task naming..."
        autoCorrect={false}
        autoCapitalize='none'
      />
      <AntDesign.Button name="pluscircleo" onPress={pressHandler}>
        Add
      </AntDesign.Button>
    </View>
  )
}

const styles = StyleSheet.create({
  block: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 15
  },
  input: {
    width: '70%',
    padding: 10,
    borderStyle: 'solid',
    borderBottomWidth: 2,
    borderBottomColor: THEME.MAIN_COLOR,
    marginBottom: 10
  }
})
