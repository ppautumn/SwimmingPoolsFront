<template>
  <div>
    <h1>Расписание</h1>
    <h4>Свободное плавание</h4>
    <h5>Время сеанса: 45 минут</h5>
    <article>
      <header>
        <div class="cell-row">
          <div v-for="cell of tableFreeModel.tableHeader" class="cell header">
            <div v-if="!cell"/>
            <div v-else>{{ cell }}</div>
          </div>
        </div>
      </header>
      <main class="mb-3">
        <div v-for="row of tableFreeModel.tableRows" class="cell-row">
          <div :class="`cell ${getCellBackgroundClassByIndex(row.rowNum)}`">
            {{ row.time }}
          </div>
          <div v-for="cell of row.availables" :class="`cell ${getCellBackgroundClassByIndex(row.rowNum)}`">
            {{ cell }}
          </div>
        </div>
      </main>
    </article>
    <urfu-button to="/book">Записаться</urfu-button>
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
       * @type {{
       *   available_tracks: {
       *     [key: string]: {
       *       [key: string]: number
       *     }
       *   }
       * }}
       */
      allSlots: {},
    }
  },

  methods: {
    async getWeeklySchedule() {
      const today = new Date()
      const afterWeek = new Date()
      afterWeek.setUTCDate(afterWeek.getUTCDate() + 7)
      return this.axios.get('tracks-schedule/', {
        params: {
          start: formatDate(today),
          end: formatDate(afterWeek),
          table_type: 'freeswim',
        },
      })
    },
    async getTimeChoices() {
      return this.axios.get('timetable/time-choices/')
    },
    getCellBackgroundClassByIndex(index) {
      return index % 2 === 0 ? 'alt-back' : ''
    },
  },

  async mounted() {
    const getTimeChoicesResponse = await this.getTimeChoices()
    this.timeChoices = getTimeChoicesResponse.data.timeChoices
    const getWeeklyScheduleResponse = await this.getWeeklySchedule()
    this.allSlots = getWeeklyScheduleResponse.data
  },

  computed: {
    tableFreeModel() {
      const availableTracks = Object.entries(this.allSlots.available_tracks ?? {})
      const datesSlotsSplitTable = availableTracks.map(entry => ({date: entry[0], slots: entry[1]}))

      const tableHeader = ['', ...datesSlotsSplitTable.map(v => v.date)]
      const tableRows = this.timeChoices.map((timeChoice, rowNum) => {
        const [time] = timeChoice
        return {
          time,
          rowNum,
          availables: datesSlotsSplitTable.map((slotsAtDate) => slotsAtDate.slots[time]),
        }
      })

      return {tableHeader, tableRows}
    },
  },

}

</script>

<style scoped>

article {
  box-shadow: 0 0 10px 5px rgba(0, 0, 0, 0.1);
  border-radius: .5em;
  /*overflow-x: scroll;*/
  overflow-y: clip;
}

header, main {
  display: flex;
  flex-direction: column;
}

header {
  background: linear-gradient(105.19deg, rgba(221, 10, 123, 0.1) 22.53%, rgba(227, 28, 44, 0.1) 36.76%, rgba(238, 106, 27, 0.1) 61.97%, rgba(250, 198, 7, 0.1) 81.15%);
}

.cell-row {
  display: flex;
  justify-content: space-around;
}

.cell {
  height: 2em;
  width: 6em;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-grow: 1;
}

.cell.alt-back {
  background: var(--color-background-stripe);
}

.cell.header {
  height: 3em;
}

</style>