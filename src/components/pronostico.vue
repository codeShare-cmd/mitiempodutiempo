<template>
  <header>
    <h2>Pronostico cada horas</h2>
  </header>
  <div>
    <h2>{{ region }}</h2>
    <ul>
      <li
        v-for="item in data.historial.horas"
        :key="item.time"
      >
        {{ item.temp_c }}
      </li>
    </ul>
  </div>
</template>

<script>
import { reactive, onMounted } from 'vue';
import { useGetHistoryWeather } from '@/hooks/useGetHistoryWarther';

export default {
  name: 'Pronostico',
  props: {
    region: {
      type: String,
      default: () => 'Madrid',
    },
  },
  setup(props) {
    const data = reactive({
      historial: '',
    });
    onMounted(() => {
      useGetHistoryWeather(props.region)
        .then((resp) => {
          data.historial = resp;
        });
    });

    return { data };
  },
};
</script>
