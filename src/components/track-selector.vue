<template>
  <div class="d-flex justify-content-evenly">
    <div v-for="track of availableTracks" class="track-selector mx-3"
         :class="{active: modelValue === track.id}" @click="trackClick(track.id)" :key="track.id">{{ track.number }}
    </div>
  </div>
</template>

<script>
export default {
  name: 'track-selector',
  props: {
    modelValue: 0,
    timeSlot: '',
    newVisitors: 0,
  },
  emits: ['update:modelValue'],
  data() {
    return {
      selected: 0,
      availableTracks: [],
    }
  },
  methods: {
    trackClick(num) {
      this.selected = num
      this.$emit('update:modelValue', num)
    }
  },
  async mounted() {
    try {
      const response = await this.axios.get('tracks/', {
        params: {
          time_slot: this.timeSlot,
          new_visitors: this.newVisitors,
        }
      })
      this.availableTracks = response.data
    } catch (e) {
      console.log(this.timeSlot)
      console.log(this.newVisitors)
      console.error(e)
      alert(e)
    }
  },
}
</script>

<style scoped>
.track-selector {
  background: var(--color-background-stripe);
  flex-grow: 1;
  text-align: center;
  height: 5em;
  font-size: 30pt;
  line-height: 5em;
  border-radius: 0.25rem;
}

.track-selector.active {
  background: var(--color-footer-background);
  color: white;
}
</style>