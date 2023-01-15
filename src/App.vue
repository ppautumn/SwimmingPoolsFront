<script setup>
import Navbar from '@/components/navbar.vue'
import {RouterView} from 'vue-router'
import UsefulInfo from '@/components/useful-info.vue'
import FooterComponent from '@/components/footer-component.vue'
</script>

<template>
  <navbar :user="user"/>
  <b-container class="p-2 p-md-5" fluid>
    <router-view v-slot="{Component, route}">
      <transition name="slide" mode="out-in">
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

/*
Here you provide CSS transition declaration css-property, timing, transition effect. enter direction is from hidden -> visible and leave is the reverse direction from visible -> hidden
*/

.slide-leave-active {
  transition: all .2s linear;
}

.slide-enter-active {
  transition: all .2s ease-out;
}

.slide-leave-from {
  opacity: 1;
  transform: scale(1);
}

.slide-leave-to {
  opacity: 0;
  transform: scale(0.95);
}

.slide-enter-from {
  transform: translateY(15px);
}

.slide-enter-to {
  transform: translateY(0);
}

</style>
