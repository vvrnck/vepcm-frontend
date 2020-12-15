<template>
    <div>
        <NavBar title="Login" />
        <v-main>
            <LoginForm />
        </v-main>
    </div>
</template>

<script>
import { NavBar, LoginForm } from "../components"

export default {
    name: "Login",
    components: { NavBar, LoginForm }
}
</script>