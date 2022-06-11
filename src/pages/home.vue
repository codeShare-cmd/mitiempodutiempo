<template>
  <main class="overflow-auto contenedor">
    <header class="flex flex-row justify-between">
      <h2 class="p-5 py-10 text-5xl font-semibold">
        {{ data?.region !== '' ? data.region : 'Obteniendo la posicion' }}
      </h2>
      <div>
        <button @click="cambairRegion">
          cambiar region
        </button>
      </div>
    </header>
    <div
      v-if="data.updated"
      class="m-6 mt-64"
    >
      <div>
        <span class="text-9xl font-semibold temperatura">
          {{ data?.temp }}
        </span>
        <span class="text-4xl font-semibold text-center">
          {{ data?.statusSky }}
        </span>
      </div>
      <Pronostico
        :region="data.region"
        ::key="data.region"
        class="mt-10"
      />
      <HistorialTiempo
        :region="data.region"
        class="mt-10"
      />
      <SalidaPuestaSol
        :region="data.region"
      />
    </div>
  </main>
</template>

<script>
import { reactive, computed, onMounted } from 'vue';
import Pronostico from '@/components/pronostico.vue';
import HistorialTiempo from '@/components/HistorialTiempo.vue';
import {
  getCurrentPosition, getTimeZone, getIp, getTimeZoneByIp, getRealTimeZone,
} from '@/services/useGetCurrentLoaction.js';
import SalidaPuestaSol from '@/components/salidaPuestaSol.vue';

export default {
  name: 'Home',
  components: {
    Pronostico,
    HistorialTiempo,
    SalidaPuestaSol,
  },
  setup() {
    const data = reactive({
      updated: false,
      latitude: '',
      longitude: '',
      accessLocalization: false,
      ip: '',
      region: '',
      temp: '',
      day: false,
      statusSky: '',
    });

    onMounted(() => {
      getCurrentPosition()
        .then((coords) => {
          data.accessLocalization = true;
          data.latitude = coords.latitude;
          data.longitude = coords.longitude;
          const q = `${data.latitude},${data.longitude}`;
          getTimeZone(q)
            .then((res) => res.json())
            .then((resp) => {
              data.region = resp.location.region;
              getRealTimeZone(q)
                .then((res) => res.json())
                .then((res) => {
                  data.temp = res.current.temp_c;
                  data.day = res.current.is_day === 0;
                  data.statusSky = res.current.condition.text;
                  data.updated = !data.updated;
                });
            })
            .catch((err) => console.log(err));
        })
        .catch(() => {
          getIp()
            .then((res) => res.json())
            .then((resp) => {
              getTimeZoneByIp(resp.ip)
                .then((res) => res.json())
                .then((resp1) => {
                  data.latitude = resp1.lat;
                  data.longitude = resp1.lon;
                  data.region = resp1.region;
                  const q = `${data.latitude},${data.longitude}`;
                  getRealTimeZone(q)
                    .then((res) => res.json())
                    .then((res) => {
                      data.temp = res.current.temp_c;
                      data.day = res.current.is_day === 0;
                      data.statusSky = res.current.condition.text;
                      data.updated = !data.updated;
                    });
                });
            });
        });
    });
    const cambairRegion = () => {
      if (data.region === 'Madrid') {
        data.region = 'Norway';
      } else {
        data.region = 'Madrid';
      }
      getRealTimeZone(data.region)
        .then((res) => res.json())
        .then((res) => {
          data.temp = res.current.temp_c;
          data.day = res.current.is_day === 0;
          data.statusSky = res.current.condition.text;
        });
    };
    const backgroundcolor = computed(() => (data.day === false ? '#0ba8bd' : 'black'));
    return { data, backgroundcolor, cambairRegion };
  },

};
</script>

<style scoped>
.contenedor {
  background-color: v-bind(backgroundcolor);
  color: white;
  height: 100%;
}

.title {
  font-size: 32px;
}

.temperatura {
  display: block;
  position: relative;
}

.temperatura::after {
  content: "";
  position: absolute;
  height: 30px;
  width: 30px;
  background-color: transparent;
  border: 5px solid white;
  border-radius: 100%;
}
</style>
