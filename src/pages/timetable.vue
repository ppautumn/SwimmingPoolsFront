<template>
  <div>
    <h1>Расписание</h1>
    <h4>Свободное плавание</h4>
    <h5>Время сеанса: 45 минут</h5>
    <main class="mb-3">
      <div>
        <div class="start-cell">&nbsp;</div>
        <div v-for="timeChoice of timeChoices" class="start-cell">{{timeChoice[0]}}</div>
      </div>
      <div v-for="ttslot of Object.entries(allSlots.available_tracks ?? {})"
           class="day-column">
        <div>{{ttslot[0]}}</div>
        <div v-for="available of ttslot[1]">{{available}}</div>
      </div>
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
          table_type: 'freeswim',
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

  },
}

</script>

<style scoped>

aside, main {
  display: flex;
  justify-content: space-around;
  border: 2px solid #2c3e50;
}

div.day-column {
  display: flex;
  flex-direction: column;
  flex-grow: 1;
  align-items: center;
  border-left: 1px solid #2c3e50;
  border-right: 1px solid #2c3e50;
}

.start-cell {
  border-right: 1px solid #2c3e50;
}
</style>