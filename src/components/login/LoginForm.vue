<template>
    <div class="login-form">
        <v-card
            elevation="5"
            max-width="378"
            class="mx-auto"
            outlined
        >
<!--            <v-card-title>Login</v-card-title>-->
            <v-card-text>
                <v-form v-model="valid" accept-charset="utf-8">
                    <v-container>
                        <v-row>
                            <v-col
                                v-for="input in inputs"
                                :key="input.label"
                                cols="12"
                                md="12"
                            >
                                <v-text-field
                                        v-model="input.value"
                                        :rules="input.rules"
                                        :counter="input.counter"
                                        :label="input.label"
                                        :required="input.required"
                                        :type="input.type"
                                ></v-text-field>
                            </v-col>
                        </v-row>
                    </v-container>
                    <v-btn
                            color="primary"
                            @click="login()"
                            block
                    >
                        Entrar
<!--                        <v-icon right small>mdi-send</v-icon>-->
                    </v-btn>
                </v-form>
            </v-card-text>
            <v-card-actions>
                <div class="form-footer mx-2 my-2 caption">
                    <div>Esqueci minha senha!</div>
                    <div @click="cadastro()">Cadastre-se</div>
                </div>
            </v-card-actions>
        </v-card>
        <CadastroForm :open="openCadastro" :close="cadastro" />
    </div>
</template>

<script>
import axios from "axios";
import { saveUserSession, getApiURL } from "../../utils/utils"
import CadastroForm from "./CadastroForm";

export default {
    name: "LoginForm",
    components: { CadastroForm },
    data() {
        return {
            valid: true,
            inputs: [
                { label: "Email", value: "rodrigo.werneck@id.uff.br", required: true, counter: 50, rules: [ v => !!v || 'O Email é obrigatório', v => /.+@.+\..+/.test(v) || 'O email deve ser válido',], type: "text"},
                { label: "Senha", value: "123456", required: true, counter: 15, rules: [ v => !!v || 'A Senha é obrigatória', v => (v && v.length <= 15) || 'A senha deve ter no máximo 15 caracteres',], type: "password" },
            ],
            openCadastro: false
        }
    },
    methods: {
        changeTheme() {
            this.$vuetify.theme.dark = !this.$vuetify.theme.dark;
        },
        login() {
            const email = this.inputs[0].value;
            const senha = this.inputs[1].value;
            
            axios.post(getApiURL() + "auth/login", 
                { email, senha },
                {
                    headers: {
                        "Content-Type": "application/json",
                        "Access-Control-Allow-Origin": "*",       
                        "Access-Control-Allow-Methods": "GET, POST, PATCH, PUT, DELETE, OPTIONS",
                        "Access-Control-Allow-Headers": "Origin, Content-Type, X-Auth-Token"
                    }
                }
            )
                .then(response => {
                    const { data } = response;
                    if (data) {
                        saveUserSession(data)
                        this.$router.push({ name: "Home" }).catch(err => console.log(err));
                    }
                })
        },
        cadastro() {
            this.openCadastro = !this.openCadastro;
        }
    }
}
</script>

<style scoped>
.login-form {
    margin-top: 10%;
}

.form-footer {
    display: flex;
    justify-content: space-between;
    align-items: center;
    width: 100%;
}
.form-footer>div:hover { cursor: pointer; }
</style>