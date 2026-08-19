// stores/todo.js
import { defineStore } from 'pinia'
import { ref, computed } from 'vue'
export const useTodoStore = defineStore('todo', () => {
    const tasks = ref([])
    const nextId = ref(1)
    const pendingTasks = computed(() => tasks.value.filter(t => !t.done))

    const doneTasks = computed(() => tasks.value.filter(t => t.done))
    function addTask(title) {
    tasks.value.push({ id: nextId.value++, title, done: false })
    }
    function toggleTask(id) {
        const task = tasks.value.find(t => t.id === id)
        if (task) task.done = !task.done
    }
    // Simulación de WebSocket: agregar tareas que vienen de otros usuarios
    function receiveRemoteTask(task) {
        tasks.value.push(task)
        nextId.value = Math.max(nextId.value, task.id + 1)
    }
    return { tasks, pendingTasks, doneTasks, addTask, toggleTask, receiveRemoteTask }
})