<template>
 <div>
 <h1>Lista de Tareas Colaborativa</h1>
 <input v-model="newTask" @keyup.enter="addNewTask" placeholder="Nueva
tarea" />
 <ul>
 <li v-for="task in todoStore.tasks" :key="task.id">
  <input type="checkbox" :checked="task.done"
@change="todoStore.toggleTask(task.id)" />
 {{ task.title }}
 </li>
 </ul>
 <p>Pendientes: {{ todoStore.pendingTasks.length }}</p>
 <p>Completadas: {{ todoStore.doneTasks.length }}</p>
 </div>
</template>
<script setup>
import { ref } from 'vue'
import { useTodoStore } from './stores/todo'
const todoStore = useTodoStore()
const newTask = ref('')
function addNewTask() {
 if (newTask.value.trim()) {
 todoStore.addTask(newTask.value.trim())
 newTask.value = ''
 }
}
// Simular recepción de tarea remota cada 5 segundos
import { onMounted } from 'vue'
onMounted(() => {
 setInterval(() => {
 todoStore.receiveRemoteTask({
 id: Date.now(),
 title: `Tarea remota ${Math.floor(Math.random()*100)}`,
 done: false
 })
 }, 5000)
})
</script>