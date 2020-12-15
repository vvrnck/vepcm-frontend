<template>
    <div class="alunos">
        <NavBar :user="getUser()" :title="menu" />
        <v-main>
             <v-container>
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
                 <NovoAluno v-if="dialog" :dialog="dialog" :close="close" type="create" />
                 
                      <v-flex d-flex class="mt-5">
                        <v-layout wrap>
                            <v-flex md6 v-for="aluno in alunos" :key="aluno.id">
                                
                                    <Aluno :aluno="aluno" />
                                
                            </v-flex>
                        </v-layout>
                      </v-flex>
                 
                
             </v-container>
        </v-main>
    </div>
</template>

<script>
import { Aluno, NavBar, NovoAluno } from "@/components";
import { getUser, getApiURL } from "../utils/utils";
import axios from "axios";

export default {
    name: "Alunos",
    components: { Aluno, NavBar, NovoAluno },
    data() {
        return {
            menu: "Alunos",
            dialog: false,
            alunos: [],
        }
    },
    mounted() {
        this.getAllAlunos();
    },
    watch: {
        // call again the method if the route changes
        '$route': 'getAllAlunos'
    },
    
    methods: {
        getAllAlunos() {
            const url = getApiURL() + 'aluno/responsavel/' + getUser().id;
            axios.get(url).then(response => {
                const { data } = response;
                this.alunos = data;
                console.log(this.alunos)
            })
        },
        getUser(){ return getUser(); },
        close() {
            this.dialog = false;
        },
    }
}
</script>