<script setup lang="ts">
import {useRoute, useRouter} from "vue-router";
import {useAuthStore} from "@/stores/auth.store";
import {computed, type Ref, ref} from "vue";
import AppInput from "@/components/ui/AppInput.vue";
import type {LoginDataType} from "@/types";
import AppForm from "@/components/ui/AppForm.vue";

const route = useRoute();
const router = useRouter();
const authStore = useAuthStore();

const authTitle = computed<string>(() => {
  switch (route.name) {
    case 'login':
      return "Tizimga kirish";
    case 'register':
      return "Ro'yxatdan o'tish"
    default:
      return ""
  }
});

const form: Ref<LoginDataType> = ref({
  username: '',
  password: ''
})

</script>

<template>
  <section class="auth-section">
    <div class="container">
      <div class="auth">
        <v-card
            :title="authTitle"
            subtitle="olma.uz"
            class="mx-auto pa-8 pb-8 auth-card"
            elevation="8"
            width="500"
            rounded="lg"
        >
          <AppForm>
            <AppInput
                v-model="form.username"
                label="Foydalanuvchi nomi"
                placeholder="Foydalanuvchi nomini kiriting"
                density="comfortable"
                required
            />
            <AppInput
                type="password"
                icon="mdi-lock-outline"
                label="Parol"
                placeholder="Parolni kiriting"
                density="comfortable"
                required
            />
            <v-btn
                class="mb-8"
                color="blue"
                size="large"
                variant="tonal"
                block
            >
              Log In
            </v-btn>
          </AppForm>
          <v-card-text class="text-center">
            <a
                class="text-blue text-decoration-none"
                href="#"
                rel="noopener noreferrer"
                target="_blank"
            >
              Sign up now
              <v-icon icon="mdi-chevron-right"></v-icon>
            </a>
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