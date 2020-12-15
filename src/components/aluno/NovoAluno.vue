<template>
  <v-row justify="center">
    <v-dialog
      v-model="dialog"
      max-width="800px"
      @click:outside="close()"
    >
      <v-card>
        <v-card-title>
          <span class="headline">
            {{ type === 'edit' ? 'Edição de Aluno' : 'Cadastro de Aluno'}}
          </span>
        </v-card-title>
        <v-card-text>
          <v-container>
            <v-row>
               <v-col cols="5">
                <v-text-field
                  label="Nome da Mãe*"
                  type="text"
                  required
                  @change="e => change('nomeMae', e)"
                  v-model="inputs.nomeMae"
                ></v-text-field>
              </v-col>
              <v-col cols="5">
                <v-text-field
                  label="Nome do Pai*"
                  type="text"
                  required
                  @change="e => change('nomePai', e)"
                  v-model="inputs.nomePai"
                ></v-text-field>
              </v-col>
              <v-col cols="2">
                <v-text-field
                  label="Naturalidade*"
                  required
                  @change="e => change('naturalidade', e)"
                  v-model="inputs.naturalidade"
                ></v-text-field>
              </v-col>
              <v-col
                cols="12"
                sm="8"
                md="8"
              >
                <v-text-field
                  label="Nome*"
                  name="nome"
                  required
                  @change="e => change('nome', e)"
                  v-model="inputs.nome"
                ></v-text-field>
              </v-col>
              <v-col
                cols="4"
                sm="4"
                md="4"
              >
                <v-text-field
                  label="CPF*"
                  name="cpf"
                  required
                  @change="e => change('cpf', e)"
                  v-model="inputs.cpf"
                ></v-text-field>
              </v-col>
              <v-col
                cols="4"
                sm="4"
                md="4"
              >
                <v-text-field
                  label="Identidade*"
                  name="identidade"
                  required
                  @change="e => change('identidade', e)"
                  v-model="inputs.identidade"
                ></v-text-field>
              </v-col>
              <v-col
                cols="12"
                sm="6"
                md="4"
              >
                 <v-dialog
                  ref="dialog"
                  v-model="modal"
                  :return-value.sync="inputs.dataNasc"
                  persistent
                  width="290px"
                >
                  <template v-slot:activator="{ on, attrs }">
                    <v-text-field
                      v-model="inputs.dataNasc"
                      label="Data de Nascimento"
                      prepend-icon="mdi-calendar"
                      readonly
                      v-bind="attrs"
                      v-on="on"
                    ></v-text-field>
                  </template>
                  <v-date-picker
                    v-model="inputs.dataNasc"
                    scrollable
                    locale="pt-br"
                  >
                    <v-spacer></v-spacer>
                    <v-btn
                      text
                      color="primary"
                      @click="modal = false"
                    >
                      Cancel
                    </v-btn>
                    <v-btn
                      text
                      color="primary"
                      @click="$refs.dialog.save(inputs.dataNasc)"
                    >
                      OK
                    </v-btn>
                  </v-date-picker>
                </v-dialog>
              </v-col>
             <v-col
                cols="4"
                sm="4"
              >
                <v-select
                  :items="['Masculino', 'Feminino']"
                  label="Sexo*"
                  name="sexo"
                  required
                  v-model="inputs.sexo"
                  @change="e => change('sexo', e)"
                ></v-select>
              </v-col>
             
              <v-col cols="3">
                <v-text-field
                  label="Município"
                  @change="e => change('municipio', e)"
                  v-model="inputs.municipio"
                ></v-text-field>
              </v-col>
              <v-col cols="3">
                <v-text-field
                  label="CEP"
                  @change="e => change('cep', e)"
                  v-model="inputs.cep"
                ></v-text-field>
              </v-col>
              <v-col cols="3">
                <v-text-field
                  label="Bairro"
                  @change="e => change('bairro', e)"
                  v-model="inputs.bairro"
                ></v-text-field>
              </v-col>
              <v-col cols="3">
                <v-text-field
                  label="UF"
                  @change="e => change('uf', e)"
                  v-model="inputs.uf"
                ></v-text-field>
              </v-col>
              
              <v-col cols="6">
                <v-text-field
                  label="Logradouro"
                  @change="e => change('logradouro', e)"
                  v-model="inputs.logradouro"
                ></v-text-field>
              </v-col>
              <v-col cols="3">
                <v-text-field
                  label="Número"
                  @change="e => change('numero', e)"
                  v-model="inputs.numero"
                ></v-text-field>
              </v-col>
              <v-col cols="3">
                <v-text-field
                  label="Celular"
                  @change="e => change('celular', e)"
                  v-model="inputs.celular"
                ></v-text-field>
              </v-col>
            </v-row>
          </v-container>
          <small>*indicates required field</small>
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
            @click="sendData()"
          >
            {{ type === 'edit' ? 'Editar' : 'Salvar' }}
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
          Close
        </v-btn>
      </template>
    </v-snackbar>
  </v-row>
</template>

<script>
import axios from 'axios';
import { getApiURL, getUser } from "../../utils/utils"

  export default {
    name: "NovoAluno",
    props: ["dialog", "close", "type", "aluno"],
    data: () => ({
      modal: false,
      inputs: {
          nome: "",
          cpf: "",
          identidade: "",
          dataNasc: "",
          sexo: "",
          nomeMae: "",
          nomePai: "",
          naturalidade: "",
          celular: "",
          bairro: "",
          cep: "",
          logradouro: "",
          municipio: "",
          numero: "",
          uf: ""
      },
      snackbar: { visible: false, message: "", timeout: 2500, color: "primary accent-4" }
    }),
    mounted() {
      if (this.aluno && this.type === 'edit') {
        const { id, pessoa, nomeMae, nomePai, naturalidade }  = this.aluno;

        this.inputs = {
          id: id,
          nome: pessoa.nome,
          cpf: pessoa.cpf,
          identidade: pessoa.identidade,
          dataNasc: pessoa.dataNasc,
          sexo: pessoa.sexo,
          nomeMae: nomeMae,
          nomePai: nomePai,
          naturalidade: naturalidade,
          celular: pessoa.celular,
          bairro: pessoa.endereco.bairro,
          cep: pessoa.endereco.cep,
          logradouro: pessoa.endereco.logradouro,
          municipio: pessoa.endereco.municipio,
          numero: pessoa.endereco.numero,
          uf: pessoa.endereco.uf
        }
      } else {
        // just fill with default data in create type (only to teste - remove later)
        this.inputs = {
          nome: "Joaquim Sem Nome",
          cpf: "111.111.111-11",
          identidade: "11.111.111-1",
          dataNasc: "29/08/1996",
          sexo: "Masculino",
          nomeMae: "Nome Mãe Completo",
          nomePai: "Nome Pai Completo",
          naturalidade: "Fluminense",
          celular: "(21) 99840-5404",
          bairro: "Bairro Z",
          cep: "11111-111",
          logradouro: "Rua A",
          municipio: "Rio de Janeiro",
          numero: "11",
          uf: "RJ"
        }
      }
    },
    methods: {
        change(input, e) {
            this.inputs[input] = e;
        },
        sendData() {
            const { nomeMae, nomePai, naturalidade, identidade, nome, cpf, sexo, celular, dataNasc, logradouro, numero, cep, uf, municipio, bairro } = this.inputs;

            let data = {
                naturalidade: naturalidade,
                nomeMae: nomeMae,
                nomePai: nomePai,
                pessoa: {
                    identidade: identidade,
                    nome: nome,
                    cpf: cpf,
                    sexo: sexo,
                    celular: celular,
                    dataNasc: dataNasc,
                    endereco: {
                        logradouro: logradouro,
                        numero: numero,
                        cep: cep,
                        uf: uf,
                        municipio: municipio,
                        bairro: bairro
                    }
                },
                idResponsavel: getUser().id
            }

            if (this.type === 'edit') this.putData(data);
            else this.postData(data);
        },
        postData(data) {
            axios.post(getApiURL() + 'aluno', data).then(response => {
                console.log(response)
                this.snackbar = { visible: true, message: "Aluno criado com sucesso!", timeout: 2500, color: "green accent-4" };    
            }).then(() => {
              setTimeout(() => {
                this.$router.push("alunos").catch(err => console.log(err));
                window.location.reload()
              }, 700)
            })
        },
        putData(data) {
            axios.put(getApiURL() + `aluno/${this.aluno.id}`, data).then(response => {
                console.log(response)
                this.snackbar = { visible: true, message: "Aluno editado com sucesso!", timeout: 2500, color: "green accent-4" };    
            }).then(() => {
              setTimeout(() => {
                this.$router.push("alunos").catch(err => console.log(err));
                window.location.reload()
              }, 700)
            })
        }
    }
  }
</script>