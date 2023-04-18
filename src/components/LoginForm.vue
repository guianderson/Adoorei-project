<template>
  <div class="login-container">
    <div class="image-container">
      <img src="src/assets/locaweb.png" class="logo-image" />
    </div>
    <q-card class="login-card">
      <q-card-section>
        <div class="text-h5 font-bold">Entre na sua Conta</div>
        <div class="text-body1 text-left q-pb-md">
          Para acessar sua conta, informe seu e-mail e senha
        </div>

        <div class="text-body1 text-left">E-mail</div>
        <q-input
          outlined
          type="email"
          v-model="state.email"
          :error="v$.email.$error"
          :error-message="v$.email.$errors[0]?.$message"
        ></q-input>
        <div class="text-body1 text-left q-pt-md">Senha</div>
        <q-input
          :type="inputPasswordData.type"
          v-model="state.password"
          class="q-mt-md"
          outlined
          :error="v$.password.$error"
          :error-message="v$.password.$errors[0]?.$message"
        >
          <template #append>
            <q-icon
              :name="inputPasswordData.icon"
              @click="changePasswordType()"
              class="cursor-pointer"
            />
          </template>
        </q-input>
        <div class="text-body1 text-right q-pt-sm">Esqueci minha senha</div>
      </q-card-section>

      <q-card-actions>
        <q-btn
          class="btn-fuchsia btn-fullwidth q-ml-sm"
          label="Fazer Login"
          size="15px"
          no-caps
          @click="login"
          flat
        />
      </q-card-actions>
    </q-card>

    <div class="text-body1 text-center q-pt-md">
      Ainda não tem conta?
      <a href="/register" class="link-fuchsia"><ins>Cadastre-se</ins></a>
    </div>
  </div>
</template>

<script>
import { defineComponent, ref, reactive } from 'vue';
import {
  email,
  required,
  minLength,
  maxLength,
  helpers,
} from '@vuelidate/validators';
import useVuelidate from '@vuelidate/core';
import useNotify from 'src/composables/UseNotify';
import { useAuthStore } from 'src/stores/auth';
import { useRouter } from 'vue-router';

export default defineComponent({
  name: 'LoginForm',
  setup() {
    const router = useRouter();
    const authStore = useAuthStore();
    const { notifyError, notifySuccess } = useNotify();
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

    const state = reactive({
      email: '',
      password: '',
    });

    const rules = reactive({
      email: {
        required: helpers.withMessage('Campo obrigatório.', required),
        email: helpers.withMessage('E-mail inválido.', email),
      },
      password: {
        required: helpers.withMessage('Campo obrigatório.', required),
        minLen: helpers.withMessage('Senha inválida.', minLength(8)),
        maxLength: helpers.withMessage('Senha inválida.', maxLength(20)),
      },
    });

    const v$ = useVuelidate(rules, state);

    const login = async () => {
      const isFormValid = await v$.value.$validate();
      if (isFormValid) {
        try {
          await authStore.authenticate(state.email, state.password);
          notifySuccess('Login realizado com sucesso!');
          router.push('/index');
        } catch (error) {
          notifyError('Ocorreu um erro ao realizar o login, tente novamente.');
          return;
        }
      } else {
        notifyError('Ocorreu um erro ao realizar o login, tente novamente.');
        return;
      }
    };

    return {
      v$,
      state,
      inputPasswordData,
      changePasswordType,
      login,
    };
  },
});
</script>

<style scoped>
.login-container {
  justify-content: center;
  flex-direction: column;
  align-items: center;
  display: flex;
  height: 100vh;
  padding: 1rem;
}

.image-container {
  text-align: center;
  margin-top: 2rem;
  margin-bottom: 1rem;
}

.login-card {
  border: 1px solid #e7e4e4;
  box-shadow: none;
  height: auto;
  max-width: 35rem;
  width: 100%;
  margin: 0 auto;
  padding: 1.5rem;
  box-sizing: border-box;
}

.btn-fullwidth {
  width: 100%;
  height: 70px;
}

@media (min-width: 768px) {
  .login-container {
    padding: 2rem;
  }

  .login-card {
    height: auto;
    max-width: 50rem;
  }
}
</style>

