<template>
  <div>
    <h1>Профиль</h1>
    <b-row>
      <b-col col lg="8" xl="7" xxl="6">
        <b-card class="card my-5">
          <div class="d-block d-sm-flex justify-content-between align-items-baseline g-3">
            <h3 class="mb-4">Персональные данные</h3>
            <urfu-button>Редактировать</urfu-button>
          </div>
          <b-row>
            <b-col col sm="4">
              <p>user id</p>
            </b-col>
            <b-col>
              <h6>{{ user.id }}</h6>
            </b-col>
          </b-row>
          <b-row>
            <b-col col sm="4">
              <p>Фамилия</p>
            </b-col>
            <b-col>
              <h6>{{ profile.lastname }}</h6>
            </b-col>
          </b-row>
          <b-row>
            <b-col col sm="4">
              <p>Имя</p>
            </b-col>
            <b-col>
              <h6>{{ profile.firstname }}</h6>
            </b-col>
          </b-row>
          <b-row>
            <b-col col sm="4">
              <p>Дата регистрации</p>
            </b-col>
            <b-col>
              <h6>{{ humanReadableDate(new Date(profile.date_joined)) }}</h6>
            </b-col>
          </b-row>
          <b-row>
            <b-col col sm="4">
              <p>Эл. почта</p>
            </b-col>
            <b-col>
              <h6>{{ profile.email }}</h6>
            </b-col>
          </b-row>
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
      </b-col>
    </b-row>

  </div>
</template>

<script>
import {BForm} from 'bootstrap-vue-3'
import SwimSlotView from '@/components/profile/swim-slot-view.vue'
import {getDateOnly} from '@/date-utils'
import UrfuButton from '@/components/urfu-button.vue'
import {humanReadableDate} from '@/date-utils'

export default {
  name: "profile",
  components: {UrfuButton, SwimSlotView, BForm},
  props: {
    user: Object,
  },
  data() {
    return {
      /**
       * @typedef {'awaiting payment' | 'paid' | 'canceled' | ''} SlotStatus
       */
      /**
       * @type { {
       *   id: number,
       *   date: string,
       *   time_slot: string,
       *   visitors: number,
       *   user: number,
       *   track: number,
       *   status: SlotStatus,
       * }[] }
       */
      mySlots: [],
      /**
       * @type { {
       *   email: string,
       *   firstname: string,
       *   lastname: string,
       *   date_joined: string,
       * } }
       */
      profile: {},
    }
  },
  methods: {
    humanReadableDate(date) {
      return humanReadableDate(date)
    },
    getMyTimetable() {
      return this.axios.get('timetable/')
    },
    getProfile() {
      return this.axios.get('auth/profile/')
    },
    async assignProfile() {
      const profile = await this.getProfile()
      this.profile = profile.data
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
    await this.assignProfile()
    await this.assignMyTimetable()
  },
}
</script>
