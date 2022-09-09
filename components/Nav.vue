<template>
  <nav>
    <ul>
      <li>
      <NuxtLink to="/">Home</NuxtLink>
    </li>
    <li v-if="isLoggedIn()">
      <NuxtLink to="/myprofile">My Profile</NuxtLink>
    </li>
    <li class="logout" @click="() => signout()" v-if="isLoggedIn()">
      Logout
    </li>
    </ul>
  </nav>
</template>

<script setup lang="ts">
const { signout, isLoggedIn } = useAuth();
</script>

<style scoped>
nav {
  background-color: black;
  height: 10vh;
  color: white;

}

ul {
  display: flex;
  height: 100%;
  align-items: center;
  padding: 0.5rem;
}


li {
  color: white;
  margin-right: 1rem;
}

.logout {
  margin-left: auto;
  cursor: pointer;
}
</style>