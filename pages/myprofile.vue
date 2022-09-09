<template>
  <div class="profile">
    <h3>My notes</h3>
    <NotesForm />
    <div v-if="notes" class="card-container">
      <NCard class="card" v-for="note in notes" :key="note.id">
        <h2>{{note.title}}</h2>
        <h6>{{ note.note}}</h6>
      </NCard>
    </div>
  </div>
</template>

<script setup lang="ts">
  const { supabase } = useSupabase();
  const { user } = useAuth();
  definePageMeta({
    middleware: "auth"
  });

  const  {data:notes, error} = useAsyncData("notes", async () => {
    let resp;
    try {
      resp = await supabase.from("notes").select().eq("user_id", user.value.id);
      console.log(resp)
      return resp.data;
    }
    catch(error) {
      return resp.error;
    }
  })
</script>

<style scoped>
.profile {
  max-width: 50%;
  margin: 0 auto;
  padding: 3rem 0;
  height: 90vh;
}

h3 {
  font-size: 3rem;
}

.card {
  padding: 1rem;
  width: 100%;
}

.card h2 {
  font-weight: bold;
  font-size: 1.5rem;
  margin-top: 1.5rem;
}

.card-container {
  margin-top: 2.5rem;
  width: 100%;
}

</style>