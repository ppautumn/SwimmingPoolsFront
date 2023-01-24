<template>
  <b-form-row class="my-2">
    <b-col class="d-md-flex align-items-md-center" md="4">
      <label :for="componentId">{{label}}</label>
    </b-col>
    <b-col md="8">
      <slot :id="componentId"
            :placeholder="label"/>
    </b-col>
  </b-form-row>
</template>
<script>
import {v4 as uid} from 'uuid'

export default {
  name: 'form-input-horizontal',
  props: {
    label: '',
  },
  data() {
    return {
      componentId: null
    }
  },
  mounted() {
    this.componentId = uid()
  },
}

</script>
