<template>
    <v-container>
        <v-card>
            <v-row>
                <v-col>
                    <v-text-field outlined v-model="searchField" v-on:keyup="searchEmployeeData()" label="Search"></v-text-field>
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
            this.$emit('empDataSender',this.searchField)
            
        }
    }
}
</script>