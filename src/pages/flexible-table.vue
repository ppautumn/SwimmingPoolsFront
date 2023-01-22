<template>
  <article>
    <header>
      <div :class="{'cell-row': true, 'header': true}">
        <div v-for="cell of tableFreeModel.tableHeader" class="cell header">
          <div v-if="!cell"/>
          <div v-else>{{ humanReadableDate(cell) }}</div>
        </div>
      </div>
    </header>
    <main class="mb-3">
      <div v-for="row of tableFreeModel.tableRows" :class="{'cell-row': true, 'alt-back': getAltBackgroundByIndex(row.rowNum)}">
        <div :class="{cell: true, time: true}">
          {{ row.time }}
        </div>
        <div v-for="cell of row.availables"
             :class="{cell: true}"
             @click="$emit('content-cell-click', cell.date, row.time, $props.visitType)">
          {{ cell.slots }}
        </div>
      </div>
    </main>
  </article>
</template>

<script>

import {humanReadableDate} from '@/date-utils'

export default {
  name: 'flexible-table',
  props: {
    /**
     * @type {{
     *   tableHeader: string[],
     *   tableRows: {
     *     availables: {date: string, slots: number}[],
     *     rowNum: number,
     *     time: string
     *   }[]
     * }}
     */
    tableFreeModel: {},
    visitType: '',
  },
  emits: ['content-cell-click'],
  methods: {
    humanReadableDate(date) {
      return humanReadableDate(new Date(date))
    },
    getAltBackgroundByIndex(index) {
      return index % 2 !== 0
    },
  }
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

.cell-row {
  display: flex;
  justify-content: space-around;
}

.cell-row.alt-back {
  background: var(--gradient-brand-transparent)
}

.cell-row.header {
  background: var(--gradient-brand-transparent);
}

.cell {
  height: 2em;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-grow: 1;
  flex-basis: 1em;
  cursor: pointer;
}

.cell:hover, .cell:focus {
  font-weight: bold;
  background: var(--color-brand-magenta);
  color: white;
}

.cell:active {
  transform: scale(.95);
}

.cell.header {
  height: 3em;
  cursor: default;
  /*border-left: 1px solid rgba(27, 27, 27, 0.7);*/
}

.cell.time {
  /*background: rgba(221, 10, 123, 0.1);*/
  cursor: default;
}

</style>