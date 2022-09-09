<template>
    <NCard class="card">
      <label>Title</label>
      <input type="text" id="" class="input" v-model="notesInput.title"/>
      <label>Description</label>
      <textarea id="" cols="30" rows="10" class="textarea" v-model="notesInput.note"></textarea>
      <NButton class="submit" @click="saveNote">Save note</NButton>
    </NCard>
</template>

<script setup lang="ts">
const { supabase } = useSupabase();
const { user } = useAuth();
const notesInput = reactive({
  title: "",
  note: ""
});

const saveNote = async () => {
  if (!notesInput.title || ! notesInput.note) return;
  await supabase.from("notes").insert({
    title: notesInput.title,
    note: notesInput.note,
    user_id: user.value.id
  })

  notesInput.title = "";
  notesInput.note = "";

};
</script>

<style scoped>
.card {
  display: flex;
  padding: 1.5rem;
  flex-direction: column;
  width: 100%;
}

.input,
.textarea {
  border: 0.1rem solid rgba(0,0,0,0.5);
  margin: 0.5rem;
  border-radius: 0.5rem;
  padding: 0.2rem;
}

.submit {
  border: 1px solid lightgrey;
  border-radius: 2rem;
  background-color: lightgreen;
  width: 25%;
}
</style>