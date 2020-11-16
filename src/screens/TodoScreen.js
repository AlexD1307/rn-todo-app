import React, { useContext, useEffect, useState } from 'react'
import { Dimensions, StyleSheet, View } from 'react-native'
import { AntDesign, FontAwesome } from "@expo/vector-icons"

import { AppCard } from "../components/ui/AppCard"
import { EditModal } from "../components/EditModal"
import { THEME } from "../theme"
import { AppTextBold } from "../components/ui/AppTextBold"
import { AppButton } from "../components/ui/AppButton"
import { TodoContext } from "../context/todo/todoContext"
import { ScreenContext } from "../context/screen/screenContext"

export const TodoScreen = () => {
  const [deviceWidth, setDeviceWidth] = useState(Dimensions.get('window').width / 3)
  const [modal, setModal] = useState(false)
  const {todoId, changeScreen} = useContext(ScreenContext)
  const {todos, updateTodo, removeTodo} = useContext(TodoContext)

  const todo = todos.find(t => t.id === todoId)

  useEffect(() => {
    const update = () => {
      const width = Dimensions.get('window').width / 3
      setDeviceWidth(width)
    }

    Dimensions.addEventListener('change', update)

    return () => {
      Dimensions.removeEventListener('change', update)
    }
  })

  const saveHandler = async (title) => {
    await updateTodo(todo.id, title)
    setModal(false)
  }

  return (
    <View>
      <EditModal
        value={todo.title}
        visible={modal}
        onCancel={() => {
          setModal(false)
        }}
        onSave={saveHandler}
      />
      <AppCard style={styles.card}>
        <AppTextBold style={styles.title}>{todo.title}</AppTextBold>
        <AppButton onPress={() => setModal(true)}>
          <FontAwesome name="edit" size={20} />
        </AppButton>
      </AppCard>
      <View style={styles.buttons}>
        <View style={deviceWidth}>
          <AppButton color={THEME.GREY_COLOR} onPress={() => changeScreen(null)}>
            <AntDesign name="back" size={20} color="#fff" />
          </AppButton>
        </View>
        <View style={deviceWidth}>
          <AppButton
            color={THEME.DANGER_COLOR}
            onPress={() => removeTodo(todo.id)}
          >
            <FontAwesome name="remove" size={20} color="#fff" />
          </AppButton>
        </View>
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  buttons: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  card: {
    marginBottom: 20,
    padding: 15,
  },
  title: {
    fontSize: 16,
  },
})
