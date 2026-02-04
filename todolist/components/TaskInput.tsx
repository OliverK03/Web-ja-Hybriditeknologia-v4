import React, { useState } from 'react'
import { View, TextInput, Button, StyleSheet } from 'react-native'

interface TaskInputProps {
    onAddTask: (text: string) => void
}

const TaskInput: React.FC<TaskInputProps> = ({ onAddTask }) => {
    const [text, setText] = useState('')

    const handleAdd = () => {
        const trimmed = text.trim()
        if (!trimmed) return
        onAddTask(trimmed)
        setText('')
    }
    return (
    <View style={styles.container}>
        <TextInput
            style={styles.input}
            placeholder='Add a new task'
            value={text}
            onChangeText={setText}
            onSubmitEditing={handleAdd}
            returnKeyType='done'
            />
        <Button title="Add" onPress={handleAdd} />
    </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        paddingHorizontal: 16,
        paddingVertical: 8,
        alignItems: 'center'
    },
    input: {
        flex: 1,
        borderWidth: 1,
        borderColor: '#ccc',
        borderRadius: 4,
        paddingHorizontal: 8,
        paddingVertical: 6,
        marginRight: 8
    }
})

export default TaskInput
