<script setup>
import IconUrfu from '@/components/icons/IconUrfu.vue'
</script>
<template>
  <b-navbar toggleable="lg" sticky="top" class="navbar px-lg-5">
    <b-navbar-brand href="#">
      <icon-urfu/>
      <span class="beautiful-text">
        ниверситетский
      </span>
    </b-navbar-brand>

    <b-navbar-toggle target="nav-collapse"/>

    <b-collapse id="nav-collapse" is-nav="true">
      <b-navbar-nav>
        <b-nav-item exact-active-class="active" to="/">Расписание</b-nav-item>
        <b-nav-item exact-active-class="active" to="/book">Записаться</b-nav-item>
        <b-nav-item exact-active-class="active" to="/trainings">Тренировки</b-nav-item>
        <b-nav-item exact-active-class="active" to="/prices">Цены</b-nav-item>
        <b-nav-item exact-active-class="active" to="/contact-us">Контакты</b-nav-item>
      </b-navbar-nav>

      <!-- Right aligned nav items -->
      <b-navbar-nav v-if="user.id" class="ml-auto">
        <b-button squared class="urfu-button" to="/profile">Профиль</b-button>
      </b-navbar-nav>
      <b-navbar-nav v-else class="ml-auto">
        <b-button variant="link" to="/register">Регистрация</b-button>
        <b-button squared class="urfu-button" to="/login">Вход</b-button>
      </b-navbar-nav>
    </b-collapse>
  </b-navbar>
</template>

<script>

export default {
  name: 'navbar',
  props: {
    user: Object,
  },
  data() {
    return {}
  },
}

</script>

<style scoped>

.ml-auto {
  margin-left: auto !important;
}

.navbar {
  background: rgba(255, 255, 255, 0.5);
  backdrop-filter: blur(20px);
}

</style>