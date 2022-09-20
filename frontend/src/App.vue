<template>
  <v-app>
    <v-main>
      <p>Welcome</p>
      <p>/emp for employee table</p>
      <p>/dept for department table</p>
      <router-view />
    </v-main>
  </v-app>
</template>

<script>

export default {
  name: 'App',

  data: () => ({
    //
  }),
};
</script>
