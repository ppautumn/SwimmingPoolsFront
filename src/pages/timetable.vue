<template>
  <div>
    <h1>Расписание</h1>
    <h4>Свободное плавание</h4>
    <h5>Время сеанса: 45 минут</h5>
    <header>
      <div class="start-cell"></div>
      <div>пн</div>
      <div>вт</div>
      <div>ср</div>
      <div>чт</div>
      <div>пт</div>
      <div>сб</div>
      <div>вс</div>
    </header>
    <main v-for="slotStart of slotStarts">
      <div class="start-cell">{{ slotStart }}</div>
      <div>пн</div>
      <div>вт</div>
      <div>ср</div>
      <div>чт</div>
      <div>пт</div>
      <div>сб</div>
      <div>вс</div>
    </main>
    <b-button squared class="mb-2 urfu-button" to="/book">Записаться</b-button>
    <h4>Обучение плаванию (дети 4-6 лет)</h4>
    <h5>Время сеанса: 45 минут</h5>
    <h4>Обучение плаванию (дети 7-13 лет)</h4>
    <h5>Время сеанса: 45 минут</h5>
    <h6>Посетителям бассейна при себе необходимо иметь справку от врача (терапевт/ педиатр) и плавательную
      шапочку.</h6>
  </div>

</template>

<script>
import _ from 'lodash'
import {formatDate} from '@/date-utils'

export default {
  name: "timetable",
  data() {
    return {
      timeChoices: [],
      allSlots: [],
    }
  },
  methods: {
    async getWeeklySchedule() {
      const today = new Date()
      const afterWeek = new Date()
      afterWeek.setUTCDate(afterWeek.getUTCDate() + 7)
      return await this.axios.get('tracks-schedule/', {
        params: {
          start: formatDate(today),
          end: formatDate(afterWeek),
        },
      })
    },
    async getTimeChoices() {
      return await this.axios.get('timetable/time-choices/')
    },
  },
  async mounted() {
    const getTimeChoicesResponse = await this.getTimeChoices()
    this.timeChoices = getTimeChoicesResponse.data.timeChoices
    const getWeeklyScheduleResponse = await this.getWeeklySchedule()
    this.allSlots = getWeeklyScheduleResponse.data
    console.log(this.allSlots)
  },
  computed: {
    slotStarts() {
      return this.timeChoices?.map(v => v[0])
    },
    slotData() {
      const allSlotsByTime = _.groupBy(this.allSlots, v => v['time_slot'])
      return {
        freeSwim: this.timeChoices?.map(time => allSlotsByTime[time]),
        children46: [],
        children713: [],
      }
    },
  },
}

</script>

<style scoped>

header, main {
  display: flex;
  justify-content: space-around;
  border: 2px solid #2c3e50;
}

.start-cell {
  width: 20px;
}
</style>