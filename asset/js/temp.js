new Vue({
  el: '#app',
  data() {
    return {
      pack: null,
      date: null,
      temper: null,
      errors: [],
    }
  },
  mounted() {
    this.getTemp();
    idnew = null;
  },
  methods: {
    getTemp: function () {
      axios.get("https://raw.githubusercontent.com/shamshadpattani/helloworld/master/weather").then(response => (
        this.pack = response.data
      ))

    },



    checkForm: function (e) {
      if (this.temper && this.date) {
        this.postTemp();
      }

      this.errors = [];

      if (!this.temper) {
        this.errors.push('Temperature required.');
        // e.preventDefault();
      }
      if (!this.date) {
        this.errors.push('Date required.');
        // e.preventDefault();
      }

      e.preventDefault();

    },

    dateConvert: function (utc) {
      // this.value=this.date
      return (moment(utc).utcOffset("+05:30").format("DD-MMM-YYYY"));
    },

    postTemp: function () {



      var pdata = {
        "datetime": moment(this.date).format(),
        "tempCelsius": this.temper
      }

      axios.post('https://oneconnect-api.oneviewitsolutions.com:9443/temperature', pdata,
        {
          headers: {
            'content-type': 'application/json'
          }
        })
        .then((res) => {
          this.getTemp();
          this.date=null;
          this.temper=null;
        })


    },

    updateRecord: function () {
      console.log(this.idnew)

      var pdata = {
        "id": this.idnew,
        "datetime": moment(this.date).format(),
        "tempCelsius": this.temper
      }

      axios.put('https://oneconnect-api.oneviewitsolutions.com:9443/temperature', pdata,
        {
          headers: {
            'content-type': 'application/json'
          }
        })
        .then((res) => {
          console.log(res)
          this.getTemp();
          this.temper=null;
          this.data=null;
        })

       
    },
    getId: function (id, d, t) {
      this.idnew = id;
      this.temper = t;
      this.date = moment(d).utcOffset("+05:30").format("YYYY-MM-DD");



    },

    deleteRecord: function () {
      console.log(this.idnew)

      axios.delete('https://oneconnect-api.oneviewitsolutions.com:9443/temperature/' + this.idnew)
        .then((res) => {
          console.log(res);
          this.getTemp();
        })


    }

  }



})