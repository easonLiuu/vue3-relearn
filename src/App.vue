<template>
  <img alt="Vue logo" src="./assets/logo.png">
  <h1>{{ count }}</h1>
  <h1>{{ double }}</h1>
  <p>{{error}}</p>
  <Suspense>
    <template #default>
      <div>
          <async-show />
          <dog-show />
      </div>
    </template>
    <template #fallback>
      <h1>loading...</h1>
    </template>
  </Suspense>
  <h1 v-if="loading">loading...</h1>
  <img v-if="loaded" :src="result[0].url"/>
  <button @click="openModal">openModal</button>
  <button @click="changeLang('en')">英文</button>
  <button @click="changeLang('ch')">中文</button>
  <modal :isOpen="modalIsOpen" @close-modal="onModalClose">my Modal!</modal>
  <ul>
    <li v-for="number in numbers" :key="number"><h1>{{ number }}</h1></li>
  </ul>
  <h1>{{ person.name }}</h1>
  <button @click="increase">+1</button>
</template>

<script lang="ts">
import { provide, ref, computed, reactive, toRefs, onMounted, onUpdated, onRenderTriggered, watch, onErrorCaptured } from 'vue';
import useURLLoader from './hooks/useURLLoader'
import Modal from './components/Modal.vue'
import AsyncShow from './components/AsyncShow.vue'
import DogShow from './components/DogShow.vue'

interface DataProps {
  count: number;
  double: number;
  increase: () => void;
  numbers: number[];
  person: { name?: string }
}
interface DogResult {
  message: string;
  status: string;
}

interface CatResult {
  id: string;
  url: string;
  width: number;
  height: number;
}

export default {
  name: 'App',
  components: {
    Modal,
    AsyncShow,
    DogShow
  },
  setup() {
    // provide提供数据
    const lang = ref('en')
    provide('lang', lang)
    const changeLang = (type: string) => {
      lang.value = type
    }
    const error = ref(null)
    onErrorCaptured((e: any) => {
      error.value = e
      return true
    })
    // const count = ref(0)
    // const double = computed(() => {
    //   return count.value * 2
    // })
    // const increase = () => {
    //   count.value++
    // }
    onMounted(() => {
      console.log('mounted');    
    })
    onUpdated(() => {
      console.log('updated');    
    })
    onRenderTriggered((event) => {
      console.log(event);
    })
    const data: DataProps = reactive({
      count: 0,
      increase: () => { data.count++ },
      double: computed(() => data.count * 2),
      numbers: [0, 1, 2],
      person: {}
    })
    const { result, loaded, loading } = useURLLoader<CatResult[]>('https://api.thecatapi.com/v1/images/search?limit=1')
    watch(result, () => {
      if (result.value) {
        console.log('value', result.value[0].url);  
      }
    })
    //data.numbers[0] = 5
    //data.person.name = 'eason'
    const refData = toRefs(data)
    const modalIsOpen = ref(false)
    const openModal = () => {
      modalIsOpen.value = true
    }
    const onModalClose = () => {
      modalIsOpen.value = false
    }
    //展开的每一项都是响应式的
    return { 
      ...refData,
      error,
      result,
      loading,
      loaded,
      modalIsOpen,
      onModalClose,
      openModal,
      changeLang
    }
  }
};
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
