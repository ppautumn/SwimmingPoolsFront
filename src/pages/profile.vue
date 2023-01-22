<template>
  <div>
    <h1>Профиль</h1>
    <b-card class="card my-5">
      <div class="d-flex justify-content-between align-items-baseline g-3">
        <h3 class="mb-4">Персональные данные</h3>
        <urfu-button>Редактировать</urfu-button>
      </div>
      <div class="d-flex justify-content-between align-items-baseline g-3">
        <p>user id</p><h6>{{ user.id }}</h6>
      </div>
      <div class="d-flex justify-content-between align-items-baseline g-3">
        <p>Фамилия</p><h6>{{ user.id }}</h6>
      </div>
      <div class="d-flex justify-content-between align-items-baseline g-3">
        <p>Имя</p><h6>{{ user.id }}</h6>
      </div>
      <div class="d-flex justify-content-between align-items-baseline g-3">
        <p>Отчество</p><h6>{{ user.id }}</h6>
      </div>
      <div class="d-flex justify-content-between align-items-baseline g-3">
        <p>Дата рождения</p><h6>{{ user.id }}</h6>
      </div>
      <div class="d-flex justify-content-between align-items-baseline g-3">
        <p>Телефон</p><h6>{{ user.id }}</h6>
      </div>
      <div class="d-flex justify-content-between align-items-baseline g-3">
        <p>Эл. почта</p><h6>{{ user.id }}</h6>
      </div>
    </b-card>
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
import UrfuButton from '@/components/urfu-button.vue'

export default {
  name: "profile",
  components: {UrfuButton, SwimSlotView, BForm},
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
    },
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
