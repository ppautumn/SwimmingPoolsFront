<template>
  <div class="mt-3 mt-lg-4">
    <h5>{{ humanReadableDate() }} {{ timeSlot }}</h5>
    <b-card :class="{'card': true, 'upcoming': upcoming}">
      <h5 class="">Свободное плавание</h5>
      <status-text v-if="upcoming" :status="status"/>
      <b-row class="mb-3">
        <b-col class="">
          <p class="mb-1">дорожка: {{ track }}</p>
          <p class="mb-1">человек: {{ visitors }}</p>
        </b-col>
      </b-row>
      <div class="d-flex justify-content-between">
        <b-button variant="outline-primary" @click="moreClick">Подробнее</b-button>
        <b-button v-if="upcoming && status === 'awaiting payment'" @click="payClick" variant="outline-success">Оплатить</b-button>
        <b-button v-if="upcoming" variant="outline-danger" @click="cancelClick">Отменить</b-button>
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
  emits: ['cancel-click', 'pay-click'],
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
      await this.axios.delete(`timetable/${this.id}/`)
      this.$emit('cancel-click')
    },
    payClick() {
      this.$emit('pay-click', this.id)
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

</style>