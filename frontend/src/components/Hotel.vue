<template>
  <v-container>
    <SearchComponent @empDataSender="serachEmpDataReciever($event)" />
    <template>
      <v-form ref="form" v-model="valid" lazy-validation>
        <v-dialog v-model="dialog" max-width="600px">
          <template v-slot:activator="{ on, attrs }">
            <v-btn class="mb-2" small @click="press()" v-bind="attrs" v-on="on" fab color="indigo">
              <v-icon small>mdi-plus</v-icon>
            </v-btn>
          </template>
          <v-card>
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
                <v-col cols="12" sm="6" md="4">
                  <v-text-field v-model="hotel_name" outlined label="Enter Hotel Name" required>
                  </v-text-field>
                </v-col>
                <v-col cols="12" sm="6" md="4">
                  <v-text-field v-model="door_no" outlined label="Enter Door No" required>
                  </v-text-field>
                </v-col>
                <v-col cols="12" sm="6" md="4">
                  <v-text-field v-model="street" outlined label="Enter Street Name" required>
                  </v-text-field>
                </v-col>
                <v-col cols="12" sm="6" md="4">
                  <v-text-field v-model="landmark" outlined label="Enter Landmark" required>
                  </v-text-field>
                </v-col>
                <v-col cols="12" sm="6" md="4">
                  <v-text-field v-model="city" outlined label="Enter city" required>
                  </v-text-field>
                </v-col>
                <v-col cols="12" sm="6" md="4">
                  <v-text-field v-model="pincode" outlined label="Enter pincode" required>
                  </v-text-field>
                </v-col>
              </v-row>
              <v-btn color="success" v-model="submitButton" @click="submit()" v-if="boolValue">
                Submit
              </v-btn>
              <v-btn color="success" v-model="updateButton" @click="edit()" v-else>
                Update
              </v-btn>
            </v-card-text>
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
                <v-icon @click="SortAscending(val='customer_id')">mdi-arrow-up</v-icon>
                <v-icon @click="SortDescending(val='customer_id')">mdi-arrow-down</v-icon>
              </th>
              <th class="text-left">Hotel Name</th>
              <th class="text-left">Owner</th>
              <th class="text-left">Address</th>
              <th class="text-left">Pincode</th>
              <th class="text-left">Actions</th>

            </tr>
          </thead>
          <tbody>
            <tr v-for="row,index in hotelTable" :key="row.id">
              <td>{{row.id}}</td>
              <td>{{row.customer_id}}</td>
              <td>{{row.hotel_name}}</td>
              <td>{{row.customer_name}}</td>
              <td>{{row.address.door_no + ", " + row.address.street + ", " + row.address.landmark + ", " +
              row.address.city}}</td>
              <td>{{row.pincode}}</td>
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
const axios = require('axios').default;
var instanceOfItem;
export default {
  name: "HotelCrud",
  data() {
    return {
      id: '',
      customer_id: '',
      hotel_name: '',
      door_no: '',
      street: '',
      landmark: '',
      city: '',
      pincode: '',
      hotelTable: [],
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

      axios.get(process.env.VUE_APP_SERVER_URL + `/displayHotelData`).then(response => {

        this.hotelTable = response.data.data

      })

      console.log("Printing hotel table")

      console.log(this.hotelTable)

    },

    async submit() {

      const sub = await axios.post(process.env.VUE_APP_SERVER_URL + `/insertHotelData`, {

        id: this.id,
        customer_id: this.customer_id,
        hotel_name: this.hotel_name,
        door_no: this.door_no,
        street: this.street,
        landmark: this.landmark,
        city: this.city,
        pincode: this.pincode

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

      this.hotel_name = row.hotel_name;

      this.door_no = row.door_no;

      this.street = row.street

      this.landmark = row.landmark

      this.city = row.city

      this.pincode = row.pincode

      this.boolValue = false;

      this.dialog = true;

      this.submitButton = false;

    },

    async edit() {

      console.log("update button clicked")

      console.log(instanceOfItem)

      await axios.put(`http://127.0.0.1:3333/updateHotelData/${instanceOfItem.id}`, {

        customer_id: this.customer_id,
        hotel_name: this.hotel_name,
        door_no: this.door_no,
        street: this.street,
        landmark: this.landmark,
        city: this.city,
        pincode: this.pincode

      });

      this.$refs.form.reset()

      this.read()

      this.dialog = false;

    },


    async deleteData(id) {

      await axios.delete(`http://127.0.0.1:3333/deleteHotelData/${id}`);

      this.read();

    },

    async serachEmpDataReciever(input) {

      const searchPromise = await axios.post(process.env.VUE_APP_SERVER_URL + `/searchHotelData`, { 'term': input })

      this.hotelTable = searchPromise.data

      console.log(input)

    },

    async SortAscending(val) {

      console.log('Up button clicked')

      console.log(val)

      axios.post(process.env.VUE_APP_SERVER_URL + `/sortHotelDataAsc`, {

        columnName: val

      }).then(response => {

        this.hotelTable = response.data

      })
    },

    async SortDescending(val) {

      console.log('Down button clicked')

      axios.post(process.env.VUE_APP_SERVER_URL + `/sortHotelDataDesc`, {

        columnName: val

      }).then(response => {

        this.hotelTable = response.data

      })
    },

  },

}
</script>
