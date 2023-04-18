<template>
  <q-page class="row items-center justify-evenly">
    <LoginForm />
  </q-page>
</template>

<script lang="ts">
import LoginForm from 'src/components/LoginForm.vue';
import { useMeta } from 'quasar';
import { defineComponent } from 'vue';

const metaData = {
  title: 'Login',
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
  components: { LoginForm },
  setup() {
    useMeta(metaData);
  },
});
</script>
