<template>
    <div class="solicitacoes">
        <NavBar :user="getUser()" :title="menu" />
        <v-main>
             <v-container>
                    <NovaSolicitacao :dialog="dialog" :close="close" />
                    <v-row class="topbar">
                        <div>
                        <v-btn
                            rounded
                            color="primary"
                            outlined
                            raised
                            text
                            elevation="2"
                            @click="dialog = !dialog"
                        >
                            
                            Adicionar
                            <v-icon
                                right
                                dark
                            >
                                mdi-plus
                            </v-icon>
                        </v-btn>
                        </div>
                        <div class="search">
                            
                                <v-text-field
                                    hide-details
                                    prepend-icon="mdi-magnify"
                                    single-line
                                    name="search"
                                    @keyup="e => change(e)"
                                ></v-text-field>

                          
                             
                        </div>

                    </v-row>
                  <v-flex d-flex class="mt-5">
                    <v-layout wrap>
                        <v-flex md12 >
                                <v-list elevation="3" v-if="solicitacoes.length > 0">
                                    <v-list-group
                                        v-for="solicitacao in solicitacoes" 
                                        :key="solicitacao.id"
                                        ripple
                                        @click="getInfo(solicitacao)"
                                    >
                                        <template v-slot:activator>
                                            <v-list-item-content>
                                               
                                                <v-list-item-title v-text="solicitacao.protocolo"></v-list-item-title>
                                               
                                                <v-list-item-subtitle v-text="solicitacao.data"></v-list-item-subtitle>
                                            </v-list-item-content>
                                        </template>

                                        <v-layout wrap v-if="show">
                                            <v-flex md6>
                                                    <v-card elevation="5" class="ma-5 pa-2" height="150px" v-if="info.unidadeEscolar">
                                                        <div class="overline">
                                                            Unidade Escolar
                                                        </div>

                                                        <v-card-title>
                                                            {{ info.unidadeEscolar.nome }}                                                            
                                                        </v-card-title>

                                                        <v-card-subtitle>
                                                            Vagas: {{ info.unidadeEscolar.numVagas }} <br>
                                                            Ano Escolaridade: {{ info.anoEscolaridade && info.anoEscolaridade.nome }}
                                                        </v-card-subtitle>
                                                    </v-card>
                                            </v-flex>

                                            <v-flex md6>
                                                    <v-card elevation="5" class="ma-5 pa-2" height="150px" v-if="info.aluno">
                                                        <div class="overline">
                                                            Aluno
                                                        </div>

                                                        <v-card-title>
                                                            {{ info.aluno && info.aluno.pessoa.nome }}
                                                        </v-card-title>

                                                        <v-card-subtitle>
                                                            Mãe: {{ info.aluno && info.aluno.nomeMae }} <br>
                                                            Pai: {{ info.aluno && info.aluno.nomePai }}
                                                        </v-card-subtitle>
                                                        
                                                    </v-card>
                                            </v-flex>

                                      
                                        </v-layout>

                                        
                                    </v-list-group>
                                </v-list>
                        </v-flex>
                    </v-layout>
                  </v-flex>
             </v-container>
        </v-main>
    </div>
</template>

<script>
import { NavBar, NovaSolicitacao } from "../components/index";
import { getUser, getApiURL } from "../utils/utils";
import axios from "axios";

export default {
    name: "Solicitacoes",
    components: { NavBar, NovaSolicitacao },
    data() {
        return {
            menu: "Solicitações",
            solicitacoes: [],
            dialog: false,
            search: "",
            info: { aluno: null, anoEscolaridade: null, unidadeEscolar: null },
            show: false,
        }
    },
    mounted() {
        this.getAllSolicitacoes();
    },
     watch: {
        // call again the method if the route changes
        '$route': 'getAllSolicitacoes'
    },
    methods: {
        getAllSolicitacoes() {
            const url = getApiURL() + 'solicitacao';
            axios.get(url).then(response => {
                const { data } = response;
                this.solicitacoes = data;
                console.log(this.solicitacoes)
            });
        },
        close() {
            this.dialog = false;
        },
        getUser(){ return getUser(); },
        change(event) {
            const { value } = event.target;
            this.search = value;
            let url = getApiURL() + 'solicitacao/search?protocolo=' + this.search;
            axios.get(url).then(response => {
                const { data } = response;
                this.solicitacoes = data;
            })
        },
        getInfo(solicitacao) {
            const { idAluno, idUnidadeEscolar, idAnoEscolaridade } = solicitacao;

            let newInfo = { aluno: null, unidadeEscolar: null, anoEscolaridade: null };

            let url_aluno = getApiURL() + `aluno/${idAluno}`;
            axios.get(url_aluno).then(response => {
                const { data } = response;
                newInfo.aluno = data;
            })
        
            let url_unidadeEscolar = getApiURL() + `ue/${idUnidadeEscolar}`;
            axios.get(url_unidadeEscolar).then(response => {
                const { data } = response;
                newInfo.unidadeEscolar = data;
            })
        
            let url_anoEscolaridade = getApiURL() + `ae/${idAnoEscolaridade}`;
            axios.get(url_anoEscolaridade).then(response => {
                const { data } = response;
                newInfo.anoEscolaridade = data;
            })

        
            this.info = newInfo;
            this.show = true;
            console.log(this.info)
         
            
            
            
        }
    }
}
</script>

<style scoped>
.topbar {
    display: grid;
    grid-auto-flow: column;
    justify-content: space-between;
    align-items: center;
}

.search {
    display: grid;
    align-items: baseline;
    justify-items: center;
    grid-auto-flow: column;
    align-content: center;
    text-align: center;
}
</style>