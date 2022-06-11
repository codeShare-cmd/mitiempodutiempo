<template>
  <section class="p-4 bg-blue-300/90 rounded-xl border">
    <header class="my-2">
      <h2 class="text-slate-200/75 uppercase">
        Pronostico cada horas
      </h2>
    </header>
    <ListTemp :data="data.historial" />
  </section>
</template>

<script>
import {
  reactive, onMounted, computed, watch,
} from 'vue';
import { useGetHistoryWeather } from '@/hooks/useGetHistoryWarther';
import ListTemp from '@/components/listTemp.vue';

export default {
  name: 'Pronostico',
  components: {
    ListTemp,
  },
  props: {
    region: {
      type: String,
      required: true,
    },
  },
  setup(props) {
    const data = reactive({
      historial: {},
      now: '',
    });
    const region2 = computed(() => props.region);
    watch(region2, (currenvalue) => {
      useGetHistoryWeather(currenvalue)
        .then((resp) => {
          data.historial = resp;
        });
    });
    onMounted(() => {
      useGetHistoryWeather(props.region)
        .then((resp) => {
          data.historial = resp;
        });
    });

    return { data, region2 };
  },
};
</script>
