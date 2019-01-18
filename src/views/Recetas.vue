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
                <v-text-field v-model="dialog.receta.nombre" label="Nombre*" required></v-text-field>
              </v-flex>
              <v-flex xs12>
                Ingredientes
              </v-flex>
              <v-container grid-list-md>
                <v-layout wrap>
                  <v-container grid-list-md xs12 v-for="(ingrediente, index) in dialog.receta.ingredientes">
                    <v-layout wrap>
                      <v-flex xs12 sm6 md3>
                        <v-text-field label="Nombre*" required v-model="ingrediente.nombre"></v-text-field>
                      </v-flex>
                      <v-flex xs12 sm6 md3>
                        <v-text-field label="Cantidad*" required v-model="ingrediente.cantidad"></v-text-field>
                      </v-flex>
                      <v-flex xs12 sm6 md3>
                        <v-text-field label="Unidad*" required v-model="ingrediente.unidad"></v-text-field>
                      </v-flex>
                      <v-flex xs12 sm6 md3>
                        <v-btn fab dark small color="primary" @click="removeIngrediente(index)">
                          <v-icon dark>remove</v-icon>
                        </v-btn>
                      </v-flex>
                    </v-layout>
                  </v-container>
                </v-layout>
                <v-btn small fab dark color="indigo" @click="addIngrediente">
                  <v-icon dark>add</v-icon>
                </v-btn>
              </v-container>
              <v-flex xs12>
                Pasos
              </v-flex>
              <v-container grid-list-md>
                <v-layout wrap>
                  <v-container grid-list-md xs12 v-for="(paso, index) in dialog.receta.pasos">
                    <v-layout wrap>
                      <v-flex xs2>
                        {{ paso.numero }}
                        <!-- <v-text-field label="Numero*" required v-model="paso.numero"></v-text-field> -->
                      </v-flex>
                      <v-flex xs8>
                        <v-text-field label="Texto*" required v-model="paso.texto"></v-text-field>
                      </v-flex>
                      <v-flex xs2 >
                        <v-btn fab dark small color="primary" @click="removePaso(index)">
                          <v-icon dark>remove</v-icon>
                        </v-btn>
                      </v-flex>
                    </v-layout>
                  </v-container>
                </v-layout>
                <v-btn small fab dark color="indigo" @click="addPaso">
                  <v-icon dark>add</v-icon>
                </v-btn>
              </v-container>
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
                receta: {
                    nombre: '',
                    ingredientes: [],
                    pasos: []
                }
            }
        }
    },
    methods: {
        agregarReceta () {
            this.dialog.loading = true
            axios.post('https://recetario-back.herokuapp.com/api/v0/recetas',this.dialog.receta,  {
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded'
                }
            })
                .then(response => {
                    console.log(response);
                    this.dialog.loading = false
                })
                .catch(function (error) {
                    console.log(error);
                });
        },
        filtrar (val, search) {
            return val.toLowerCase().includes(search.toLowerCase())
        },
        addIngrediente: function() {
            this.dialog.receta.ingredientes.push({
                nombre: "",
                cantidad: "",
                unidad: ""
            });
        },
        removeIngrediente: function(index) {
            this.dialog.receta.ingredientes.splice(index, 1);
        },
        addPaso: function() {
            this.dialog.receta.pasos.push({
                numero: this.dialog.receta.pasos.length+1,
                texto: ""
            });
        },
        removePaso: function(index) {
            this.dialog.receta.pasos.splice(index, 1);
            for(var i = 0; i < this.dialog.receta.pasos.length; i++){
                this.dialog.receta.pasos[i].numero = i+1;
            }
        },
    },
    created: function () {
        axios.get('https://recetario-back.herokuapp.com/api/v0/recetas').then(response => (this.recetas = response.data))
    }
}
</script>

<style>
</style>
