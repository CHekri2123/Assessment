<template>
  <v-app>
    <v-simple-table fixed-header>
      <tr>
        <v-col class="text-left">
          <router-link to="/customer">Customer</router-link>
        </v-col>
        <v-col class="text-left">
          <router-link to="/hotel">Hotel</router-link>
        </v-col>
      </tr>
    </v-simple-table>
    <v-main>
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
