<template>
  <v-row justify="center">
    <v-dialog
      v-model="dialog"
      @click:outside="close()"
      max-width="800px"
    >     
      <v-card>
        <v-card-title>
          <span class="headline">Nova Solicitação</span>
        </v-card-title>
        <v-card-text>
          <v-container>
            <v-row>
              <v-col
                cols="6"
                sm="6"
                md="6"
              >
                <v-text-field
                  prepend-icon="mdi-rename-box"
                  label="Protocolo*"
                  name="protocolo"
                  v-model="fields.protocolo"
                  required
                  @input="(value) => change('protocolo', value)"
                ></v-text-field>
              </v-col>
              
             <v-col
                cols="6"
                sm="6"
                md="6"
              >
                <v-dialog
                  ref="dialog"
                  v-model="modal"
                  :return-value.sync="fields.data"
                  persistent
                  width="290px"
                >
                  <template v-slot:activator="{ on, attrs }">
                    <v-text-field
                      v-model="fields.data"
                      label="Data*"
                      prepend-icon="mdi-calendar"
                      readonly
                      v-bind="attrs"
                      v-on="on"
                    ></v-text-field>
                  </template>
                  <v-date-picker
                    v-model="fields.data"
                    scrollable
                    locale="pt-br"
                  >
                    <v-spacer></v-spacer>
                    <v-btn
                      text
                      color="primary"
                      @click="modal = false"
                    >
                      Cancelar
                    </v-btn>
                    <v-btn
                      text
                      color="primary"
                      @click="$refs.dialog.save(fields.data)"
                    >
                      OK
                    </v-btn>
                  </v-date-picker>
                </v-dialog>
              </v-col>

              <v-col 
                cols="4"
                sm="12"
                md="4"
              >
                <v-select
                  prepend-icon="mdi-school"
                  :items="alunosItems"
                  label="Alunos*"
                  v-model="fields.aluno"
                  required
                  name="aluno"
                  @change="(value) => change('aluno', value)"
                ></v-select>
              </v-col>

              <v-col
                cols="4"
                sm="12"
                md="4"
              >
                <v-select
                  prepend-icon="mdi-home"
                  :items="unidadesEscolaresItems"
                  label="Unidade Escolar*"
                  name="unidadeEscolar"
                  v-model="fields.unidadeEscolare"
                  required
                  @change="(value) => change('unidadeEscolar', value)"
                ></v-select>
              </v-col>
           
              <v-col cols="12" sm="4" md="4">
                <v-select
                    prepend-icon="mdi-calendar-clock"
                  :items="anosEscolaresItems"
                  label="Ano Escolar*"
                  name="anoEscolar"
                  v-model="fields.anoEscolar"
                  required
                  @change="(value) => change('anoEscolar', value)"
                ></v-select>
              </v-col>
             
            </v-row>
          </v-container>
        </v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn
            color="blue darken-1"
            text
            @click="close()"
          >
            Fechar
          </v-btn>
          <v-btn
            class="white--text"
            color="green darken-1"
            @click="save()"
          >
            Salvar
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
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
          Fechar
        </v-btn>
      </template>
    </v-snackbar>
  </v-row>
</template>

<script>
import { getApiURL, getUser } from '../../utils/utils';
import axios from 'axios';

export default {
    name: "NovaSolicitacao",
    props: ["dialog", "close"],
    data() {
        return {
            modal: false,
            fields: {
               protocolo: "PRT-12345",
               data: "2020-12-16",
               unidadeEscolar: "",
               aluno: "",
               anoEscolar: ""
            },
            alunos: [],
            alunosItems: [],
            unidadesEscolares: [],
            unidadesEscolaresItems: [],
            anosEscolares: [],
            anosEscolaresItems: [],
            snackbar: { visible: false, message: "", timeout: 2500, color: "primary" }
        }
    },
    mounted() {
      const alunos_url = getApiURL() + 'aluno/responsavel/' + getUser().id;
      axios.get(alunos_url).then(response => {
        const { data } = response;
        this.alunos = data;
        this.alunosItems = Array.from(data, f => f.pessoa.nome); 
      });

      const unidade_escolar_url = getApiURL() + 'ue';
      axios.get(unidade_escolar_url).then(response => {
        const { data } = response;
        if (data) {
          this.unidadesEscolares = data;
          this.unidadesEscolaresItems = Array.from(data, ue => ue.nome); 
        }
      });      


      const ano_escolaridade_url = getApiURL() + 'ae';
      axios.get(ano_escolaridade_url).then(response => {
        const { data } = response;
        if (data) {
          this.anosEscolares = data;
          this.anosEscolaresItems = Array.from(data, ae => ae.nome); 
        }
      });      
    },
    methods: {
        change(field, e) {
          if (field === "unidadeEscolar") {
            this.unidadesEscolares.map(ue => {
              if (ue.nome === e) {
                this.anosEscolaresItems = Array.from(ue.anoEscolaridade, ae => ae.nome);
              }  
            })
          }
          this.fields[field] = e;
        },   
        save() {
            const url = getApiURL() + 'solicitacao';
            const { protocolo, data, unidadeEscolar, aluno, anoEscolar  } = this.fields;

            let sendAluno = this.alunos.find(a => a.pessoa.nome == aluno);
            let sendUnidadeEscolar = this.unidadesEscolares.find(ue => ue.nome == unidadeEscolar);
            let sendAnoEscolar = this.anosEscolares.find(ae => ae.nome == anoEscolar);
            
            const sendData = {
                protocolo: protocolo,
                data: data,
                idResponsavel: getUser().id,
                idAluno: sendAluno.id,
                idUnidadeEscolar: sendUnidadeEscolar.id,
                idAnoEscolaridade: sendAnoEscolar.id,
            }

            let newData = Object.assign({}, sendData);
            // Object.keys(newData).map(item => {
            //   if (typeof(newData[item]) == 'object') {
            //     if (newData[item].id) delete newData[item].id
            //     Object.keys(newData[item]).map(o => {
            //       if (typeof(newData[item][o]) == 'object') {
            //         delete newData[item][o].id;
            //         Object.keys(newData[item][o]).map(r => {
            //           if (typeof(newData[item][o][r]) == 'object') delete newData[item][o][r].id
            //         })
            //       }
            //     });
            //   }
            // })
            
            axios.post(url, newData).then(response => {
                console.log(response);
                this.snackbar = { visible: true, message: "Solicitação criada com sucesso!", timeout: 2500, color: "green accent-4" };
            }).then(() => {
              setTimeout(() => {
                this.dialog = false;
                this.$router.push("solicitacoes").catch(err => console.log(err));
                window.location.reload()
              }, 700);
            })
        },
        
    },
}
</script>