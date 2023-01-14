<template>
  <div>
    <h1>Расписание</h1>
    <h4>Свободное плавание</h4>
    <h5>Время сеанса: 45 минут</h5>
    <main class="mb-3">
      <div>
        <div class="cell cell-header">&nbsp;</div>
        <div v-for="[timeChoice, index] of tableFreeTimeModel"
             :class="`cell ${getCellBackgroundClassByIndex(index)}`">
          {{timeChoice}}
        </div>
      </div>
      <div v-for="{date, slots} of tableFreeSlotsModel"
           class="day-column">
        <div class="cell cell-header">{{date}}</div>
        <div v-for="[available, index] of slots" :class="`cell ${getCellBackgroundClassByIndex(index)}`">{{available}}</div>
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
import _ from 'lodash'

export default {
  name: "timetable",
  data() {
    return {
      timeChoices: [],
      /**
       * @type {{available_tracks: []}}
       */
      allSlots: {},
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
    getCellBackgroundClassByIndex(index) {
      return index % 2 === 0 ? 'alt-back' : ''
    }
  },
  async mounted() {
    const getTimeChoicesResponse = await this.getTimeChoices()
    this.timeChoices = getTimeChoicesResponse.data.timeChoices
    const getWeeklyScheduleResponse = await this.getWeeklySchedule()
    this.allSlots = getWeeklyScheduleResponse.data
    console.log(this.allSlots)
  },
  computed: {
    tableFreeTimeModel() {
      return _.zip(this.timeChoices.map(x => x[0]), _.range(0, this.timeChoices.length))
    },
    tableFreeSlotsModel() {
      const dateToSlots = Object.entries(this.allSlots.available_tracks ?? {})
      return dateToSlots.map(entry => {
        const slots = Object.values(entry[1])
        const slotsWithIndexes = _.zip(slots, _.range(0, slots.length))
        return {date: entry[0], slots: slotsWithIndexes}
      })
    }
  },
}

</script>

<style scoped>

aside, main {
  display: flex;
  justify-content: space-around;
  box-shadow: 0 0 10px 5px rgba(0, 0, 0, 0.1);
  border-radius: .5em;
  overflow-y: hidden;
  overflow-x: scroll;
}

div.day-column {
  display: flex;
  flex-direction: column;
  flex-grow: 1;
  align-content: center;
}

.cell {
  height: 2em;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}

.cell.alt-back {
  background: var(--color-background-stripe);
}

.cell.cell-header {
  height: 3em;
}

</style>