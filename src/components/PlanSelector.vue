<template>
  <div class="register-container q-pt-md q-pb-xl">
    <FormHeader />

    <div class="text-body1 text-center q-pt-lg q-pb-md">
      Escolha o seu plano
    </div>

    <div
      class="q-gutter-md"
      style="display: flex; justify-content: space-between"
    >
      <PlanCards
        title="Hospedagem 1"
        description="Você não paga nada para usar sem taxa de setup"
        ideal="Ideal para quem está começando"
        country="no Estados Unidos"
        @selectedPlan="selectedPlan"
      />
      <PlanCards
        title="Hospedagem 2"
        :moreUsed="true"
        price="499"
        description="Cobrado mensalmente sem taxa de setup"
        ideal="Ideal para site com mais de 30k de visitas"
        @selectedPlan="selectedPlan"
      />
      <PlanCards
        title="Hospedagem 3"
        price="999"
        description="Cobrado mensalmente sem taxa de setup."
        ideal="Ideal para site com mais de 60k de visitas"
        @selectedPlan="selectedPlan"
      />
    </div>
  </div>
</template>

<script>
import { defineComponent, ref } from 'vue';
import PlanCards from 'src/components/PlanCards.vue';
import FormHeader from 'src/components/Heading.vue';

export default defineComponent({
  name: 'PlanSelector',
  components: { PlanCards, FormHeader },
  emits: ['selectedPlan'],
  setup(props, ctx) {
    const inputPasswordData = ref({
      type: 'password',
      icon: 'visibility',
    });

    const changePasswordType = () => {
      inputPasswordData.value.type =
        inputPasswordData.value.type === 'password' ? 'text' : 'password';
      inputPasswordData.value.icon =
        inputPasswordData.value.icon === 'visibility'
          ? 'visibility_off'
          : 'visibility';
    };

    const selectedPlan = (plan) => {
      ctx.emit('selectedPlan', plan);
    };

    return {
      selectedPlan,
      changePasswordType,
      inputPasswordData,
    };
  },
});
</script>

