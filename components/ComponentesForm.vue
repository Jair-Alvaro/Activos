<template>
    <div>
      <div class="modal" @click="cerrarFormularioComponentes"></div>
      <div class="formulario componentes-form">
        <h1>Crear Componente</h1>
        <form @submit.prevent="crearComponente">
          <label for="nombre">Nombre:</label>
          <input type="text" id="nombre" v-model="componente.nombre" required>
          
          <label for="descripcion">Descripción:</label>
          <textarea id="descripcion" v-model="componente.descripcion"></textarea>
  
          <label for="fabricante">Fabricante:</label>
          <input type="text" id="fabricante" v-model="componente.fabricante">
          
          <label for="modelo">Modelo:</label>
          <input type="text" id="modelo" v-model="componente.modelo">
          
          <label for="numero_pieza">Número de Pieza:</label>
          <input type="text" id="numero_pieza" v-model="componente.numero_pieza">
          
          <label for="numero_serie">Número de Serie:</label>
          <input type="text" id="numero_serie" v-model="componente.numero_serie">
          
          <label for="codigo">Código:</label>
          <input type="text" id="codigo" v-model="componente.codigo">
          
          <button type="submit">Crear Componente</button>
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
      required: true
    }
  });
  
  const emit = defineEmits(['cerrarFormularioComponentes', 'ComponenteAgregado']);
  
  const componente = ref({
    nombre: '',
    descripcion: '',
    fabricante: '',
    modelo: '',
    numero_pieza: '',
    numero_serie: '',
    codigo: '',
    id_subconjunto: props.subconjuntoId
  });
  
  // Función para crear componentes
  async function crearComponente() {
    try {
      const { data, error } = await supabase.from('componentes').insert([componente.value]);
      if (error) {
        throw error;
      } else {
        console.log('Componente creado:', data);
        componente.value = {
          nombre: '',
          descripcion: '',
          fabricante: '',
          modelo: '',
          numero_pieza: '',
          numero_serie: '',
          codigo: '',
          id_subconjunto: props.subconjuntoId
        };
        emit('cerrarFormularioComponentes');
        emit('ComponenteAgregado');
      }
    } catch (error) {
      console.error('Error al crear el componente:', error.message);
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
  