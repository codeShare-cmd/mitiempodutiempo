<template>
  <div>
    <ul
      ref="lista"
      class="flex overflow-x-auto flex-row cursor-auto container-snap"
    >
      <li
        v-for="item in data"
        :key="item.date"
        class="m-2"
      >
        <span
          :id="'hora'"
          class="flex justify-center items-center w-11"
        >{{ getDay(item.date) == nowDay ? 'Hoy' : getDay(item.date) }}</span>
        <img
          :src="item.day.condition.icon"
          alt="icon"
        >
        <span class="flex justify-center">{{ item.day.condition.text }}</span>
      </li>
    </ul>
    <LineChart :chartData="dataSet"/>
  </div>
</template>

<script>

import { LineChart } from 'vue-chart-3';
import { Chart, registerables } from 'chart.js';

Chart.register(...registerables);
export default {
  name: 'ListaTiempoDiario',
  components: {
    LineChart,
  },
  props: {
    data: {
      type: Array,
      required: true,
    },
    dataSet: {
      type: Object,
      required: true,
    },
  },
  setup() {
    const nowDay = new Date().getUTCDate();
    const getDay = (fecha) => fecha.split('-')[2];
    return { getDay, nowDay };
  },
};
</script>
