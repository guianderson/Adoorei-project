<template>
  <div class="image-container q-pb-lg">
    <img
      src="src/assets/locaweb.png"
      @click="redirectToLogin"
      class="logo-image cursor-pointer"
    />
  </div>
  <div class="text-center font-bold" style="font-size: 30px">
    Você está muito próximo de mudar a forma de
  </div>

  <div class="text-center font-bold" style="font-size: 30px">
    <a class="link-fuchsia" href="/register"><ins>hospedar seu site</ins></a>
  </div>
</template>

<script>
import { defineComponent } from 'vue';
import { useRouter } from 'vue-router';
export default defineComponent({
  name: 'FormHeader',
  setup() {
    const router = useRouter();
    const redirectToLogin = () => {
      router.push('/');
    };
    return { redirectToLogin };
  },
});
</script>

