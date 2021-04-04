new Vue({
    el: '#app',
    data() {
        return {

            details: null,

        }
    },
    mounted() {
        this.month = [];
        this.getTemp();
        // this.getTemp = [];  
    },
    methods: {

  getTemp: function () {
            axios.get("https://raw.githubusercontent.com/shamshadpattani/helloworld/master/weather").then(response => (
                this.details = response.data
            ))
        }
    },})

