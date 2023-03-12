<template>
    <div class="app-2">
        <h1>{{ hello }}</h1>
        <h1>{{ count }}</h1>
        <button @click="count++">add</button>
        <message :user="user" @change="showAlert"></message>
    </div>
  </template>
  
  <script setup lang="ts">
  import { ref } from 'vue'
  import Message from './components/Message.vue'
  const hello = 'hello world'
  const count = ref(0)
  const user = {
    name: 'eason',
    age: 21
  }
  const showAlert = (text: number) => {
    alert(text)
  }
  </script>
  
  <!-- Add "scoped" attribute to limit CSS to this component only -->
  <style scoped>
  
  </style>
  