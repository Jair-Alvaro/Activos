<template>
  <div>
    <h1>¡Bienvenido a Proyecto Minería!</h1>
    <button @click="mostrarFormularioArea">Crear Área de Trabajo</button>
    <AreaTrabajo v-if="mostrarFormArea" @cerrarFormulario="cerrarFormularioArea" @areaAgregada="actualizarAreasTrabajo" />
    <div>
      <h2>Áreas de Trabajo:</h2>
      <ul>
        <li v-for="area in areasTrabajo" :key="area.id">
          {{ area.nombre }}
          <button @click="mostrarFormularioSubarea(area.id)">Crear Subárea</button>
          <ul>
            <li v-for="subarea in area.subareas" :key="subarea.id">
              {{ subarea.nombre }}
              <button @click="mostrarFormularioActivos(subarea.id)">Crear Activo</button>
              <ul>
                <li v-for="activo in subarea.activos" :key="activo.id">
                  {{ activo.nombre }}
                  <button @click="mostrarFormularioSubconjunto(activo.id)">Crear Subconjunto</button>
                  <ul>
                    <li v-for="subconjunto in activo.subconjuntos" :key="subconjunto.id">
                      {{ subconjunto.nombre }}
                      <button @click="mostrarFormularioComponente(subconjunto.id)">Crear Componente</button>
                      <button @click="mostrarFormularioSpotSubconjunto(subconjunto.id)">Crear Spot</button>
                      <ul>
                        <li v-for="spot in subconjunto.spots" :key="spot.id">
                          Spot: {{ spot.nombre }}
                        </li>
                        <li v-for="componente in subconjunto.componentes" :key="componente.id">
                          {{ componente.nombre }}
                          <button @click="mostrarFormularioSpotComponente(componente.id)">Crear Spot</button>
                          <ul>
                            <li v-for="spot in componente.spots" :key="spot.id">
                              Spot: {{ spot.nombre }}
                            </li>
                          </ul>
                        </li>
                      </ul>
                    </li>
                  </ul>
                </li>
              </ul>
            </li>
          </ul>
          <br /><br /><br />
        </li>
      </ul>
    </div>
    <SubAreasTrabajo v-if="mostrarFormSubarea" :areaId="areaId" @cerrarFormulario="cerrarFormularioSubarea" @subareaAgregada="actualizarSubareasTrabajo" />
    <ActivosForm v-if="mostrarFormActivos" :subareaId="subareaId" @cerrarFormulario="cerrarFormularioActivos" @activoAgregado="actualizarActivos" />
    <SubconjuntosForm v-if="mostrarFormSubconjunto" :activoId="activoId" @cerrarFormularioSubconjunto="cerrarFormularioSubconjunto" @SubconjuntoAgregado="actualizarSubconjunto" />
    <ComponentesForm v-if="mostrarFormComponente" :subconjuntoId="subconjuntoId" @cerrarFormularioComponentes="cerrarFormularioComponente" @ComponenteAgregado="actualizarComponentes" />
    <SpotsForm v-if="mostrarFormSpot" :subconjuntoId="subconjuntoIdSpot" :componenteId="componenteIdSpot" @cerrarFormularioSpots="cerrarFormularioSpot" @SpotAgregado="actualizarSpots" />
  </div>
</template>
<script setup>
import { ref, onMounted } from 'vue';
import { createClient } from '@supabase/supabase-js';
import AreaTrabajo from '@/components/AreaTrabajo.vue';
import SubAreasTrabajo from '@/components/subareasTrabajo.vue';
import ActivosForm from '@/components/ActivosForm.vue';
import SubconjuntosForm from '@/components/SubconjuntosForm.vue';
import ComponentesForm from '@/components/ComponentesForm.vue';
import SpotsForm from '@/components/SpotsForm.vue';

const supabase = createClient('https://nqpfkwmkparhpxjovixf.supabase.co', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im5xcGZrd21rcGFyaHB4am92aXhmIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MTc3OTg5NjEsImV4cCI6MjAzMzM3NDk2MX0.jkoYu7IOIDETPGI-qqhGbCGEX8FN-M7mqW39uzSexH0');

const areasTrabajo = ref([]);
const mostrarFormArea = ref(false);
const mostrarFormSubarea = ref(false);
const mostrarFormActivos = ref(false);
const mostrarFormSubconjunto = ref(false);
const mostrarFormComponente = ref(false);
const mostrarFormSpot = ref(false);


const areaId = ref(null);
const subareaId = ref(null);
const activoId = ref(null);
const subconjuntoId = ref(null);
const subconjuntoIdSpot = ref(null);
const componenteIdSpot = ref(null);

onMounted(() => {
  cargarAreasTrabajo();
});

async function cargarAreasTrabajo() {
  try {
    const { data: areasData, error: areasError } = await supabase.from('areas').select('*');
    if (areasError) throw areasError;

    for (const area of areasData) {
      const { data: subareasData, error: subareasError } = await supabase.from('subareas').select('*').eq('id_area', area.id);
      if (subareasError) throw subareasError;
      area.subareas = subareasData;

      for (const subarea of area.subareas) {
        const { data: activosData, error: activosError } = await supabase.from('activos').select('*').eq('id_subarea', subarea.id);
        if (activosError) throw activosError;
        subarea.activos = activosData;

        for (const activo of subarea.activos) {
          const { data: subconjuntosData, error: subconjuntosError } = await supabase.from('subconjuntos').select('*').eq('id_activo', activo.id);
          if (subconjuntosError) throw subconjuntosError;
          activo.subconjuntos = subconjuntosData;

          for (const subconjunto of activo.subconjuntos) {
            const { data: componentesData, error: componentesError } = await supabase.from('componentes').select('*').eq('id_subconjunto', subconjunto.id);
            if (componentesError) throw componentesError;
            subconjunto.componentes = componentesData;

            const { data: spotsSubconjuntoData, error: spotsSubconjuntoError } = await supabase.from('spots').select('*').eq('id_subconjunto', subconjunto.id);
            if (spotsSubconjuntoError) throw spotsSubconjuntoError;
            subconjunto.spots = spotsSubconjuntoData;

            for (const componente of subconjunto.componentes) {
              const { data: spotsComponenteData, error: spotsComponenteError } = await supabase.from('spots').select('*').eq('id_componente', componente.id);
              if (spotsComponenteError) throw spotsComponenteError;
              componente.spots = spotsComponenteData;
            }
          }
        }
      }
    }
    areasTrabajo.value = areasData;
  } catch (error) {
    console.error('Error al cargar las áreas de trabajo:', error.message);
  }
}

function mostrarFormularioArea() {
  mostrarFormArea.value = true;
}

function cerrarFormularioArea() {
  mostrarFormArea.value = false;
}

function mostrarFormularioSubarea(id) {
  mostrarFormSubarea.value = true;
  areaId.value = id;
}

function cerrarFormularioSubarea() {
  mostrarFormSubarea.value = false;
}

function mostrarFormularioActivos(idSubarea) {
  mostrarFormActivos.value = true;
  subareaId.value = idSubarea;
}

function cerrarFormularioActivos() {
  mostrarFormActivos.value = false;
}

function mostrarFormularioSubconjunto(idActivo) {
  mostrarFormSubconjunto.value = true;
  activoId.value = idActivo;
}

function cerrarFormularioSubconjunto() {
  mostrarFormSubconjunto.value = false;
}

function mostrarFormularioComponente(idSubconjunto) {
  mostrarFormComponente.value = true;
  subconjuntoId.value = idSubconjunto;
}

function cerrarFormularioComponente() {
  mostrarFormComponente.value = false;
}

function mostrarFormularioSpotSubconjunto(idSubconjunto) {
  mostrarFormSpot.value = true;
  subconjuntoIdSpot.value = idSubconjunto;
  componenteIdSpot.value = null;
}

function mostrarFormularioSpotComponente(idComponente) {
  mostrarFormSpot.value = true;
  subconjuntoIdSpot.value = null;
  componenteIdSpot.value = idComponente;
}

function cerrarFormularioSpot() {
  mostrarFormSpot.value = false;
}

async function actualizarAreasTrabajo() {
  await cargarAreasTrabajo();
}

async function actualizarSubareasTrabajo() {
  await cargarAreasTrabajo();
}

async function actualizarActivos() {
  await cargarAreasTrabajo();
}

async function actualizarSubconjunto() {
  await cargarAreasTrabajo();
}

async function actualizarComponentes() {
  await cargarAreasTrabajo();
}

async function actualizarSpots() {
  await cargarAreasTrabajo();
}
</script>
