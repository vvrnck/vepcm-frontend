<template>
  <div class="navbar">
     <v-app-bar
      app
      color="primary"
      dark
    >
      <v-app-bar-nav-icon v-if="user" @click.stop="drawer = !drawer"></v-app-bar-nav-icon>

      <v-toolbar-title>
          {{ title }}
      </v-toolbar-title>

      <v-spacer></v-spacer>

      <div v-if="user">
        {{ user.email }}
      </div>
      <v-btn icon @click="changeTheme()">
        <v-icon>mdi-theme-light-dark</v-icon>
      </v-btn>
    </v-app-bar>

     <v-navigation-drawer
                v-model="drawer"
                absolute
                temporary
                v-if="user"
        >
            <v-list-item>
                <v-list-item-avatar>
                    <v-avatar color="red white--text">
                      {{ user.pessoa.nome.split("")[0] }}
                    </v-avatar>
                </v-list-item-avatar>

                <v-list-item-content>
                    <v-list-item-title>{{ user.pessoa.nome }}</v-list-item-title>
                </v-list-item-content>
            </v-list-item>

            <v-divider></v-divider>

            <v-list dense>
                <v-list-item link v-for="item in itens" :key="item.label" @click="changeMenu(item.label)" :style="[!item.scopes.includes(user.tipoUsuario) && {'display': 'none'} ]">
                    <v-list-item-icon>
                      <v-icon>{{ item.icon }}</v-icon>
                    </v-list-item-icon>
                    <v-list-item-content>
                        <v-list-item-title>{{ item.label }}</v-list-item-title>
                    </v-list-item-content>
                </v-list-item>
             
                <v-divider></v-divider>
                <v-list-item link @click="logout()">
                    <v-list-item-icon><v-icon>mdi-keyboard-return</v-icon></v-list-item-icon>

                    <v-list-item-content>
                        <v-list-item-title>Sair</v-list-item-title>
                    </v-list-item-content>
                </v-list-item>
            </v-list>
        </v-navigation-drawer>
  </div>
</template>

<script>
import { clearUserSession } from "../../utils/utils"
export default {
    name: "NavBar",
    props: ["user", "title"],
    data() {
      return {
        drawer: false,
        itens: [
          { icon: "mdi-home", label: "Home", scopes: ["GESTOR", "SECRETARIA", "RESPONSAVEL"] },
          { icon: "mdi-newspaper", label: "Notícias", scopes: ["GESTOR", "SECRETARIA", "RESPONSAVEL"] },
          { icon: "mdi-note-text", label: "Lista de Espera", scopes: ["GESTOR", "SECRETARIA", "RESPONSAVEL"] },
          { icon: "mdi-folder", label: "Solicitações", scopes: ["GESTOR", "SECRETARIA", "RESPONSAVEL"] },
          { icon: "mdi-school", label: "Alunos", scopes: ["GESTOR", "SECRETARIA", "RESPONSAVEL"] },
          { icon: "mdi-school", label: "Unidades Escolares", scopes: ["GESTOR", "SECRETARIA"] },
          { icon: "mdi-forum", label: "Fale Conosco", scopes: ["GESTOR", "SECRETARIA", "RESPONSAVEL"] },
          { icon: "mdi-account", label: "Perfil", scopes: ["GESTOR", "SECRETARIA", "RESPONSAVEL"] },
          { icon: "mdi-account-multiple", label: "Usuários", scopes: ["SECRETARIA", "GESTOR"] }          
        ]
      }
    },
    methods: {
        changeTheme() {
            this.$vuetify.theme.dark = !this.$vuetify.theme.dark;
        },
        logout() {
          clearUserSession();
        },
        changeMenu(item) {
          if (item === "Solicitações") return this.$router.push("solicitacoes").catch(err => console.log(err));         
          else if (item == "Home") return this.$router.push("home").catch(err => console.log(err));         
          else if (item == "Alunos") return this.$router.push("alunos").catch(err => console.log(err));         
          else return this.$router.push("not_found").catch(err => console.log(err));
        }
    }
}
</script>