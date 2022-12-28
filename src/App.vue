<script setup>
import Navbar from '@/components/navbar.vue'
import {RouterView} from 'vue-router'
import UsefulInfo from '@/components/useful-info.vue'
import FooterComponent from '@/components/footer-component.vue'
</script>

<template>
  <navbar :user="user"/>
  <b-container class="p-5" fluid>
    <router-view v-slot="{Component}">
      <transition name="fade">
        <component :is="Component" :user="user" @login-success="setUser" @login-failure="handleLoginError"/>
      </transition>
    </router-view>
  </b-container>
  <useful-info/>
  <footer-component/>
</template>

<script>
import {getAccessToken, parseJwt, putAccessToken, putRefreshToken, redirectToAuthPage} from '@/auth-utils'

export default {
    data() {
      return {
        user: {id: null}
      }
    },
    async created() {
      const token = getAccessToken()
      if (this.$router.currentRoute.value.name !== 'login') {
        if (token) {
          this.user.id = parseJwt(token)['user_id']
        } else {
          await redirectToAuthPage(this.$router)
        }
      } else {
        this.user.id = null
      }
    },
    methods: {
      setUser(loginResponse) {
        this.user.id = parseJwt(loginResponse.data['access'])['user_id']
        putAccessToken(loginResponse.data['access'])
        putRefreshToken(loginResponse.data['refresh'])
        this.$router.push('/')
      },
      handleLoginError(e) {
        alert(e)
      }
    }
  }
</script>

<style scoped>
@font-face {
  font-family: "Montserrat";
  src: local("Montserrat"),
  url(./fonts/Montserrat-VariableFont_wght.ttf) format("truetype");
}

</style>
