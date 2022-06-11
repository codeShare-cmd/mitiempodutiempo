<template>
  <div class="flex relative flex-col my-5 h-64 bg-slate-400/80 rounded-lg">
    <div class="relative translate-x-32 translate-y-16">
      <img
        src="http://cdn.weatherapi.com/weather/64x64/day/113.png"
        alt="sol"
      >
    </div>
    <div class="flex relative top-1/2 justify-between px-5">
      <span>
        {{ data.salida }}
      </span>
      <span>
        {{ data.puesta }}
      </span>
    </div>
  </div>
</template>

<script>
import { getSalidaPuestaSol } from '@/services/useGetCurrentLoaction';
import { reactive, onMounted } from 'vue';
import { convertTime } from '@/utiles/utils';

export default {
  name: 'PuestaSalidaSol',
  props: {
    region: {
      type: String,
      required: true,
    },
  },
  setup(props) {
    const data = reactive({
      salida: '',
      puesta: '',
      now: '',
    });

    onMounted(() => {
      if (props.region !== '') {
        getSalidaPuestaSol(props.region)
          .then((resp) => resp.json())
          .then((resp1) => {
            data.salida = convertTime(resp1.astronomy.astro.sunrise);
            data.puesta = convertTime(resp1.astronomy.astro.sunset);
            const now = new Date().getHours();
            if (now === 0) {
              data.now = 24;
            } else {
              data.now = now;
            }
          });
      }
    });

    /* const claculatePosicion = (horaActual, salida, puesta) => {
      const medio = (puesta - salida) / 2;
      const alto = salida + medio;
      if (horaActual <= alto) {
        return { x: horaActual, y: 0 + salida };
      }
      return { x: horaActual, y: alto - horaActual };
    }; */

    return { data };
  },
};

</script>
