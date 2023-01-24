<template>
  <div class="d-flex justify-content-evenly">
    <div v-for="track of availableTracks" class="track-selector mx-1 mx-md-3"
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
  --selector-height: 4em;
  background: var(--color-background-stripe);
  transition: box-shadow 0.2s ease-in-out;
  flex-grow: 1;
  flex-basis: 0.5em;
  text-align: center;
  height: var(--selector-height);
  font-size: 25pt;
  line-height: var(--selector-height);
  border-radius: 0.25rem;
}

@media (min-width: 768px) {
  .track-selector {
    --selector-height: 5em;
    font-size: 30pt;
  }
}

.track-selector.active {
  color: white;
  box-shadow: inset 0 var(--selector-height) 0 0 var(--color-footer-background);
  transition: box-shadow 0.2s ease-in-out;
}

.track-selector:active {
  transform: scale(.95);
}

</style>