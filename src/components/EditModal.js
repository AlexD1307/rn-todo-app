import React, { useState } from 'react'
import { View, Modal, Button, StyleSheet, TextInput, Alert } from 'react-native'
import { THEME } from "../theme"
import { AppButton } from "./ui/AppButton"

export const EditModal = ({visible, onCancel, value, onSave}) => {
  const [title, setTitle] = useState(value)

  const saveHandler = () => {
    if (title.trim().length < 3) {
      Alert.alert(
        'Error',
       `Should contain minimum 3 characters. Now ${title.length} characters`
      )
      return
    }

    onSave(title)
  }

  const cancelHandler = () => {
    onCancel()
    setTitle(value)
  }

  return (
    <Modal visible={visible} animationType="slide" transparent={false}>
      <View style={styles.wrap}>
        <TextInput
          style={styles.input}
          value={title}
          onChangeText={setTitle}
          placeholder="Enter title"
          autoCorrect={false}
          maxLength={64}
        />
        <View style={styles.buttons}>
          <AppButton
            color={THEME.DANGER_COLOR}
            onPress={cancelHandler}
          >
            Cancel
          </AppButton>
          <AppButton onPress={saveHandler}>Save</AppButton>
        </View>
      </View>
    </Modal>
  )
}

const styles = StyleSheet.create({
  wrap: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  input: {
    padding: 10,
    borderColor: THEME.MAIN_COLOR,
    borderBottomWidth: 2,
    width: '80%',
  },
  buttons: {
    width: '100%',
    marginTop: 10,
    flexDirection: 'row',
    justifyContent: 'space-around'
  }
})
