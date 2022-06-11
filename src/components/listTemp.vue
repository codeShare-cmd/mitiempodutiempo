<template>
  <div>
    <ul
      ref="lista"
      class="flex overflow-x-auto flex-row cursor-auto container-snap"
    >
      <li
        v-for="item in data"
        :key="item.hour"
        class="m-2"
      >
        <span
          :id="'hora' + filterHora(item.hour)"
          class="flex justify-center items-center w-11"
        >{{ filterHora(item.hour) == data.now ? 'Ahora' : `${filterHora(item.hour)}:00` }}</span>
        <img
          :src="item.icon"
          alt="icon"
        >
        <span class="flex justify-center temperatura">{{ item.temp }}</span>
      </li>
    </ul>
  </div>
</template>

<script>
import { onUpdated, reactive, ref } from 'vue';

export default {
  props: {
    data: {
      type: Object,
      required: true,
    },
  },

  setup() {
    const Horas = reactive({
      now: '',
    });
    Horas.now = new Date().getHours();
    const lista = ref();
    const filterHora = (fecha) => fecha.split(' ')[1].split(':')[0];
    onUpdated(() => {
      if (Horas.now.length === 1) Horas.now = `0${Horas.now}`;
      const element = lista.value.querySelector(`#hora${Horas.now}`);
      if (element != null)lista.value.querySelector(`#hora${Horas.now}`).scrollIntoViewIfNeeded(true);
    });
    return { Horas, filterHora, lista };
  },
};
</script>
<style>
.temperatura {
  display: block;
  position: relative;
}

.temperatura::after {
  content: "";
  position: absolute;
  height: 5px;
  width: 5px;
  background-color: transparent;
  border: 1px solid white;
  border-radius: 100%;
}

/* Hide scrollbar for Chrome, Safari and Opera */
.container-snap::-webkit-scrollbar {
  display: none;
}

/* Hide scrollbar for IE, Edge and Firefox */
.container-snap {
  -ms-overflow-style: none; /* IE and Edge */
  scrollbar-width: none; /* Firefox */
}

@media only screen and (min-width: 600px) {
  .container-snap {
    -ms-overflow-style: scrollbar;
    scrollbar-width: thin;
  }

  .container-snap::-webkit-scrollbar {
    display: block;
    width: 10em;
    overflow: auto;
  }
}
</style>
