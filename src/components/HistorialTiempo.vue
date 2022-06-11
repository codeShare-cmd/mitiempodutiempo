<template>
  <section class="p-4 bg-blue-300/90 rounded-xl border">
    <header class="my-2">
      <h2 class="text-slate-200/75 uppercase">
        Pronostico diario
      </h2>
    </header>
    <ListTiempoDiarioVue
      :data="data.pronostico"
      :dataSet="dataSet"
    />
  </section>
</template>

<script>
import { useGetHistoryWeather } from '@/hooks/useGetHistoryWarther';
import {
  onMounted, reactive, watch, computed,
} from 'vue';
import ListTiempoDiarioVue from './listTiempoDiario.vue';

export default {
  components: {
    ListTiempoDiarioVue,
  },
  props: {
    region: {
      type: String,
      required: true,
    },
  },
  setup(props) {
    const data = reactive({
      pronostico: [],
      fechas: [],
      temp_max: [],
      temp_min: [],
    });
    onMounted(() => {
      useGetHistoryWeather(props.region, 3)
        .then((resp) => {
          data.pronostico = resp;
          resp.forEach((element) => {
            data.fechas.push(element.date);
            data.temp_max.push(element.day.maxtemp_c);
            data.temp_min.push(element.day.mintemp_c);
          });
        });
    });
    const dataSet = reactive({
      labels: data.fechas,
      datasets: [
        {
          label: 'max temp',
          data: data.temp_max,
          backgroundColor: ['#D23412'],
        },
        {
          label: 'min temp',
          data: data.temp_min,
          backgroundColor: ['#D4D85C'],
        },
      ],
    });
    const region2 = computed(() => props.region);
    watch(region2, (curretValue) => {
      useGetHistoryWeather(curretValue, 3)
        .then((resp) => {
          data.pronostico = resp;
          data.fechas = [];
          data.temp_max = [];
          data.temp_min = [];
          resp.forEach((element) => {
            data.fechas.push(element.date);
            data.temp_max.push(element.day.maxtemp_c);
            data.temp_min.push(element.day.mintemp_c);
          });
          dataSet.labels = data.fechas;
          dataSet.datasets[0].data = data.temp_max;
          dataSet.datasets[1].data = data.temp_min;
        });
    });

    return { props, data, dataSet };
  },
};

</script>
