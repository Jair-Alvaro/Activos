<template>
    <div>
      <div class="modal" @click="cerrarFormularioSubconjunto"></div>
      <div class="formulario subconjunto-form">
        <h1>Crear Subconjunto</h1>
        <form @submit.prevent="crearSubconjunto">
          <label for="nombre">Nombre:</label>
          <input type="text" id="nombre" v-model="subconjunto.nombre" required>
          
          <label for="descripcion">Descripción:</label>
          <textarea id="descripcion" v-model="subconjunto.descripcion"></textarea>
  
          <label for="fabricante">Fabricante:</label>
          <input type="text" id="fabricante" v-model="subconjunto.fabricante">
          
          <label for="modelo">Modelo:</label>
          <input type="text" id="modelo" v-model="subconjunto.modelo">
          
          <label for="numero_pieza">Número de Pieza:</label>
          <input type="text" id="numero_pieza" v-model="subconjunto.numero_pieza">
          
          <label for="numero_serie">Número de Serie:</label>
          <input type="text" id="numero_serie" v-model="subconjunto.numero_serie">
          
          <label for="codigo">Código:</label>
          <input type="text" id="codigo" v-model="subconjunto.codigo">
          
          <label for="imagen">Imagen:</label>
          <input type="text" id="imagen" v-model="subconjunto.imagen">
          
          <button type="submit">Crear Subconjunto</button>
        </form>
      </div>
    </div>
  </template>
  
  <script setup>
  import { ref, defineProps, defineEmits } from 'vue';
  import { createClient } from '@supabase/supabase-js';
  
  const supabase = createClient('https://nqpfkwmkparhpxjovixf.supabase.co', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im5xcGZrd21rcGFyaHB4am92aXhmIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MTc3OTg5NjEsImV4cCI6MjAzMzM3NDk2MX0.jkoYu7IOIDETPGI-qqhGbCGEX8FN-M7mqW39uzSexH0');
  
  const props = defineProps({
    activoId: {
      type: Number,
      required: true
    }
  });
  
  const emit = defineEmits(['cerrarFormularioSubconjunto']);
  
  const subconjunto = ref({
    nombre: '',
    descripcion: '',
    fabricante: '',
    modelo: '',
    numero_pieza: '',
    numero_serie: '',
    codigo: '',
    imagen: '',
    id_activo: props.activoId
  });
  
  // Función para crear subconjuntos
  async function crearSubconjunto() {
    try {
      const { data, error } = await supabase.from('subconjuntos').insert([subconjunto.value]);
      if (error) {
        throw error;
      } else {
        console.log('Subconjunto creado:', data);
        subconjunto.value = {
          nombre: '',
          descripcion: '',
          fabricante: '',
          modelo: '',
          numero_pieza: '',
          numero_serie: '',
          codigo: '',
          imagen: '',
          id_activo: props.activoId
        };
        emit('cerrarFormularioSubconjunto');
        emit('SubconjuntoAgregado');
      }
    } catch (error) {
      console.error('Error al crear el subconjunto:', error.message);
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
  