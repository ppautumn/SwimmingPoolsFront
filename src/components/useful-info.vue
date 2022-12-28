<template>
  <b-container class="wrapper p-5" fluid>
    <h4 class="text-center mb-5">Полезная информация</h4>
    <b-card-group deck>
      <b-card class="card" img-src="../src/assets/images/Дорожки.png" img-top>
        <b-card-text>Что нужно знать перед посещением?</b-card-text>
      </b-card>
      <b-card class="card" img-src="../src/assets/images/Девушка.png" img-top>
        <b-card-text>Цены и график работы</b-card-text>
      </b-card>
      <b-card class="card" img-src="../src/assets/images/Здание.png" img-top>
        <b-card-text>Как до нас добраться</b-card-text>
      </b-card>
      <b-card class="card" img-src="../src/assets/images/ребенок.png" img-top>
        <b-card-text>Правила посещения</b-card-text>
      </b-card>
    </b-card-group>
  </b-container>
</template>

<script>
import {BCard, BContainer} from 'bootstrap-vue-3'
import {BCardText} from 'bootstrap-vue-3'

export default {
  name: "useful-info",
  components: {BCardText, BCard, BContainer},
}
</script>

<style scoped>
.wrapper {
  background: var(--color-background-stripe);
}

.card {

}
</style>