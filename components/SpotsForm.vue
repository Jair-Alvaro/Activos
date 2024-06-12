<template>
    <div>
      <div class="modal" @click="cerrarFormularioSpots"></div>
      <div class="formulario spots-form">
        <h1>Crear Spot</h1>
        <form @submit.prevent="crearSpot">
          <label for="nombre">Nombre:</label>
          <input type="text" id="nombre" v-model="spot.nombre" required>
          
          <label for="rpm">RPM:</label>
          <input type="number" id="rpm" v-model="spot.rpm">
          
          <label for="local_monitoreo">Local de Monitoreo:</label>
          <input type="text" id="local_monitoreo" v-model="spot.local_monitoreo">
          
          <button type="submit">Crear Spot</button>
        </form>
      </div>
    </div>
  </template>
  
  <script setup>
  import { ref, defineProps, defineEmits } from 'vue';
  import { createClient } from '@supabase/supabase-js';
  
  const supabase = createClient('https://nqpfkwmkparhpxjovixf.supabase.co', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im5xcGZrd21rcGFyaHB4am92aXhmIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MTc3OTg5NjEsImV4cCI6MjAzMzM3NDk2MX0.jkoYu7IOIDETPGI-qqhGbCGEX8FN-M7mqW39uzSexH0');
  
  const props = defineProps({
    subconjuntoId: {
      type: Number,
      required: false,
      default: null
    },
    componenteId: {
      type: Number,
      required: false,
      default: null
    }
  });
  
  const emit = defineEmits(['cerrarFormularioSpots', 'SpotAgregado']);
  
  const spot = ref({
    nombre: '',
    rpm: null,
    local_monitoreo: '',
    id_subconjunto: props.subconjuntoId,
    id_componente: props.componenteId
  });
  
  async function crearSpot() {
    try {
      const { data, error } = await supabase.from('spots').insert([spot.value]);
      if (error) {
        throw error;
      } else {
        console.log('Spot creado:', data);
        spot.value = {
          nombre: '',
          rpm: null,
          local_monitoreo: '',
          id_subconjunto: props.subconjuntoId,
          id_componente: props.componenteId
        };
        emit('cerrarFormularioSpots');
        emit('SpotAgregado');
      }
    } catch (error) {
      console.error('Error al crear el spot:', error.message);
    }
  }
  </script>
  
  <style scoped>
  .modal {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-color: rgba(0, 0, 0, 0.5);
    z-index: 999;
  }
  
  .formulario {
    position: fixed;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    background-color: white;
    padding: 20px;
    border-radius: 5px;
    z-index: 1000;
  }
  </style>
  