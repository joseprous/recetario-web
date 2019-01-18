<template>
<v-card>
  <v-card-title primary-title>
    {{ receta.nombre }}
  </v-card-title>
  <v-card-text>
    <v-container fluid grid-list-md>
      <v-card v-for="ingrediente in receta.ingredientes" :key="ingrediente.nombre">
        <v-card-title primary-title>
          Ingredientes
        </v-card-title>
        <v-card-text>
          {{ ingrediente.nombre }}
          {{ ingrediente.cantidad }}
          {{ ingrediente.unidad }}
        </v-card-text>
      </v-card>
      <v-card v-for="paso in receta.pasos" :key="paso.numero">
        <v-card-title primary-title>
          Pasos
        </v-card-title>
        <v-card-text>
          {{ paso.numero }}
          {{ paso.texto }}
        </v-card-text>
      </v-card>
    </v-container>
  </v-card-text>
</v-card>
</template>

<script>
import axios from 'axios'
export default {
    name: 'Receta',
    props: {
        recetaId: {
            type: String,
            required: true
        }
    },
    data() {
        return {
            receta: []
        }
    },
    created: function () {
        axios.get(' https://recetario-back.herokuapp.com/api/v0/recetas/' + this.recetaId).then(response => (this.receta = response.data))
    }
}
</script>

<style>
</style>
