<template>
    <v-container>
        <v-card>
            <v-card-title>Search Employee</v-card-title>
            <v-row>
                <v-col>
                    <v-text-field outlined v-model="searchField" v-on:keyup="searchEmployeeData(searchField)" label="Search"></v-text-field>
                </v-col>
                <v-col>
                    <!-- <v-btn @click="searchEmployeeData()" right>
                        search
                    </v-btn> -->
                </v-col>
            </v-row>
        </v-card>
    </v-container>  
</template>
<script>
import axios from 'axios'


export default {
    name: 'SearchComponent',
    data() {
        return {
            searchField: '',
        }
    },
    methods: {
        async searchEmployeeData() {
            console.log(this.searchField)
            await axios.post(`http://127.0.0.1:3333/searchCustomerData`, { term: this.searchField }).then((response)=>{
                this.$emit("empDataSender",response)
            })
            
        }
    }
}
</script>