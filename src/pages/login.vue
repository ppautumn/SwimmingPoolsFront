<template>
  <b-row class="justify-content-md-center">
    <b-col col md="6">
      <b-form>
        <b-form-input v-model="loginData.email" placeholder="электропочта" type="email" class="mb-2"></b-form-input>
        <b-form-input v-model="loginData.password" placeholder="пароль" type="password" class="mb-2"></b-form-input>
        <urfu-button @click="login">Войти</urfu-button>
      </b-form>
    </b-col>
  </b-row>
</template>

<script>

import UrfuButton from '@/components/urfu-button.vue'

export default {
  name: "login",
  components: {UrfuButton},
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