<template>
  <v-app>
    <v-content>
      <MultiForm/>
    </v-content>
  </v-app>
</template>

<script>
import MultiForm from "./components/MultiForm";

export default {
  name: "app",
  components: {
    MultiForm
  },
};
</script>
