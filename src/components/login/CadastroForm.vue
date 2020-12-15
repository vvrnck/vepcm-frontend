<template>
  <v-row justify="center">
    <v-dialog
      v-model="open"
      max-width="800px"
    >
      <v-card>
        <v-card-title>
          <span class="headline">Cadastro de Usuário</span>
        </v-card-title>
        <v-card-text>
          <v-container>
            <v-row>
              
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
              <v-col cols="4">
                <v-text-field
                  label="Email*"
                  required
                  @change="e => change('email', e)"
                  v-model="inputs.email"
                ></v-text-field>
              </v-col>
              <v-col cols="4">
                <v-text-field
                  label="Senha*"
                  type="password"
                  required
                  @change="e => change('senha', e)"
                  v-model="inputs.senha"
                ></v-text-field>
              </v-col>
              <v-col cols="4">
                <v-text-field
                  label="Confirmar Senha*"
                  type="password"
                  required
                  @change="e => change('confirmarSenha', e)"
                  v-model="inputs.confirmarSenha"
                ></v-text-field>
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
            color="blue darken-1"
            text
            @click="sendData()"
          >
            Salvar
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
     <v-snackbar
      v-model="snackbar.visible"
      :timeout="snackbar.timeout"
      color="primary accent-4"
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
import { getApiURL } from "../../utils/utils"

  export default {
    name: "CadastroForm",
    props: ["open", "close"],
    data: () => ({
      modal: false,
      inputs: {
          nome: "Rodrigo Werneck",
          cpf: "111.111.111-11",
          identidade: "11.111.111-1",
          dataNasc: "1996-08-29",
          sexo: "Masculino",
          email: "rodrigowerneck@id.uff.br",
          senha: "123456",
          confirmarSenha: "123456",
          celular: "(21) 99840-5404",
          bairro: "Bairro Z",
          cep: "11111-111",
          logradouro: "Rua A",
          municipio: "Rio de Janeiro",
          numero: "11",
          uf: "RJ"
      },
      snackbar: { visible: false, message: "", timeout: 2500 }
    }),
    methods: {
        change(input, e) {
            this.inputs[input] = e;
        },
        sendData() {
            if (this.inputs.senha != this.inputs.confirmarSenha) {
                this.snackbar = { visible: true, message: "Senhas diferem!", timeout: 2500 };
            } else {
                const { email, senha, identidade, nome, cpf, sexo, celular, dataNasc, logradouro, numero, cep, uf, municipio, bairro } = this.inputs;

                let data = {
                    email: email,
                    senha: senha,
                    tipoUsuario: 2,
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
                }

                console.log(data)
                axios.post(getApiURL() + 'usuario', data).then(response => {
                    console.log(response)
                    this.close();
                    this.snackbar = { visible: true, message: "Usuário criado com sucesso!", timeout: 2500 };
                    
                })
                
            }
        }
    }
  }
</script>