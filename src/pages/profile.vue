<template>
  <div>
    <h1>Профиль</h1>
    <b-form>
      <p>user id: {{user.id}}</p>
    </b-form>
  </div>
</template>

<script>
import {BForm} from 'bootstrap-vue-3'

export default {
  name: "profile",
  components: {BForm},
  props: {
    user: Object,
  },
  async mounted() {

  },
}
</script>

<style scoped>

</style>