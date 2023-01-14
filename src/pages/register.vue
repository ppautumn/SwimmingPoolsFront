<template>
  <b-row class="justify-content-md-center">
    <b-col col md="6">
      <b-form>
        <b-form-input v-model="registerData.email" placeholder="электропочта" type="email" class="mb-2"></b-form-input>
        <b-form-input v-model="registerData.password" placeholder="пароль" type="password" class="mb-2"></b-form-input>
        <b-form-input v-model="registerData.password2" placeholder="подтвердите пароль" type="password" class="mb-2"></b-form-input>
        <b-input-group>
          <b-form-input v-model="registerData.firstname" placeholder="имя" type="text" class="mb-2"></b-form-input>
          <b-form-input v-model="registerData.lastname" placeholder="фамилия" type="text" class="mb-2"></b-form-input>
        </b-input-group>
        <b-form-checkbox v-model="registerData.acceptedRules" class="mb-2">Я ознакомлен с
          <router-link to="/contact-us">правилами</router-link>
          и согласен на обработку персональных данных
        </b-form-checkbox>
        <urfu-button @click="register">Зарегистрироваться</urfu-button>
      </b-form>
    </b-col>
  </b-row>
</template>

<script>

import UrfuButton from '@/components/urfu-button.vue'

export default {
  name: "register",
  components: {UrfuButton},
  props: {
    user: Object,
  },
  emits: ['login-success', 'login-failure'],
  data() {
    return {
      registerData: {
        email: '',
        password: '',
        password2: '',
        firstname: '',
        lastname: '',
        acceptedRules: false,
      },
    }
  },
  methods: {
    async register() {
      try {
        await this.axios.post('/auth/signup/', this.registerData)
        const loginResponse = await this.axios.post('/auth/token/', this.loginData)
        this.$emit('login-success', loginResponse)
      } catch (e) {
        this.$emit('login-failure', e)
      }

    },
  },
  computed: {
    loginData() {
      return {
        email: this.registerData.email,
        password: this.registerData.password,
      }
    }
  }
}
</script>

<style scoped>

</style>