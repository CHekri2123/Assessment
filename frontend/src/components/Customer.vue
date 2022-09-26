<template>
  <v-container>
    <!--Global Search Button -->
    <SearchComponent @empDataSender="serachEmpDataReciever($event)" />
    <template>
      <!-- Form opens, when plus button on the UI get clicked -->
      <v-form ref="form" v-model="valid" lazy-validation>
        <v-dialog v-model="dialog" max-width="600px">
          <template v-slot:activator="{ on, attrs }">
            <v-btn class="mb-2" small @click="press()" v-bind="attrs" v-on="on" fab color="indigo">
              <v-icon small>mdi-plus</v-icon>
            </v-btn>
          </template>
          <v-card>
            <v-card-title>
              <span class="text-h5">Customer Data</span>
            </v-card-title>
            <v-card-text>
              <v-row>
                <v-col cols="12" sm="6" md="4">
                  <v-text-field v-model="id" outlined label="Enter your Id" required>
                  </v-text-field>
                </v-col>
                <v-col cols="12" sm="6" md="4">
                  <v-text-field v-model="customer_id" outlined label="Enter Customer Id" required>
                  </v-text-field>
                </v-col>
                <v-col>
                  <v-text-field v-model="customer_name" outlined label="Enter Customer Name" required>
                  </v-text-field>
                </v-col>
              </v-row>
            </v-card-text>
            <v-card-actions>
              <v-btn color="success" v-model="submitButton" @click="submit()" v-if="boolValue">
                Submit
              </v-btn>
              <v-btn color="success" v-model="updateButton" @click="edit()" v-else>
                Update
              </v-btn>
            </v-card-actions>
          </v-card>
        </v-dialog>
      </v-form>
      <div>
        <v-simple-table fixed-header>
          <thead>
            <tr>
              <th class="text-left">Id
                <v-icon @click="SortAscending(val='id')">mdi-arrow-up</v-icon>
                <v-icon @click="SortDescending(val='id')">mdi-arrow-down</v-icon>
              </th>
              <th class="text-left">Customer Id
                <v-icon @click="SortAscending(val='customer_name')">mdi-arrow-up</v-icon>
                <v-icon @click="SortDescending(val='customer_name')">mdi-arrow-down</v-icon>
              </th>
              <th class="text-left">Customer Name</th>
              <th class="text-left">Count of Hotels</th>
              <th class="text-left">Actions</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="row in customerTable" :key="row.id">
              <td>{{row.id}}</td>
              <td>{{row.customer_id}}</td>
              <td>{{row.customer_name}}</td>
 <!-- countTable contains Data of the count of tables came from backend, where column name is count -->
              <td>{{row.count}}</td>
              <td>
                <v-btn fab class="mb-2" small color="cyan" dark @click="update(row)">
                  <v-icon small>mdi-pencil</v-icon>
                </v-btn>
                <v-btn fab class="mb-2" @click="deleteData(row.id)" small color="pink">
                  <v-icon small>mdi-delete</v-icon>
                </v-btn>
              </td>
            </tr>
          </tbody>
        </v-simple-table>
      </div>
    </template>
  </v-container>
</template>

<script>
import axios from 'axios';
// Here instanceOfItem saves the index of the particular rows of the data when edit button is clicked
var instanceOfItem;

export default {
  name: "CustomerCrud",
  data() {
    return {
      countTable: [],
      id: '',
      customer_id: '',
      customer_name: '',
      branch_name: '',
      customerTable: [],
      valid: '',
      dialog: false,
      flag: false,
      boolValue: true,
      updateButton: true,
      submitButton: true,
    };
  },

  mounted() {
    this.read()

  },


  methods: {

    read() {
      axios.get(process.env.VUE_APP_GET_LINK).then(response => {
        this.customerTable = response.data.data
      })
      // count end point where it gets the data of the count data from the backend.
      axios.get(`http://127.0.0.1:3333/count`).then(response => {
        this.countTable = response.data
      })
    },

    async submit() {
      const sub = await axios.post(process.env.VUE_APP_POST_LINK, {
        id: this.id,
        customer_id: this.customer_id,
        customer_name: this.customer_name
      });
      console.log('Printing submitted details when submit button pressed')
      console.log(sub);
      this.read();
      this.dialog = false;
      this.$refs.form.reset()
    },

    press() {
      this.boolValue = true;
    },

    async update(row) {
      instanceOfItem = row
      console.log(instanceOfItem);
      console.log('Pencil button clicked')
      this.id = row.id;
      this.customer_id = row.customer_id;
      this.customer_name = row.customer_name;
      this.boolValue = false;
      this.dialog = true;
      this.submitButton = false;

    },

    async edit() {
      console.log("Update button clicked")
      console.log(instanceOfItem)
      instanceOfItem.id = this.id
      instanceOfItem.customer_id = this.customer_id
      instanceOfItem.customer_name = this.customer_name
      await axios.put(`${process.env.VUE_APP_PUT_LINK}/${instanceOfItem.id}`, {
        customer_id: this.customer_id,
        customer_name: this.customer_name
      });
      this.$refs.form.reset()
      this.read()
      this.dialog = false;
    },


    async deleteData(id) {
      await axios.delete(`${process.env.VUE_APP_DELETE_LINK}/${id}`);
      this.read();
    },

    async serachEmpDataReciever(input) {
      const searchPromise = await axios.post('http://127.0.0.1:3333/searchCustomerData', { 'term': input })
      this.customerTable = searchPromise.data.newSearchData
      console.log(input)
    },

    async SortAscending(val) {
      console.log('Up button clicked')
      console.log(val)
      axios.post(`http://127.0.0.1:3333/sortCustomerDataAsc`, {
        columnName: val
      }).then(response => {
        this.customerTable = response.data.sort
      })
    },

    async SortDescending(val) {
      console.log('Down button clicked')
      axios.post(`http://127.0.0.1:3333/sortCustomerDataDesc`, {
        columnName: val
      }).then(response => {
        this.customerTable = response.data.sort
      })
    },


  },

}
</script>
