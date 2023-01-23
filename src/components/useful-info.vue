<template>
  <b-container class="wrapper pt-5 p-md-5" fluid>
    <h4 class="text-center mb-5">Полезная информация</h4>
    <b-card-group deck>
      <b-card class="card my-3 my-sm-0" img-src="../src/assets/images/Дорожки.png" img-alt="Дорожки" :img-top="true">
        <b-card-text>Что нужно знать перед посещением?</b-card-text>
      </b-card>
      <b-card class="card my-3 my-sm-0" img-src="../src/assets/images/Девушка.png" img-alt="Девушка" :img-top="true">
        <b-card-text>Цены и график работы</b-card-text>
      </b-card>
      <b-card class="card my-3 my-sm-0" img-src="../src/assets/images/Здание.png" img-alt="Здание" :img-top="true">
        <b-card-text>Как до нас добраться</b-card-text>
      </b-card>
      <b-card class="card my-3 my-sm-0" img-src="../src/assets/images/ребенок.png" img-alt="ребенок" :img-top="true">
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

</style>