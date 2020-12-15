<template>
    <v-card
    class="ma-3"
    
    height="310"
  >


    <v-card-title class="card-title">
         
      <v-avatar :color="aluno.pessoa.sexo === 'Masculino' ? 'indigo' : 'pink'" size="52">
        <v-icon dark size="40">
          mdi-account-circle
        </v-icon>
      </v-avatar>
      <p class="ml-3">
        {{ aluno.pessoa.nome }}
      </p>
    </v-card-title>

    <v-card-subtitle class="mt-3">
      CPF: {{ aluno.pessoa.cpf }} <br>
      identidade: {{ aluno.pessoa.identidade }} <br>
      Sexo: {{ aluno.pessoa.sexo }} <br>
      Data de Nascimento: {{ aluno.pessoa.dataNasc }} <br>
    </v-card-subtitle>
   
    <v-card-actions>
      <v-btn
      class="mt-15"
        color="primary"
        dark
        text
        @click="reveal = true"
      >
        Mais
      </v-btn>

      <v-spacer></v-spacer>


    </v-card-actions>

    <v-expand-transition>
      <div v-show="show">
        <v-divider></v-divider>

        <v-card-text>
          {{ aluno.nome }}
        </v-card-text>
      </div>
    </v-expand-transition>

     <v-expand-transition>
      <v-card
        v-if="reveal"
        class="transition-fast-in-fast-out v-card--reveal d-flex flex-column"
        style="height: 100%;"
      >
        <v-card-text class="pb-0">
          <p class="display-1 text--primary product-title">
            {{ aluno.pessoa.nome }}
          </p>
          <div class="subtitle-2">
            Nome Mãe: {{ aluno.nomeMae }} <br>
            Nome Pai: {{ aluno.nomePai }} <br>
            Naturalidade: {{ aluno.naturalidade }} <br>
            Celular: {{ aluno.pessoa.celular }}  <br>
            Endereço: {{ aluno.pessoa.endereco.cep }} - {{ aluno.pessoa.endereco.municipio }}, {{ aluno.pessoa.endereco.uf }} <br>
            {{ aluno.pessoa.endereco.bairro }} - {{ aluno.pessoa.endereco.logradouro }}, {{ aluno.pessoa.endereco.numero }} <br>
          </div>
        </v-card-text>
        <v-spacer></v-spacer>
        <v-card-actions class="pt-0 actions">
          
          <v-btn
            text
            color="primary accent-4"
            @click="reveal = false"
          >
            Close
          </v-btn>

          <div class="ac-btns">
            <v-btn dark fab x-small color="primary" @click="openEdit = true">
              <v-icon dark>mdi-pencil</v-icon>
            </v-btn>
            
            <v-btn dark fab x-small color="red darken-1" @click="openDelete = true">
              <v-icon dark>mdi-delete</v-icon>
            </v-btn>
          </div>
        </v-card-actions>
      </v-card>
    </v-expand-transition>
     <v-snackbar
      v-model="snackbar.visible"
      :timeout="snackbar.timeout"
      :color="snackbar.color"
      elevation="24"
      right
    >
      {{ snackbar.message }}

      <template v-slot:action="{ attrs }">
        <v-btn
          color="white"
          text
          v-bind="attrs"
          @click="snackbar.visible = false"
        >
          Close
        </v-btn>
      </template>
    </v-snackbar>
    
    <NovoAluno v-if="openEdit" :dialog="openEdit" :close="close" type="edit" :aluno="aluno" />
     <v-dialog
      v-model="openDelete"
      max-width="340"
    >     
      <v-card>
        <v-card-title class="headline">
          Deletar Aluno?
        </v-card-title>
        <v-card-text>
          Tem certeza que deseja deletar este aluno? <br><br>
          Esta ação não pode ser desfeita.
        </v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn
            @click="openDelete = false"
            color="blue darken-1"
            text
          >
            Fechar
          </v-btn>
          <v-btn
          
            color="red darken-1 white--text"
            @click="deletarAluno(aluno.id)"
          >
            Deletar
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>


  </v-card>
</template>

<script>
import { getApiURL } from "../../utils/utils"
import axios from "axios";
import NovoAluno from "./NovoAluno";

export default {
    name: "Aluno",
    props: ["aluno"],
    components: { NovoAluno },
    data() {
        return {
            show: false,
            reveal: false,
            snackbar: { visible: false, message: "", timeout: 2500, color: "primary accent-4" },
            openDelete: false,
            openEdit: false
        }
    },
    methods: {
      deletarAluno(id) {
        const url = getApiURL() + `aluno/${id}`
        axios.delete(url).then(response => {
          console.log(response)
          this.openDelete = false;
          this.snackbar = { visible: true, message: "Aluno deletado com sucesso!", timeout: 2500, color: "green accent-4" };    
         }).then(() => {
           setTimeout(() => {
              this.$router.push("alunos").catch(err => console.log(err));
              window.location.reload() 
           }, 700)
            
        })
      },
      close() {
        this.openEdit = false;
      }
    }
}
</script>

<style>
.v-card--reveal {
  bottom: 0;
  opacity: 1 !important;
  position: absolute;
  width: 100%;
}

.card-title {
  text-overflow: ellipsis;
  white-space: nowrap;
  overflow: hidden;
  width: 90%;
}

.actions {
  display: flex;
  justify-content: space-between;
}

.ac-btns {
  display: grid;
  grid-gap: 5px;
  grid-auto-flow: column;
}
</style>