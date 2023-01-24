<template>
  <div class="mt-3 mt-lg-4">
    <h5>{{ humanReadableDate() }} {{ timeSlot }}</h5>
    <b-card :class="{'card': true, 'upcoming': upcoming}">
      <h5 class="">Свободное плавание</h5>
      <status-text :status="status"/>
      <div class="d-flex justify-content-between align-items-baseline">
        <p>Иванов Ванька Встанька</p>
        <div class="d-flex info-right">
          <p>{{ track }} дорожка</p>
          <p>{{ visitors }} чел.</p>
        </div>
      </div>
      <div class="d-flex justify-content-between">
        <b-button variant="outline-primary" @click="moreClick">Подробнее</b-button>
        <b-button variant="outline-danger" @click="cancelClick">Отменить</b-button>
      </div>
      <div v-for="[key, detail] of detailsData ? Object.entries(detailsData) : {}">
        <span>{{key}}</span>
        <b>{{detail}}</b>
      </div>
    </b-card>
  </div>
</template>
<script>
import {humanReadableDate} from '@/date-utils'
import StatusText from '@/components/profile/status-text.vue'

export default {
  name: 'swim-slot-view',
  components: {StatusText},
  emits: ['cancel-click'],
  props: {
    id: Number,
    date: String,
    timeSlot: String,
    visitors: Number,
    track: Number,
    /**
     * @type SlotStatus
     */
    status: '',
    upcoming: true,
  },
  data() {
    return {
      detailsData: null,
    }
  },
  methods: {
    humanReadableDate() {
      return humanReadableDate(new Date(this.date))
    },
    async cancelClick() {
      const delResult = await this.axios.delete(`timetable/${this.id}/`)
      const delData = delResult.data
      alert(delData)
      this.$emit('cancel-click')
    },
    async moreClick() {
      if (this.detailsData) {
        this.detailsData = null
      } else {
        const detailsResult = await this.axios.get(`timetable/${this.id}/`)
        this.detailsData = detailsResult.data
      }
    },
  },
}
</script>
<style scoped>

.card.upcoming {
  background: var(--gradient-brand-transparent);
}

.info-right {
  gap: 0.5em;
  margin-right: 0.5em;
}

</style>