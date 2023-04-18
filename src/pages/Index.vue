<template>
  <NavbarHeader />
  <div class="centered-container">
    <div class="text-h5 font-bold">Olá, João</div>
    <div class="text-body1 text-left">
      Seja bem vindo a sua conta de hospedagem
    </div>
    <q-img
      src="src/assets/youtubeImage.png"
      class="q-mt-lg cursor-pointer"
      style="width: 60rem"
      @click="redirectToYoutube"
    />
    <div class="text-body1 q-pt-md">
      Caso tenha alguma dúvida,
      <a href="" class="black-link">visite nossa central de ajuda.</a>
    </div>
  </div>
</template>

<script  lang="ts">
import { defineComponent } from 'vue';
import NavbarHeader from 'src/components/NavbarHeader.vue';
import { useMeta } from 'quasar';

const metaData = {
  title: 'Index',
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
  name: 'IndexPage',
  components: {
    NavbarHeader,
  },
  setup() {
    useMeta(metaData);
    const redirectToYoutube = () => {
      window.open(
        'https://www.youtube.com/watch?v=fpa2W3YNg0Q&ab_channel=Locaweb',
        '_blank'
      );
    };
    return { redirectToYoutube };
  },
});
</script>

<style>
.centered-container {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
}

@media screen and (max-width: 768px) {
  .centered-container {
    padding: 1rem;
    text-align: center;
    position: relative;
    top: auto;
    left: auto;
    transform: none;
  }

  .q-img {
    max-width: 100%;
  }
}
</style>
