<template>
    <div>
      <div class="modal" @click="cerrarFormulario"></div>
      <div class="formulario">
        <h1>Crear Área de Trabajo</h1>
        <form @submit.prevent="crearArea">
          <label for="nombre">Nombre:</label>
          <input type="text" id="nombre" v-model="area.nombre" required>
  
          <label for="direccion">Dirección:</label>
          <input type="text" id="direccion" v-model="area.direccion">
  
          <label for="url">URL:</label>
          <input type="text" id="url" v-model="area.url">
  
          <button type="submit">Crear Área</button>
        </form>
      </div>
    </div>
  </template>
  
  <script>
  import { defineComponent, ref } from 'vue';
  import { createClient } from '@supabase/supabase-js';
  
  const supabaseUrl = 'https://nqpfkwmkparhpxjovixf.supabase.co';
  const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im5xcGZrd21rcGFyaHB4am92aXhmIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MTc3OTg5NjEsImV4cCI6MjAzMzM3NDk2MX0.jkoYu7IOIDETPGI-qqhGbCGEX8FN-M7mqW39uzSexH0';
  const supabase = createClient(supabaseUrl, supabaseKey);
  
  export default defineComponent({
  setup() {
    const area = ref({
      nombre: '',
      direccion: '',
      url: ''
    });

    async function crearArea() {
      try {
        const { data, error } = await supabase.from('areas').insert([area.value]);
        if (error) {
          throw error;
        } else {
          console.log('Área creada:', data);
          area.value = { nombre: '', direccion: '', url: '' }; // Limpiamos los campos del formulario
          // Emitimos el evento personalizado para cerrar el formulario
          this.$emit('cerrarFormulario');
          // Emitimos el evento personalizado para notificar al componente padre sobre el área agregada
          this.$emit('areaAgregada');
        }
      } catch (error) {
        console.error('Error al crear el área:', error.message);
      }
    }

    return {
      area,
      crearArea
    };
  }
});
</script>
  
  <style>
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
  