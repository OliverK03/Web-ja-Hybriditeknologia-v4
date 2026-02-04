import React from 'react';
import {
  FlatList,
  TouchableOpacity,
  Text,
  View,
  StyleSheet,
  ListRenderItem,
} from 'react-native';

type Task = {
  id: string;
  text: string;
  done: boolean;
}

type TaskListProps = {
  tasks: Task[];
  onToggleTask: (id: string) => void;
}

export default function TaskList({ tasks, onToggleTask }: TaskListProps) {
  const renderItem: ListRenderItem<Task> = ({ item }) => (
    <TouchableOpacity onPress={() => onToggleTask(item.id)}>
      <View style={[styles.row, item.done && styles.rowDone]}>
        <Text style={[styles.text, item.done && styles.textDone]}>
          {item.text}
        </Text>
      </View>
    </TouchableOpacity>
  );

  return (
    <FlatList
      data={tasks}
      keyExtractor={(item) => item.id}
      renderItem={renderItem}
      contentContainerStyle={
        tasks.length === 0 ? styles.emptyContainer : undefined
      }
      ListEmptyComponent={
        <Text style={styles.emptyText}>
          No tasks yet. Add one above.
        </Text>
      }
    />
  );
};

const styles = StyleSheet.create({
  row: {
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
    backgroundColor: '#fff',
  },
  rowDone: {
    backgroundColor: '#e6ffe6',
  },
  text: {
    fontSize: 16,
  },
  textDone: {
    textDecorationLine: 'line-through',
    color: '#888',
  },
  emptyContainer: {
    flexGrow: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  emptyText: {
    color: '#999',
    marginTop: 20,
  },
});