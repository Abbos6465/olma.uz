<script setup lang="ts">
import {useRoute, useRouter} from "vue-router";
import {useAuthStore} from "@/stores/auth.store";
import {onMounted, type Ref, ref} from "vue";
import AppInput, {type hintType} from "@/components/ui/AppInput.vue";
import type {LoginDataType, RegisterDataType} from "@/types";
import AppForm, {type ValidationType} from "@/components/ui/AppForm.vue";
import {getAccessToken} from "@/utils/local.storage";
import useToast from "@/components/ui/app-toast/useToast";

const route = useRoute();
const router = useRouter();
const authStore = useAuthStore();
const {toast} = useToast();

const form: Ref<LoginDataType | RegisterDataType> = ref({
  username: '',
  email: '',
  password: ''
});

const validation = ref<ValidationType>({});
const validationErrors = ref<LoginDataType | RegisterDataType>({})

const authHandler = async () => {
  if(!(await validation.value?.validate())) return
  authStore.auth(route.name, form.value).then(() => {
    toast.success({text: "Tizimga muvaffaqqiyatli kirildi"});
    router.push({name: "main"});
  }).catch((error:any) => {
    const errorData = error?.data ?? {}
    switch (error?.status){
      case 422: validationErrors.value = errorData?.errors; break;
      case 404: toast.warning({text: errorData.message}); break;
    }
  });
}

const setErrorHint = (hint?:string):hintType => {
  if(!hint) return
  return {
    status: 'danger',
    text: hint
  }
}

onMounted(() => {
  if(getAccessToken()) authStore.clearUser();
});

</script>

<template>
  <section class="auth-section">
    <div class="container">
      <div class="auth">
        <v-card
            :title="route.name === 'login' ? 'Tizimga kirish' : `Ro'yxatdan o'tish`"
            subtitle="olma.uz"
            class="mx-auto pa-8 pb-8 auth-card"
            elevation="8"
            width="500"
            rounded="lg"
        >
          <AppForm v-model:validation="validation">
            <AppInput
                v-model="form.username"
                label="Foydalanuvchi nomi"
                placeholder="Foydalanuvchi nomini kiriting"
                density="comfortable"
                required
                :hint="setErrorHint(validationErrors?.username)"
            />
            <AppInput
                v-if="route.name === 'register'"
                v-model="form.email"
                type="email"
                label="Email"
                placeholder="Emailni kiriting"
                density="comfortable"
                required
                :hint="setErrorHint(validationErrors?.email)"
            />
            <AppInput
                v-model="form.password"
                type="password"
                icon="mdi-lock-outline"
                label="Parol"
                placeholder="Parolni kiriting"
                density="comfortable"
                :min="6"
                :hint="setErrorHint(validationErrors?.password)"
                required
            />
            <v-btn
                class="mb-8"
                color="blue"
                size="large"
                :loading="authStore.isLoading"
                variant="tonal"
                block
                @click="authHandler"
            >
              {{ route.name === 'login' ? "Kirish" : "Ro'yxatdan o'tish" }}
            </v-btn>
          </AppForm>
          <v-card-text class="text-center">
            <RouterLink
                :to="{name: route.name === 'login' ? 'register' : 'login'}"
                class="text-blue text-decoration-none"
            >
              {{ route.name === 'login' ? "Ro'yxatdan o'tish" : "Kirish" }}
              <v-icon icon="mdi-chevron-right"></v-icon>
            </RouterLink>
          </v-card-text>
        </v-card>
      </div>
    </div>
  </section>
</template>

<style lang="scss">
.auth {
  min-height: 80vh;
  display: flex;
  align-items: center;
  justify-content: center;

  &-section {
    padding: 50px 0;
  }

  &-card {
    .v-card {
      &-title {
        text-align: center;
        @include font-size(32);
        font-weight: 700;
        color: $blue;
        line-height: unset;
      }

      &-subtitle {
        text-align: center;
        @include font-size(20);
        font-weight: 600;
        margin-top: 5px;
        color: $blue;
        opacity: 1;
        line-height: 100%;
      }
    }
  }
}
</style>
