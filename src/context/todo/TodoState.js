import React, { useContext, useReducer } from 'react'
import { Alert } from "react-native"
import { TodoContext } from "./todoContext"
import { todoReducer } from "./todoReducer"
import {
  ADD_TODO,
  CLEAR_ERROR,
  FETCH_TODOS,
  HIDE_LOADER,
  REMOVE_TODO,
  SHOW_ERROR,
  SHOW_LOADER,
  UPDATE_TODO,
} from "../types"
import { ScreenContext } from "../screen/screenContext"
import { Http } from "../../http"

export const TodoState = ({children}) => {
  const initialState = {
    todos: [],
    loading: false,
    error: null,
  }
  const [state, dispatch] = useReducer(todoReducer, initialState)
  const {changeScreen} = useContext(ScreenContext)

  const fetchTodos = async () => {
    showLoader()
    clearError()
    try {
      const data = await Http.get('https://rn-todo-app-aed37.firebaseio.com/todos.json')
      if (!data) return
      const todos = Object.keys(data).map(key => ({...data[key], id: key}))
      dispatch({type: FETCH_TODOS, todos})
    } catch (err) {
      showError('Something gone wrong...')
      console.log(err)
    } finally {
      hideLoader()
    }
  }

  const addTodo = async title => {
    clearError()
    try {
      const data = await Http.post(
        'https://rn-todo-app-aed37.firebaseio.com/todos.json',
        { title }
      )
      dispatch({ type: ADD_TODO, title, id: data.name })
    } catch (e) {
      showError('Something gone wrong')
    }
  }

  const updateTodo = async (id, title) => {
    showLoader()
    clearError()
    try {
      await Http.patch(`https://rn-todo-app-aed37.firebaseio.com/todos/${id}.json`, {title})
      dispatch({type: UPDATE_TODO, id, title})
    } catch (err) {
      showError('Something gone wrong...')
      console.log(err)
    } finally {
      hideLoader()
    }
  }

  const removeTodo = id => {
    const todo = state.todos.find(t => t.id === id)
    Alert.alert(
      "Item remove",
      `Are you sure, you want to delete "${todo.title}"?`,
      [
        {
          text: "Cancel",
          style: "cancel",
        },
        {
          text: "Delete",
          style: 'destructive',
          onPress: async () => {
            changeScreen(null)
            await Http.delete(`https://rn-todo-app-aed37.firebaseio.com/todos/${id}.json`)
            dispatch({type: REMOVE_TODO, id})
          },
        },
      ],
      {cancelable: false},
    )
  }

  const showLoader = () => dispatch({type: SHOW_LOADER})
  const hideLoader = () => dispatch({type: HIDE_LOADER})
  const showError = (error) => dispatch({type: SHOW_ERROR, error})
  const clearError = () => dispatch({type: CLEAR_ERROR})

  return <TodoContext.Provider value={{
    todos: state.todos,
    loading: state.loading,
    error: state.error,
    addTodo,
    updateTodo,
    removeTodo,
    fetchTodos,
  }}>
    {children}
  </TodoContext.Provider>

}
