<script setup>
import _ from 'lodash'
import VisitorInfo from '@/components/book/visitor-info.vue'
import UrfuButton from '@/components/urfu-button.vue'
</script>

<template>
  <div>
    <h1>Запись на сеанс</h1>
    <b-tabs v-model="activeTab" fill lazy>
      <b-tab title="Выбор даты и времени сеанса" class="py-5">
        <b-row no-gutters>
          <h4>Выберите дату и время сеанса</h4>
          <b-col col md="8">
            <form-input-horizontal label="тип посещения" v-slot="{id, placeholder}">
              <b-form-select v-model="tabData['0'].visitType" :id="id" :placeholder="placeholder"
                             :options="tabData['0'].visitTypeOptions"/>
            </form-input-horizontal>
            <form-input-horizontal label="дата посещения" v-slot="{id, placeholder}">
              <b-form-input v-model="tabData['0'].visitDate" :id="id" :placeholder="placeholder"
                            type="date" :formatter="dateFormatter"/>
            </form-input-horizontal>
            <form-input-horizontal label="время посещения" v-slot="{id, placeholder}">
              <b-form-input v-model="tabData['0'].visitTime" :id="id" :placeholder="placeholder"
                            type="time" :formatter="timeFormatter"/>
            </form-input-horizontal>
            <form-input-horizontal label="кол-во посетителей" v-slot="{id, placeholder}">
              <b-form-input v-model="tabData['0'].visitors" :id="id" :placeholder="placeholder"
                            type="number"/>
            </form-input-horizontal>
          </b-col>
        </b-row>
      </b-tab>
      <b-tab title="Выбор дорожки" class="py-5">
        <h4>Выбор дорожки</h4>
        <b-row no-gutters class="mb-3">
          <b-col col md="8">
            <visitor-info :type="tabData['0'].visitTypeOptions.find(x => x.value === tabData['0'].visitType).text"
                          :date="tabData['0'].visitDate"
                          :time="tabData['0'].visitTime"
                          :visitor-number="tabData['0'].visitors"/>
          </b-col>
        </b-row>
        <h5>Выберите номер дорожки</h5>
        <track-selector v-model="tabData['1'].trackNumber"
                        :new-visitors="tabData['0'].visitors" :time-slot="tabData['0'].visitTime"/>
      </b-tab>
      <b-tab title="Информация по посетителям" class="py-5">
        <h4>Информация по посетителям</h4>
        <b-row no-gutters>
          <b-col col md="8">
            <visitor-info :type="tabData['0'].visitTypeOptions.find(x => x.value === tabData['0'].visitType).text"
                          :date="tabData['0'].visitDate"
                          :time="tabData['0'].visitTime"
                          :visitor-number="tabData['0'].visitors"
                          :track-number="tabData['1'].trackNumber"/>
          </b-col>
        </b-row>
        <b-row no-gutters v-for="i of _.range(tabData['0'].visitors)">
          <b-col col md="8">
            <form-input-horizontal label="ФИО посетителя" v-slot="{id, placeholder}">
              <b-form-input v-model="tabData['2'].infoByVisitors[i].visitorName" :id="id" :placeholder="placeholder"
                            type="text"/>
            </form-input-horizontal>
            <form-input-horizontal label="Тип билета" v-slot="{id, placeholder}">
              <b-form-input v-model="tabData['2'].infoByVisitors[i].ticketType" :id="id" :placeholder="placeholder"
                            type="text"/>
            </form-input-horizontal>
          </b-col>
        </b-row>
      </b-tab>
      <b-tab title="Оплата билетов" class="py-5">
        <div v-if="paid">
          <h4>Оплачено!</h4>
          <visitor-info :type="tabData['0'].visitTypeOptions.find(x => x.value === tabData['0'].visitType).text"
                        :date="tabData['0'].visitDate"
                        :time="tabData['0'].visitTime"
                        :tickets-number="ticketsNumber"
                        :track-number="tabData['1'].trackNumber"/>
        </div>
        <div v-else>
          <h4>Оплата билетов</h4>
          <b-row no-gutters class="mb-3">
            <b-col col md="8">
              <visitor-info :type="tabData['0'].visitTypeOptions.find(x => x.value === tabData['0'].visitType).text"
                            :date="tabData['0'].visitDate"
                            :time="tabData['0'].visitTime"
                            :tickets-number="ticketsNumber"
                            :track-number="tabData['1'].trackNumber"/>
            </b-col>
          </b-row>
          <urfu-button @click="pay">Оплатить</urfu-button>
        </div>
      </b-tab>
    </b-tabs>
    <div class="d-sm-flex justify-content-evenly">
      <urfu-button v-if="activeTab > 0" @click="activeTab--">Назад</urfu-button>
      <urfu-button v-if="activeTab < maxTab - 1" @click="activeTab++">Далее</urfu-button>
      <urfu-button v-if="activeTab === maxTab - 1" @click="submit">Потвердить и оплатить</urfu-button>
    </div>
    <br>
    <h3>Информация</h3>
    <a href="/favicon.png" style="display: block">Правила оказания услуг</a>
    <a href="/favicon.png" style="display: block">Правила посещения бассейна</a>
    <h6>Возврат билетов осуществляется за 48 часов до начала сеанса</h6>
    <h6>Нажимая кнопку «Далее», вы подтверждаете свою дееспособность, согласие на получение информации
      об оформлении, получении заказа, согласие на обработку персональных данных.</h6>
  </div>
</template>

<script>

import FormInputHorizontal from '@/components/book/form-input-horizontal.vue'
import TrackSelector from '@/components/book/track-selector.vue'
import {formatDate} from '@/date-utils'

export default {
  name: "book",
  components: {FormInputHorizontal, TrackSelector},

  props: {
    date: String,
    time: String,
    visitType: String
  },

  data() {
    return {
      maxTab: 3,
      activeTab: 0,
      paid: false,
      tabData: {
        0: {
          visitTypeOptions: [
            {value: 'freeswim', text: 'Свободное плавание'},
            {value: 'training', text: 'Тренировка'},
          ],
          visitType: 'freeswim',
          visitDate: null,
          visitTime: null,
          visitors: 1,
        },
        1: {
          trackNumber: 0,
        },
        2: {
          infoByVisitors: [],
        },
      },
    }
  },

  computed: {
    bookSlotDto() {
      return {
        date: this.tabData['0'].visitDate,
        time_slot: this.tabData['0'].visitTime,
        track: this.tabData['1'].trackNumber,
        visitors: this.tabData['0'].visitors,
      }
    },
    ticketsNumber() {
      let ticketNumber = ''
      const visitorInfoByType = _.groupBy(this.tabData['2'].infoByVisitors, v => v.ticketType)
      for (const type in visitorInfoByType) {
        ticketNumber += `${visitorInfoByType[type].length} ${type}, `
      }
      return ticketNumber.slice(0, ticketNumber.length - 2)
    }
  },

  methods: {
    async submit() {
      this.activeTab++
      try {
        await this.axios.post('timetable/', this.bookSlotDto)
      } catch (e) {
        alert(e)
        console.error(e)
      }
    },
    async pay() {
      this.paid = true
      alert('оплачено')
    },
    dateFormatter(value) {
      // yyyy-mm-dd to our format
      const values = value.split('-').map(v => _.toNumber(v))
      const date = new Date(values[0], values[1] - 1, values[2])
      return formatDate(date)
    },
    timeFormatter(value) {
      return value
    },
  },

  created() {
    this.$watch('tabData.0.visitors', newValue => {
      for (let i = 0; i < newValue; i++) {
        this.tabData['2'].infoByVisitors[i] = {visitorName: '', ticketType: ''}
      }
    }, {immediate: true})
  },

  mounted() {
    this.tabData['0'].visitDate = this.date
    this.tabData['0'].visitTime = this.time
    this.tabData['0'].visitType = this.visitType
  },

}
</script>