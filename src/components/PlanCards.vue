<template>
  <div v-bind:class="{ fade: makeFade }">
    <q-card
      class="bg-white text-grey-8 q-px-lg q-pa-lg"
      style="text-align: center; width: 20rem; box-shadow: none"
    >
      <q-card-section>
        <div v-if="moreUsed">
          <div
            class="bg-positive text-white rounded-borders non-selectable row flex-center more-used-card text-uppercase"
          >
            Mais Usado
          </div>
        </div>

        <div class="text-h4 font-bold q-mt-xs">{{ title }}</div>
        <div class="q-pt-md price-fuchsia-small" v-if="price !== 'Grátis'">
          R$ <span class="price-fuchsia">499</span>/mês
        </div>
        <div class="q-pt-md price-fuchsia" v-else>
          {{ price }}
        </div>
        <div class="text-body1 q-my-md">
          {{ description }}
        </div>
        <q-separator />
        <div class="q-my-md" style="font-size: 1.2rem">
          {{ ideal }}
        </div>
        <q-separator />
        <q-btn
          v-if="!makeFade"
          class="btn-fuchsia q-ml-sm q-mt-md"
          label="Escolher este plano"
          size="15px"
          flat
          @click="selectedPlan()"
        />
      </q-card-section>
      <div class="text-h6 font-bold">
        Seu site em servidores
        <a href="" class="black-link"> {{ country }} </a>.
      </div>

      <div v-if="title === 'Hospedagem 1'">
        <div
          v-for="benefits in host1.initialBenefits"
          :key="benefits.id"
          class="text-body2 q-pt-sm"
          style="text-align: left; font-size: 1.1rem"
        >
          ✔ {{ benefits.content }}
        </div>
      </div>

      <div v-else-if="title === 'Hospedagem 2'">
        <div
          v-for="benefits in host2.initialBenefits"
          :key="benefits.id"
          class="text-body2 q-pt-sm"
          style="text-align: left; font-size: 1.1rem"
        >
          ✔ {{ benefits.content }}
        </div>
      </div>

      <div v-else>
        <div
          v-for="benefits in host3.initialBenefits"
          :key="benefits.id"
          class="text-body2 q-pt-sm"
          style="text-align: left; font-size: 1.1rem"
        >
          ✔ {{ benefits.content }}
        </div>
      </div>

      <div class="text-h6 font-bold q-pt-md">
        Suporte 24 horas, 7 dias por semana grátis;
      </div>

      <div class="text-h6 font-bold q-pt-md">Aplicativos disponíveis:</div>

      <div
        v-for="app in apps"
        :key="app.id"
        class="text-body2 q-pt-sm"
        style="text-align: left; font-size: 1.1rem"
      >
        ✔ {{ app.content }}
      </div>

      <div v-if="title !== 'Hospedagem 1'">
        <div class="text-h6 font-bold q-pt-md">Migração Gratuita:</div>
        <div
          v-for="migration in freeMigration"
          :key="migration.id"
          class="text-body2 q-pt-sm"
          style="text-align: left; font-size: 1.1rem"
        >
          ✔ {{ migration.content }}
        </div>
      </div>

      <div class="text-h6 font-bold q-pt-md">Você ainda tem:</div>

      <div class="teste">
        <div
          v-for="benefits in moreData.moreBenefits"
          :key="benefits.id"
          class="text-body2 q-pt-sm"
          style="text-align: left; font-size: 1.1rem"
        >
          ✔ {{ benefits.content }}
        </div>
      </div>
    </q-card>
  </div>
</template>

<script>
import { defineComponent } from 'vue';
export default defineComponent({
  name: 'PlanCards',
  props: {
    moreUsed: {
      type: Boolean,
      default: false,
    },
    title: {
      type: String,
      default: '',
    },
    price: {
      type: String,
      default: 'Grátis',
    },
    description: {
      type: String,
      default: '',
    },
    ideal: {
      type: String,
      default: '',
    },
    country: {
      type: String,
      default: 'no Brasil',
    },
    makeFade: {
      type: Boolean,
      default: false,
    },
  },
  emits: ['selectedPlan'],
  setup(props, ctx) {
    const apps = [
      {
        id: 1,
        content: 'WordPress;',
      },
      {
        id: 2,
        content: 'Drupal;',
      },
      {
        id: 3,
        content: 'Entre outros...',
      },
    ];

    const freeMigration = [
      {
        id: 1,
        content: 'Migramos todos os seus sites para nossos servidores;',
      },
    ];

    const host1 = {
      initialBenefits: [
        {
          id: 1,
          content: 'Servidores em nossos data centers americanos;',
        },
        {
          id: 2,
          content:
            'ASP, ASP.NET 2.0/3.0/3.5/ e 4.0/4.5/4.5.1/4.5.2 (medium trust) ou PHP 5.3, 5.4, 5.5, 5.6 E 7.0;',
        },
        {
          id: 3,
          content: '1 usuário de FTP para upload ou download;',
        },
        {
          id: 4,
          content: '1 conta de e-mail profissional;',
        },
        {
          id: 5,
          content: '1 subdomínio gratuíto;',
        },
      ],
    };

    const host2 = {
      initialBenefits: [
        {
          id: 1,
          content: 'Servidores em nossos data centers de São Paulo;',
        },
        {
          id: 2,
          content:
            'ASP, ASP.NET 2.0/3.0/3.5/ e 4.0/4.5/4.5.1/4.5.2 (medium trust) ou PHP 5.3, 5.4, 5.5, 5.6 E 7.0;',
        },
        {
          id: 3,
          content: '10 usuário de FTP para upload ou download;',
        },
        {
          id: 4,
          content: '30 contas de e-mails profissionais;',
        },
        {
          id: 5,
          content: '10 subdomínios gratuítos;',
        },
      ],
    };

    const host3 = {
      initialBenefits: [
        {
          id: 1,
          content: 'Servidores em nossos data centers de São Paulo;',
        },
        {
          id: 2,
          content:
            'ASP, ASP.NET 2.0/3.0/3.5/ e 4.0/4.5/4.5.1/4.5.2 (medium trust) ou PHP 5.3, 5.4, 5.5, 5.6 E 7.0;',
        },
        {
          id: 3,
          content: 'Ilimitados usuário de FTP para upload ou download;',
        },
        {
          id: 4,
          content: 'Ilimitadas contas de e-mails profissionais;',
        },
        {
          id: 5,
          content: '50 subdomínios gratuítos;',
        },
      ],
    };

    const moreData = {
      moreBenefits: [
        {
          id: 1,
          content: 'WebMail RoundCube;',
        },
        {
          id: 2,
          content: 'AntiSpam;',
        },
        {
          id: 3,
          content: 'Painel de gerenciamento de DNS;',
        },
        {
          id: 4,
          content: 'Painel de controle web;',
        },
        {
          id: 5,
          content: 'Configurações de PHP personalizáveis;',
        },
        {
          id: 6,
          content: 'Certificado SSL Grátis;',
        },
        {
          id: 7,
          content: 'Trânsferencia ilimitada;',
        },
      ],
    };

    const selectedPlan = () => {
      ctx.emit('selectedPlan', props.title);
    };

    return {
      selectedPlan,
      freeMigration,
      moreData,
      host2,
      host1,
      host3,
      apps,
    };
  },
});
</script>

<style scoped>
.fade {
  position: relative;
  max-height: 66rem;
  overflow: hidden;
}

.fade::after {
  content: '';
  position: absolute;
  bottom: 0;
  left: 0;
  width: 100%;
  height: 20rem;
  background: linear-gradient(to bottom, transparent, white);
  pointer-events: none;
}

.more-used-card {
  width: 8rem;
  height: 2rem;
  margin-top: -3.5rem;
  margin-left: 3.5rem;
  margin-bottom: 1.7rem;
  font-weight: 100;
}

.price-fuchsia-small {
  color: #f30168;
  font-size: 1.5rem;
}
</style>

