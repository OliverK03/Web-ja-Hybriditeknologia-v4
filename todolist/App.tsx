import React, { useEffect, useState } from 'react'
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, ActivityIndicator } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import TaskInput from './components/TaskInput'
import TaskList from './components/TaskList'

type Task = {
  id: string
  text: string
  done: boolean
}

console.log('TaskInput typeof:', typeof TaskInput, TaskInput);
console.log('TaskList typeof:', typeof TaskList, TaskList);
console.log('StatusBar typeof:', typeof StatusBar, StatusBar);

const STORAGE_KEY = 'TODOLIST_TASKS'

export default function App() {
  const [tasks, setTasks] = useState<Task[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const loadTasks = async () => {
      try {
        const json = await AsyncStorage.getItem(STORAGE_KEY)
        if (json) {
          const parsed: Task[] = JSON.parse(json)
          setTasks(parsed)
        }
      } catch (error) {
        console.warn('Failed to load tasks', error)
      } finally {
        setLoading(false)
      }
    }

    loadTasks()
  }, [])

  useEffect(() => {
    if (loading) return

    const saveTasks = async () => {
      try {
        const json = JSON.stringify(tasks)
        await AsyncStorage.setItem(STORAGE_KEY, json)
      } catch (error) {
        console.warn('Failed to save tasks', error)
      }
    }

    saveTasks()
  }, [tasks, loading])

  const handleAddTask = (text: string) => {
    const newTask: Task = {
      id: Date.now().toString(),
      text,
      done: false
    }
    setTasks((prev) => [newTask, ...prev])
  }

  const handleToggleTask = (id: string) => {
    setTasks((prev) =>
      prev.map((task) =>
        task.id === id
          ? {...task, done: !task.done }
          : task  
      )
    )
  }

  return (
    <View style={styles.container}>
      <StatusBar style="auto" />
      <View style={styles.header}>
        <Text style={styles.title}>Todo List</Text>
      </View>
      <TaskInput onAddTask={handleAddTask} />
      {loading ? (
        <View style={styles.loadingContainer}>
          <ActivityIndicator size="large" />
        </View>
      ) : (
        <TaskList tasks={tasks} onToggleTask={handleToggleTask} />
      )}
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
    paddingTop: 40,
  },
  header: {
    paddingHorizontal: 16,
    paddingBottom: 8,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  }
})
