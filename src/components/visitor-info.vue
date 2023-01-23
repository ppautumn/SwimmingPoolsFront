<template>
  <form-input-horizontal v-if="type" label="Тип посещения">
    <b>{{type}}</b>
  </form-input-horizontal>
  <form-input-horizontal v-if="date && time" label="Дата и время сеанса">
    <b>{{ date }} {{ time }}</b>
  </form-input-horizontal>
  <form-input-horizontal v-if="visitorNumber" label="Кол-во посетителей">
    <b>{{ visitorNumber }}</b>
  </form-input-horizontal>
  <form-input-horizontal v-if="trackNumber" label="Номер дорожки">
    <b>{{ trackNumber }}</b>
  </form-input-horizontal>
  <form-input-horizontal v-if="ticketsNumber" label="Кол-во билетов">
    <b>{{ ticketsNumber }}</b>
  </form-input-horizontal>
</template>

<script>
export default {
  name: "visitor-info",
  props: {
    type: '',
    date: '',
    time: '',
    visitorNumber: 0,
    trackNumber: 0,
    ticketsNumber: '',
  }
}
</script>

<style scoped>

</style>