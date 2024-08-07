<script setup lang="ts">
import {useRoute, useRouter} from "vue-router";
import {useAuthStore} from "@/stores/auth.store";
import {onMounted, ref, watch} from "vue";
import AppInput from "@/components/ui/forms/AppInput.vue";
import type {FormItemHintType} from "@/components/ui/forms/form.types";
import type {LoginDataType, RegisterDataType} from "@/types/auth.type";
import AppForm, {type ValidationType} from "@/components/ui/forms/AppForm.vue";
import {getAccessToken} from "@/utils/local.storage";
import useToast from "@/components/ui/app-toast/useToast";

const route = useRoute();
const router = useRouter();
const authStore = useAuthStore();
const {toast} = useToast();

const form = ref<LoginDataType | RegisterDataType>({
  username: '',
  email: '',
  password: ''
});

const validation = ref<ValidationType>({});
const validationErrors = ref<LoginDataType | RegisterDataType | {}>({})

const authHandler = async () => {
  if(!(await validation.value?.validate())) return
  authStore.auth(route.name, form.value).then(() => {
    toast.success({text: "Tizimga muvaffaqqiyatli kirildi"});
    router.push(route?.query?.redirectUrl ??  {name: "products"}).then(() => {
      clear();
    });
  }).catch((error:any) => {
    const errorData = error?.data ?? {}
    switch (error?.status){
      case 422: validationErrors.value = errorData?.errors; break;
      case 404: toast.warning({text: errorData.message}); break;
    }
  });
}

const setErrorHint = (hint?:string):FormItemHintType => {
  if(!hint) return {}
  return {
    status: 'danger',
    text: hint
  }
}

const clear = () => {
  validation.value?.clearForm();
  validation.value?.clearValidate();
}

watch(route, () => {
  clear();
});

onMounted(() => {
  if(getAccessToken()) authStore.clearUser();
});

const post = async () => {
  const data = {
    "email": "ahrororzimurodov31@gmail,com",
    "password": 1234
  }

  await axios.post("http://45.138.158.113:8081/auth/login", data).then(function (response) {
    console.log(response)
  }).catch(function (error) {
    console.log(error);
  })
}

</script>

<template>
  <section class="auth-section">
    <div class="container">
      <div class="auth">
        <VCard
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
            <VBtn
                class="mb-8 mt-5"
                color="blue"
                size="large"
                :loading="authStore.isLoading"
                variant="tonal"
                block
                @click="authHandler"
            >
              {{ route.name === 'login' ? "Kirish" : "Ro'yxatdan o'tish" }}
            </VBtn>
          </AppForm>
          <VCardText class="text-center">
            <RouterLink
                :to="{name: route.name === 'login' ? 'register' : 'login'}"
                class="text-blue text-decoration-none"
            >
              {{ route.name === 'login' ? "Ro'yxatdan o'tish" : "Kirish" }}
              <VIcon icon="mdi-chevron-right"/>
            </RouterLink>
          </VCardText>
        </VCard>
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
