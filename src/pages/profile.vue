<template>
  <div>
    <h1>Профиль</h1>
    <b-form class="my-5">
      <p>user id: {{user.id}}</p>
    </b-form>
    <div class="py-4">
      <h3>Ближайшие сеансы</h3>
      <swim-slot-view v-for="swimSlot of upcomingSwims" :key="swimSlot.id" :id="swimSlot.id"
                      :date="swimSlot.date"
                      :time-slot="swimSlot.time_slot"
                      :visitors="swimSlot.visitors"
                      :track="swimSlot.track"
                      :status="swimSlot.status"
                      :upcoming="true"
                      @cancel-click="cancelClick"/>
    </div>
    <div class="py-4">
      <h3>Прошедшие сеансы</h3>
      <swim-slot-view v-for="swimSlot of pastSwims" :key="swimSlot.id" :id="swimSlot.id"
                      :date="swimSlot.date"
                      :time-slot="swimSlot.time_slot"
                      :visitors="swimSlot.visitors"
                      :track="swimSlot.track"
                      :status="swimSlot.status"
                      :upcoming="false"
                      @cancel-click="cancelClick"/>
    </div>
  </div>
</template>

<script>
import {BForm} from 'bootstrap-vue-3'
import SwimSlotView from '@/components/swim-slot-view.vue'
import {getDateOnly} from '@/date-utils'

export default {
  name: "profile",
  components: {SwimSlotView, BForm},
  props: {
    user: Object,
  },
  data() {
    return {
      /**
       * @type { {
       *   id: number,
       *   date: string,
       *   time_slot: string,
       *   visitors: number,
       *   user: number,
       *   track: number
       * }[] }
       */
      mySlots: [],

    }
  },
  methods: {
    getMyTimetable() {
      return this.axios.get('timetable/')
    },
    async assignMyTimetable() {
      const mySlotsResponse = await this.getMyTimetable()
      this.mySlots = mySlotsResponse.data
    },
    async cancelClick() {
      await this.assignMyTimetable()
    }
  },
  computed: {
    upcomingSwims() {
      const today = getDateOnly(new Date())
      return this.mySlots.filter(slot => {
        const upcomingDay = getDateOnly(new Date(slot.date))
        return upcomingDay >= today
      })
    },
    pastSwims() {
      const today = getDateOnly(new Date())
      return this.mySlots.filter(slot => {
        const passedDay = getDateOnly(new Date(slot.date))
        return passedDay <= today
      })
    },
  },
  async mounted() {
    await this.assignMyTimetable()
  },
}
</script>

