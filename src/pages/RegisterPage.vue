<template>
  <q-page class="row justify-evenly">
    <PlanSelector v-if="!planSelected" @selectedPlan="selectedPlan" />
    <RegisterForm
      v-if="planSelected"
      @deselectPlan="selectedPlan"
      :selectedPlan="planSelected"
    />
  </q-page>
</template>

<script lang="ts">
import PlanSelector from 'src/components/PlanSelector.vue';
import RegisterForm from 'src/components/RegisterForm.vue';
import { defineComponent, ref } from 'vue';
import { useMeta } from 'quasar';

const metaData = {
  title: 'Registro',
  titleTemplate: (title: string) => `${title} - Adoorei`,
  meta: {
    equiv: {
      'http-equiv': 'Content-Type',
      content: 'text/html; charset=UTF-8',
    },
    ogTitle: {
      property: 'og:title',
      template(ogTitle: string) {
        return `${ogTitle} - Adoorei`;
      },
    },
  },
};

export default defineComponent({
  name: 'LoginPage',
  components: { PlanSelector, RegisterForm },
  setup() {
    const planSelected = ref('');
    useMeta(metaData);
    const selectedPlan = (plan: string) => {
      planSelected.value = plan;
    };

    return {
      selectedPlan,
      planSelected,
    };
  },
});
</script>
