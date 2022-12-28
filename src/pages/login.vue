<template>
  <b-row class="justify-content-md-center">
    <b-col col md="6">
      <b-form>
        <b-form-input v-model="loginData.email" placeholder="электропочта" type="email" class="mb-2"></b-form-input>
        <b-form-input v-model="loginData.password" placeholder="пароль" type="password" class="mb-2"></b-form-input>
        <b-button squared v-on:click="login" class="mb-2 urfu-button">Войти</b-button>
      </b-form>
    </b-col>
  </b-row>
</template>

<script>

export default {
  name: "login",
  props: {
    user: Object,
  },
  emits: ['login-success', 'login-failure'],
  data() {
    return {
      loginData: {
        email: '',
        password: '',
      },
    }
  },
  methods: {
    async login() {
      try {
        const response = await this.axios.post('/auth/token/', this.loginData)
        this.$emit('login-success', response)
      } catch (e) {
        this.$emit('login-failure', e)
      }
    },
  },
}
</script>

<style scoped>

</style>