<template>
  <div class="home">
    <NavBar :user="getUser()" :title="menu" />
    <v-main>
      <v-container>
          <v-col
              cols="12"
              md="12"
          >
          <v-card elevation="3" class="pa-10">
            <h3>
              Este trabalho tem como objetivo apresentar o trabalho de aplicações corporativas, tanto como a comunicação entre o frontend 
              e o backend para a disciplina de Aplicações Corporativas 2020.1
            </h3>
          </v-card>
          <v-spacer></v-spacer>
          <v-card elevation="3" class="pa-10 mt-10">
            <h3 class="mb-5">Grupo:</h3>
            <div style="display: grid; grid-auto-flow: row;">
              <span>Amanda Inácio</span>
              <span>Maria Luiza</span>
              <span>Rodrigo Werneck</span>
              <span>Shaiana </span>
            </div>
          </v-card>
        </v-col>
      </v-container>
    </v-main>
  </div>
</template>

<script>

import { NavBar } from '@/components'
import { getUser } from '../utils/utils';

export default {
  name: 'Home',
  data() {
    return {
      menu: "Home",
    }
  },
  components: {
    NavBar
  },
  methods: {
    getUser(){ return getUser(); }
  }
}
</script>
