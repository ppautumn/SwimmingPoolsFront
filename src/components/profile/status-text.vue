<template>
  <h6 :class="statusClass">{{ statusText }}</h6>
</template>

<script>
export default {
  name: "status-text",
  props: {
    /**
     * @type SlotStatus
     */
    status: ''
  },
  computed: {
    statusText() {
      switch (this.status) {
        case 'awaiting payment':
          return 'Ожидает оплаты'
        case 'paid':
          return 'Оплачено'
        case 'canceled':
          return 'Отменено'
      }
    },
    statusClass() {
      return this.status.replace(' ', '-')
    },
  },
}
</script>

<style scoped>

.awaiting-payment {
  color: #1b1b1b;
}

.paid {
  color: darkgreen;
}

.canceled {
  color: gray;
}

</style>