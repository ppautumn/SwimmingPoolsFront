<template>
  <div>
    <h1>Расписание</h1>
    <h5>Время сеанса: 45 минут</h5>
    <h6>В таблице указано количество свободных&nbsp;дорожек. Нажмите на ячейку, чтобы записаться</h6>
    <flexible-table :table-model="tableFreeModel" visit-type="freeswim" @content-cell-click="contentCellClick"/>
    <urfu-button to="/book">Записаться</urfu-button>
    <h6>Посетителям бассейна при себе необходимо иметь справку от врача (терапевт/ педиатр) и плавательную
      шапочку.</h6>
  </div>

</template>

<script>
import {formatDate, makeDateFromStrings} from '@/date-utils'
import UrfuButton from '@/components/urfu-button.vue'
import FlexibleTable from '@/components/timetable/flexible-table.vue'

export default {
  name: "timetable",
  components: {FlexibleTable, UrfuButton},

  data() {
    return {
      /**
       * @type {[string, string][]}
       */
      timeChoices: [],
      /**
       * @type {{
       *   [date: string]: {
       *     [time: string]: number
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
    contentCellClick(date, time, visitType) {
      this.$router.push(`/book?date=${date}&time=${time}&visitType=${visitType}`)
    }
  },

  async mounted() {
    const getTimeChoicesResponse = await this.getTimeChoices()
    this.timeChoices = getTimeChoicesResponse.data['timeChoices']
    const getWeeklyScheduleResponse = await this.getWeeklySchedule()
    this.allSlots = getWeeklyScheduleResponse.data['available_tracks']
  },

  computed: {
    tableFreeModel() {
      const availableTracks = Object.entries(this.allSlots ?? {})
      const datesSlotsSplitTable = availableTracks.map(entry => ({date: entry[0], slots: entry[1]}))

      const tableHeader = ['', ...datesSlotsSplitTable.map(v => v.date)]
      const tableRows = this.timeChoices.map((timeChoice, rowNum) => {
        const [time] = timeChoice
        return {
          time,
          rowNum,
          availables: datesSlotsSplitTable.map((slotsAtDate) => {
            const dateOfSlot = makeDateFromStrings(slotsAtDate.date, time)
            return ({
              slots: slotsAtDate.slots[time],
              disabled: dateOfSlot < new Date(),
              date: slotsAtDate.date,
            })
          }),
        }
      })

      return {tableHeader, tableRows}
    },
  },

}

</script>

<style scoped>

</style>