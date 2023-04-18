<template>
  <div class="q-px-md">
    <q-layout view="lHh lpr lFf" style="min-height: 119px">
      <q-header reveal class="bg-transparent">
        <q-toolbar class="q-pl-md">
          <img src="src/assets/locaweb.png" class="logo-image" />
          <div
            class="q-ml-md cursor-pointer non-selectable absolute-right q-mt-xs"
          >
            <q-avatar color="blue-grey-3" text-color="white">J</q-avatar>
            <q-menu auto-close>
              <q-list dense style="min-width: 100px">
                <q-item clickable>
                  <q-item-section @click="alert = true">Sair</q-item-section>
                </q-item>
              </q-list>
            </q-menu>
          </div>
        </q-toolbar>
      </q-header>
    </q-layout>

    <q-dialog v-model="alert">
      <q-card>
        <q-card-section>
          <div class="text-h6">Deseja realmente sair?</div>
        </q-card-section>

        <q-card-section class="q-pt-none">
          Ao clicar em "Confirmar", você será redirecionado para a página de
          login.
        </q-card-section>

        <q-card-actions align="right">
          <q-btn
            label="Confirmar"
            color="positive"
            @click="logout"
            v-close-popup
          />
          <q-btn label="Cancelar" color="negative" v-close-popup />
        </q-card-actions>
      </q-card>
    </q-dialog>
  </div>
</template>

<script>
import { defineComponent, ref } from 'vue';
import { useAuthStore } from 'src/stores/auth';
import { useRouter } from 'vue-router';

export default defineComponent({
  name: 'NavbarHeader',
  setup() {
    const alert = ref(false);
    const router = useRouter();
    const authStore = useAuthStore();

    const logout = () => {
      authStore.logout();
      router.go(-1);
    };

    return { alert, logout };
  },
});
</script>

<style scoped>
.bg-transparent {
  background-color: transparent;
}

.absolute-right {
  position: absolute;
  right: 1%;
}

@media screen and (max-width: 600px) {
  .logo-image {
    max-width: 130px;
  }

  .absolute-right {
    top: 0;
    right: 7px;
    margin-top: 8px;
  }
}
</style>

