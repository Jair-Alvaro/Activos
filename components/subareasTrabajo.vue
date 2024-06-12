<template>
  <div>
    <div class="modal" @click="cerrarFormulario"></div>
    <div class="formulario subarea-form">
      <h1>Crear Subárea de Trabajo</h1>
      <form @submit.prevent="crearSubArea">
        <label for="nombre">Nombre:</label>
        <input type="text" id="nombre" v-model="subArea.nombre" required>

        <label for="descripcion">Descripción:</label>
        <textarea id="descripcion" v-model="subArea.descripcion"></textarea>

        <label for="direccion">Dirección:</label>
        <input type="text" id="direccion" v-model="subArea.direccion">

        <label for="correo">Correo:</label>
        <input type="email" id="correo" v-model="subArea.correo">

        <label for="ciudad">Ciudad:</label>
        <input type="text" id="ciudad" v-model="subArea.ciudad">

        <!-- Indicación visual de carga -->
        <button type="submit" :disabled="cargando">
          <span v-if="cargando">Cargando...</span>
          <span v-else>Aceptar</span>
        </button>
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
  props: ['areaId'],
  setup(props) {
    const subArea = ref({
      nombre: '',
      descripcion: '',
      direccion: '',
      correo: '',
      ciudad: '',
      id_area: props.areaId
    });

    const cargando = ref(false);

    async function crearSubArea() {
      cargando.value = true;
      try {
        const { data, error } = await supabase.from('subareas').insert([subArea.value]);
        if (error) {
          throw error;
        } else {
          console.log('Subárea creada:', data);
          subArea.value = { nombre: '', descripcion: '', direccion: '', correo: '', ciudad: '', id_area: props.areaId };
          // Emitimos el evento para cerrar el formulario
          this.$emit('cerrarFormulario');
          // Emitimos el evento personalizado para notificar al componente padre
          this.$emit('subareaAgregada');
        }
      } catch (error) {
        console.error('Error al crear la subárea:', error.message);
      } finally {
        cargando.value = false;
      }
    }

    function cerrarFormulario() {
      this.$emit('cerrarFormulario');
    }

    return {
      subArea,
      crearSubArea,
      cerrarFormulario,
      cargando
    };
  }
});
</script>

<style scoped>
/* Estilos */
</style>
