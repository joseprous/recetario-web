<template>
<v-card class="flexcard">
  <v-card-title primary-title>
    Recetas
  </v-card-title>
  <v-card-text class="grow">
      <v-list>
        <v-list-tile v-for="receta in recetas" :key="receta.id">
          <v-list-tile-content>
            <v-card class="flexcard" :to="{ name: 'receta', params: { recetaId: receta.id } }">
              <v-card-title primary-title>
                {{ receta.nombre }}
              </v-card-title>
            </v-card>
          </v-list-tile-content>
        </v-list-tile>
      </v-list>
  </v-card-text>
  <v-card-actions>
    <v-dialog v-model="dialog.enabled" persistent max-width="500px">
      <v-btn
        slot="activator"
        color="primary"
        dark
        small
        absolute
        botton
        right
        fab
        >
        <v-icon>add</v-icon>
      </v-btn>
      <v-card>
        <v-card-title>
          <span class="headline">Agregar Receta</span>
        </v-card-title>
        <v-card-text>
          <v-container grid-list-md>
            <v-layout wrap>
              <v-flex xs12>
                <v-text-field v-model="dialog.nombre" label="Nombre" required></v-text-field>
              </v-flex>
            </v-layout>
          </v-container>
          <small>*indica campos obligatorios</small>
        </v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="primary" flat @click.native="dialog.enabled = false">Cancelar</v-btn>
          <v-btn
            :loading="dialog.loading"
            color="primary"
            flat
            @click.native="agregarReceta"
            >
            Guardar
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </v-card-actions>
</v-card>
</template>

<script>
import axios from 'axios'
export default {
    name: 'Recetas',
    data() {
        return {
            recetas: [],
            dialog: {
                enabled: false,
                loading: false,
                nombre: ''
            }
        }
    },
    methods: {
        agregarReceta () {
            this.dialog.loading = true
        },
        filtrar (val, search) {
            return val.toLowerCase().includes(search.toLowerCase())
        }
    },
    created: function () {
        axios.get(' https://recetario-back.herokuapp.com/api/v0/recetas').then(response => (this.recetas = response.data))
    }
}
</script>

<style>
</style>
