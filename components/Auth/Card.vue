<template>
  <div>
    <NCard class="card">
      <h3>{{ authState }}</h3>
      <div class="input-container">
        <input type="email" placeholder="email" v-model="input.email">
        <input type="password" placeholder="password" v-model="input.password">
      </div>
      <NButton class="login" @click="handleSubmit">Submit</NButton>
      <p v-if="authState" class="error">{{ authError }}</p>
      <h4 v-if="showConfirmEmail" class="success">You should have receive a confirmation email.</h4>
      <p @click="toggleAuthState">{{ authState === "login" ? "Don't have an account? Create one now !!!": "Already have an account ? login here"}}</p>
    </NCard>
  </div>
</template>

<script setup lang="ts">
  const authState = ref<"login" | "signup">("login");
  const authError = ref("");
  const showConfirmEmail = ref(false);
  const input = reactive({
    password: "",
    email: ""
  });
  const router = useRouter();
  const { signup, signin } = useAuth();

  
  const toggleAuthState = () => {
    if (authState.value === "login") authState.value = "signup"
    else authState.value = "login";
    authError.value = "";
  }

  const handleSubmit = async () => {
    try {
      if (authState.value === "login") {
        await signin({ email: input.email, password: input.password});
        router.push("/myprofile")
      } else {
        await signup({ email: input.email, password: input.password});
        authState.value = "login";
        showConfirmEmail.value = true;
      }
      input.email="";
      input.password="";
    }
    catch(error) {
      authError.value = error.message
    }
  }
</script>

<style>
.card {
  padding: 1rem;
  width: 20rem;
}

.card h3 {
  font-size: 1.5rem;
  text-align: center;
  text-transform: capitalize;
}

.input-container {
  display: flex;
  flex-direction: column;
}

.input-container input {
  margin-bottom: 0.3rem;
  border: 0.1rem solid lightgrey;
  border-radius: 2rem;
  padding: 0.5rem;
}

.login {
  border: 1px solid lightgrey;
  border-radius: 2rem;
  background-color: lightgreen;
}

p {
  color: blue;
  font-size: 0.7rem;
  cursor: pointer;
}

.error {
  color: red;
}

.success {
  color: green;
}
</style>