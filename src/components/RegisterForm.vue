<template>
  <div class="register-container q-pt-md q-pb-xl">
    <FormHeader />
    <div
      class="q-gutter-md q-pt-xl"
      style="display: flex; justify-content: space-between"
    >
      <q-card class="card">
        <q-card-section>
          <div class="text-h5 font-bold">Dados Pessoais</div>
          <div class="text-body1 text-left q-pb-md">
            Informe seus dados pessoais para acesso à sua conta
          </div>

          <div class="text-body1 text-left">Nome Completo</div>
          <q-input
            outlined
            v-model="state.name"
            :error="v$.name.$error"
            :error-message="v$.name.$errors[0]?.$message"
            placeholder="Informe seu nome Completo"
          ></q-input>

          <div class="text-body1 text-left q-pt-sm">Celular</div>
          <q-input
            outlined
            v-model="state.phoneNumber"
            placeholder="(99) 99999-9999"
            mask="(##) #####-####"
            :error="v$.phoneNumber.$error"
            :error-message="v$.phoneNumber.$errors[0]?.$message"
          ></q-input>

          <div class="text-body1 text-left q-pt-sm">Email</div>
          <q-input
            outlined
            type="email"
            v-model="state.email"
            placeholder="Informe seu email"
            :error="v$.email.$error"
            :error-message="v$.email.$errors[0]?.$message"
          ></q-input>

          <div class="text-body1 text-left q-pt-sm">Senha</div>
          <q-input
            :type="inputPasswordData.password.type"
            v-model="state.password"
            class="q-mt-md"
            outlined
            :error="v$.password.$error"
            :error-message="v$.password.$errors[0]?.$message"
          >
            <template #append>
              <q-icon
                :name="inputPasswordData.password.icon"
                @click="changePasswordType('password')"
                class="cursor-pointer"
              />
            </template>
          </q-input>

          <div class="text-body1 text-left q-pt-sm">Confirme sua senha</div>
          <q-input
            :type="inputPasswordData.confirmPassword.type"
            v-model="state.confirmPassword"
            class="q-mt-md"
            outlined
            :error="v$.confirmPassword.$error"
            :error-message="v$.confirmPassword.$errors[0]?.$message"
          >
            <template #append>
              <q-icon
                :name="inputPasswordData.confirmPassword.icon"
                @click="changePasswordType('confirmPassword')"
                class="cursor-pointer"
              />
            </template>
          </q-input>

          <q-separator class="q-mt-lg" />

          <div class="text-h5 font-bold q-pt-lg">Dados do seu site</div>

          <div class="text-body1 text-left">Nome do seu site</div>
          <q-input
            outlined
            placeholder="Meu site"
            v-model="state.siteName"
            :error="v$.siteName.$error"
            :error-message="v$.siteName.$errors[0]?.$message"
            hint="Exatamente igual o título do seu site"
          ></q-input>

          <q-separator class="q-mt-lg" />

          <div class="q-gutter-sm q-mt-md">
            <div>
              <label class="text-body1">
                <q-checkbox v-model="right" color="pink-13" keep-color />
                <span>
                  Ao concluir com seu cadastro você concorda com nossos
                </span>
                <span style="display: block; text-indent: 2.8em">
                  <a href="" class="black-link">termos de uso.</a> e
                  <a href="" class="black-link">política de privacidade.</a>
                </span>
              </label>
            </div>
          </div>
        </q-card-section>

        <q-card-actions>
          <q-btn
            class="btn-fuchsia btn-fullwidth q-ml-sm"
            label="Criar conta"
            size="15px"
            @click="register"
            flat
            :disable="!right"
          />
        </q-card-actions>
      </q-card>

      <div class="plan-container">
        <div class="plan-cards">
          <PlanCards
            v-if="selectedPlan === 'Hospedagem 1'"
            title="Hospedagem 1"
            description="Você não paga nada para usar sem taxa de setup"
            ideal="Ideal para quem está começando"
            country="no Estados Unidos"
            :makeFade="true"
          />
          <PlanCards
            v-else-if="selectedPlan === 'Hospedagem 2'"
            title="Hospedagem 2"
            price="499"
            description="Cobrado mensalmente sem taxa de setup"
            ideal="Ideal para site com mais de 30k de visitas"
            :makeFade="true"
          />
          <PlanCards
            v-else
            title="Hospedagem 3"
            price="999"
            description="Cobrado mensalmente sem taxa de setup."
            ideal="Ideal para site com mais de 60k de visitas"
            :makeFade="true"
          />
        </div>
        <div class="add-plan-button">
          <q-btn
            outline
            class="btn-white q-ml-sm font-bold"
            label="Trocar Plano"
            size="15px"
            flat
            @click="deselectPlan()"
          />
        </div>

        <div>
          <div
            class="bg-dark text-white rounded-borders non-selectable row flex-center info-box text-uppercase"
          >
            Plano escolhido
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { defineComponent, ref, reactive } from 'vue';
import FormHeader from 'src/components/Heading.vue';
import PlanCards from 'src/components/PlanCards.vue';
import {
  email,
  required,
  minLength,
  maxLength,
  helpers,
} from '@vuelidate/validators';
import useVuelidate from '@vuelidate/core';
import useNotify from 'src/composables/UseNotify';
import { RegisterService } from 'src/services/register/RegisterService';
import { useRouter } from 'vue-router';

export default defineComponent({
  name: 'PlanSelector',
  components: { FormHeader, PlanCards },
  emits: ['deselectPlan'],
  props: {
    selectedPlan: {
      type: String,
      required: true,
    },
  },
  setup(props, ctx) {
    const right = ref(false);
    const router = useRouter();
    const registerService = new RegisterService();
    const { notifyError, notifySuccess } = useNotify();

    const inputPasswordData = ref({
      password: {
        type: 'password',
        icon: 'visibility',
      },
      confirmPassword: {
        type: 'password',
        icon: 'visibility',
      },
    });

    const togglePasswordVisibility = (type) => {
      const { password, confirmPassword } = inputPasswordData.value;
      const target = type === 'password' ? password : confirmPassword;

      target.type = target.type === 'password' ? 'text' : 'password';
      target.icon =
        target.icon === 'visibility' ? 'visibility_off' : 'visibility';
    };

    const changePasswordType = (type) => {
      togglePasswordVisibility(type);
    };

    const deselectPlan = () => {
      ctx.emit('deselectPlan', undefined);
    };

    const state = reactive({
      name: '',
      phoneNumber: '',
      email: '',
      password: '',
      confirmPassword: '',
      siteName: '',
      firstName: '',
      lastName: '',
    });

    const rules = reactive({
      email: {
        required: helpers.withMessage('Campo obrigatório.', required),
        email: helpers.withMessage('E-mail inválido.', email),
      },
      password: {
        required: helpers.withMessage('Campo obrigatório.', required),
        minLen: helpers.withMessage('No mínimo 8 caracteres.', minLength(8)),
        maxLength: helpers.withMessage(
          'No máximo 20 caracteres.',
          maxLength(20)
        ),
      },
      confirmPassword: {
        required: helpers.withMessage('Campo obrigatório.', required),
        minLen: helpers.withMessage('No mínimo 8 caracteres.', minLength(8)),
        maxLength: helpers.withMessage(
          'No máximo 20 caracteres.',
          maxLength(20)
        ),
        invalid: helpers.withMessage('Senhas não conferem.', (value) => {
          return value === state.password;
        }),
      },
      name: {
        required: helpers.withMessage('Campo obrigatório.', required),
        minLength: helpers.withMessage('Nome inválido.', minLength(3)),
        maxLength: helpers.withMessage('Nome inválido.', maxLength(50)),
      },
      phoneNumber: {
        required: helpers.withMessage('Campo obrigatório.', required),
        minLength: helpers.withMessage('Telefone inválido.', minLength(10)),
        maxLength: helpers.withMessage('Telefone inválido.', maxLength(15)),
      },
      siteName: {
        required: helpers.withMessage('Campo obrigatório.', required),
      },
    });

    const v$ = useVuelidate(rules, state);

    const splitName = () => {
      const splitName = state.name.split(' ');
      state.firstName = splitName[0];
      state.lastName = splitName[splitName.length - 1];
    };

    const register = async () => {
      const isFormValid = await v$.value.$validate();
      if (!isFormValid) {
        notifyError('Ocorreu um erro ao realizar o cadastro, tente novamente.');
        return;
      } else {
        splitName();
        const payload = {
          name: {
            firstName: state.firstName,
            lastName: state.lastName,
          },
          email: state.email,
          password: state.password,
          phoneNumber: Number(state.phoneNumber),
          siteName: state.siteName,
        };

        try {
          registerService.registerUser(payload);
          notifySuccess(
            'Cadastro realizado com sucesso! Agora, realize o login.'
          );
          setTimeout(function () {
            router.push('/');
          }, 500);
        } catch (error) {
          notifyError(
            'Ocorreu um erro ao realizar o cadastro, tente novamente.'
          );
          return;
        }
      }
    };

    return {
      v$,
      state,
      right,
      inputPasswordData,
      changePasswordType,
      deselectPlan,
      register,
    };
  },
});
</script>

<style scoped>
.plan-container {
  position: relative;
  display: flex;
  flex-direction: column;
  height: 100%;
}

.plan-cards {
  position: relative;
  flex: 1;
}

.add-plan-button {
  position: absolute;
  top: 60rem;
  left: 0;
  right: 0;
  display: flex;
  justify-content: center;
  padding: 1rem;
}

.card {
  border: 1px solid #e7e4e4;
  box-shadow: none;
  height: 66rem;
  width: 35rem;
}

.info-box {
  position: absolute;
  top: -1rem;
  left: 5rem;
  right: 0;
  display: flex;
  justify-content: center;
  padding: 0.5rem;
  width: 10rem;
  border-radius: 13px;
}

.btn-white {
  background-color: white;
  border: 1px solid currentColor;
  font-family: Arial;
  color: black;
  box-shadow: none;
  font-weight: 100;
  width: 14rem;
  height: 3rem;
}

.btn-fullwidth {
  width: 33rem;
  height: 70px;
}
</style>

