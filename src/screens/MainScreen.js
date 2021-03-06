import React, { useCallback, useContext, useEffect, useState } from 'react'
import { StyleSheet, View, FlatList, Text, Image, Dimensions } from 'react-native'
import { AddTodo } from '../components/AddTodo'
import { Todo } from '../components/Todo'
import { THEME } from "../theme"
import { ScreenContext } from "../context/screen/screenContext"
import { TodoContext } from "../context/todo/todoContext"
import { AppLoader } from "../components/ui/AppLoader"
import { AppText } from "../components/ui/AppText"
import { AppButton } from "../components/ui/AppButton"

export const MainScreen = () => {
  const [deviceWidth, setDeviceWidth] = useState(Dimensions.get("window").width - THEME.PADDING_HORIZONTAL * 2)
  const {addTodo, todos, removeTodo, fetchTodos, loading, error} = useContext(TodoContext)
  const {changeScreen} = useContext(ScreenContext)
  const loadTodos = useCallback(async () => await fetchTodos(), [fetchTodos])

  useEffect(() => {
    loadTodos()
    const update = () => {
      const width = Dimensions.get("window").width - THEME.PADDING_HORIZONTAL * 2
      setDeviceWidth(width)
    }

    Dimensions.addEventListener('change', update)

    return () => {
      Dimensions.removeEventListener('change', update)
    }
  }, [])

  if (loading) {
    return <AppLoader />
  }

  if (error) {
    return <View style={styles.center}>
      <AppText style={styles.error}>{error}</AppText>
      <AppButton onPress={loadTodos}>Try again</AppButton>
    </View>
  }

  let content = (
    <View style={deviceWidth}>
      <FlatList
        keyExtractor={item => item.id.toString()}
        data={todos}
        renderItem={({item}) => (
          <Todo todo={item} onRemove={removeTodo} onOpen={changeScreen} />
        )}
      />
    </View>
  )

  if (!todos.length) {
    content = <View style={styles.imgWrap}>
      <Image style={styles.img} source={require('../../assets/no-items.png')}/>
    </View>
  }

  return (
    <View>
      <AddTodo onSubmit={addTodo}/>
      {content}
    </View>
  )
}

const styles = StyleSheet.create({
  imgWrap: {
    height: 300,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 10,
  },
  img: {
    width: '100%',
    height: '100%',
    resizeMode: 'contain',
  },
  center: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  },
  error: {
    fontSize: 20,
    color: THEME.DANGER_COLOR
  }
})
