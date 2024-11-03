import { createApp } from './vue@3/vue.esm-browser.js'

createApp({
    data() {
        return {
            holderName: "",
            holderNameError: false,
            holderNameErrorMsgD: "", 

            cardNumber: "",
            cardNumberS: "0000 0000 0000 0000",
            // cardNumber: "959164896389101E",
            // cardNumberS: "9591 6489 6389 101E",
            cardNumberError: false,
            cardNumberErrorMsgD: "",
            
            cvcNum: "000",

            month: "",
            monthS: "00",
            year: "",
            yearS: "00",
            monthYearError: false,
            monthYearErrorMsgD: "",

            errorMsgBlank: "Can't be blank",
            errorMsgMoreCharacter: "Can't be more then 16 characters"
        }
    },

    watch: {
        cardNumber() {

            let value = this.cardNumber;
            // this.cardNumber = value;
            let value_length = value.length;
            let spaces = parseInt(value_length / 4);
            console.log(value_length, spaces);

            this.cardNumberError = false;
            if ( value_length > 0 && value_length <= 16 ){
                this.cardNumberS = '';
                let j = 0;
                for (let i = 0; i < value_length; i++)
                {
                    if ( j == 4 ){
                        this.cardNumberS += " "
                        this.cardNumberS += this.cardNumber[i];
                        j = 0;
                    } else {
                        this.cardNumberS += this.cardNumber[i];
                    }
                    j++;
                    // this.cardNumberS = this.cardNumber;
                }
            } else {
                this.cardNumberS = "0000 0000 0000 0000";
                this.cardNumberError = true;
                this.cardNumberErrorMsgD = this.errorMsgMoreCharacter;
            }
        },
        month() { this.checkMonthYear(); },
        year() { this.checkMonthYear(); }
        // month() {
        //     this.monthYearError = false;

        //     console.log(typeof this.month)

        //     if (this.month > 0 && this.month <= 12)
        //     {
        //         if (this.month < 10 && this.month > 0)
        //         {
        //             this.monthS = "0";
        //             this.monthS += this.month;
        //         } else { 
        //             this.monthS = this.month;
        //         }
        //         console.log("car")
        //         // if (this.month == "" && this.month == 0)
        //         // {
        //         //     this.monthS = "00";
        //         // }
        //     } else if (this.month == "" && typeof this.month == "string") {
        //         this.monthS = "00";
        //         this.monthYearError = false;
        //         console.log("bike")
        //     } else {
        //         this.monthYearError = true;
        //         this.monthYearErrorMsgD = "invalid month";
        //         console.log("truck")
        //     }
        // },

        // year() {
        //     if (this.year == "" && this.year == "string")
        //     {
        //         this.yearS = "00";
        //     }
        // }
    },

    created() {
        let todo = 'todo';
    },
    computed: {

    },
    methods: {
        onFSubmite(E) {
            E.preventDefault();

            if (this.holderName == ""){
                this.holderNameErrorMsgD = this.errorMsgBlank;
                this.holderNameError = true;
            }
        },

        fancyNumber(Num) {
            var str = "" + Num
            var pad = "00"
            var ans = pad.substring(0, pad.length - str.length) + str
            return ans;
        },

        checkMonthYear() {
            this.monthYearError = false

            let monthEmpty = false;
            let monthInvalid = false;
            if (this.month == "" && typeof this.month == "string"){
                monthEmpty = true;
                this.monthS = "00";
            } else if ( this.month < 1 || this.month > 12 ) {
                monthInvalid = true;
            }
            
            if (monthInvalid == true) {
                this.monthYearError = true;
                this.monthYearErrorMsgD = "invalid month";
            } else {
                this.monthS = this.fancyNumber(this.month) 
                console.log(this.fancyNumber(this.month), this.monthS)
            }

            let yearEmpty = false;
            let yearInvalid = false;
            if (this.year == "" && typeof this.year == "string"){
                yearEmpty = true;
                this.yearS = "00";
            } else if (this.year < 1 || this.year > 99) {
                yearInvalid = true;
            }

            if (yearInvalid == true) {
                this.monthYearError = true;
                this.monthYearErrorMsgD = "invalid year";
            } else {
                this.yearS = this.fancyNumber(this.year);
            }

            if (monthInvalid == true && yearInvalid == true)
            {
                this.monthYearError = true;
                this.monthYearErrorMsgD = "invalid month and year";
            }
        },
    },

    mounted() {
        // todo    
    }

}).mount('#app')






























// createApp({
//     data() {
//         return {
//             todo: 'todo',

//             views_data: {
//                 selected_view: "stp_1",
//                 key: 1,

//                 views: {
//                     stp_1: { name: "stp_1", key:1, active: true, error: false } ,
//                     stp_2: { name: "stp_2", key:2, active: false, error: true } ,
//                     stp_3: { name: "stp_3", key:3, active: false, error: true } ,
//                     stp_4: { name: "stp_4", key:4, active: false, error: true } ,
//                 },

//                 checkers: '',

//                 fields: {
//                     stp_1: {
//                         user_name: 'yes',
//                         user_name_error: false,

//                         email_eddress: 'yes',
//                         email_eddress_error: false,
                        
//                         phone_number: 'yes',
//                         phone_number_error: false,
//                     },

//                     stp_2: {
//                         yearly: false,
//                         selected: "Arcade",

//                         options: {
//                             Arcade: {
//                                 name: "Arcade",
//                                 price: 9,
//                                 time: "mo",
                                
//                                 per_month: {
//                                     price: 9,
//                                     time: "mo"
//                                 },
//                                 per_year: {
//                                     price: 90,
//                                     time: "yr"
//                                 }
//                             },
    
//                             Advanced: {
//                                 name: "Advanced",
//                                 price: 12,
//                                 time: "mo",
                                
//                                 per_month: {
//                                     price: 12,
//                                     time: "mo"
//                                 },
//                                 per_year: {
//                                     price: 120,
//                                     time: "yr"
//                                 }
//                             },
    
//                             Pro: {
//                                 name: "Pro",
//                                 price: 15,
//                                 time: "mo",
                                
//                                 per_month: {
//                                     price: 15,
//                                     time: "mo"
//                                 },
//                                 per_year: {
//                                     price: 150,
//                                     time: "yr"
//                                 }
//                             }
//                         }
//                     },

//                     stp_3: {
//                         Online_service: {
//                             checked: false,
//                             name: "Online service",
//                             price: 1,
//                             time: "mo",
//                             per_month: {
//                                 price: 1,
//                                 time: "mo"
//                             },
//                             per_year: {
//                                 price: 10,
//                                 time: "yr"
//                             }
//                         },
//                         Larger_storage: {
//                             checked: false,
//                             name: "Larger storage",
//                             price: 2,
//                             time: "mo",
//                             per_month: {
//                                 price: 2,
//                                 time: "mo"
//                             },
//                             per_year: {
//                                 price: 20,
//                                 time: "yr"
//                             }
//                         },
//                         Customizable_Profile: {
//                             checked: false,
//                             name: "Customizable Profile",
//                             price: 2,
//                             time: "mo",
//                             per_month: {
//                                 price: 2,
//                                 time: "mo"
//                             },
//                             per_year: {
//                                 price: 20,
//                                 time: "yr"
//                             }
//                         }
//                     },
                    
//                     stp_4: {
//                         plan: {
//                             name: "",
//                             price: 0,
//                             time: "",
//                         },
//                         add_ons: [],
//                         total: 0,
//                     }
//                 }
//             },

//         }
//     },
//     created() {
//         let todo = 'todo';
//     },
//     computed: {

//     },
//     methods: {

//         // responsible for switching views
//         switch_view(event){

//             // get the target element
//             let Element = event.target.closest("a.link");
            
//             // check if target element key is greater then currnet view key
//             if (Element.dataset.stpkey > this.views_data.key) {

//                 // call check function for current view to check for error
//                 this.views_data.checkers[this.views_data.selected_view]();

//                 // if error for current view is false
//                 if (this.views_data.views[this.views_data.selected_view].error == false) {

//                     // change the view
//                     this.views_data.views[this.views_data.selected_view].active = false ;
//                     this.views_data.views[Element.dataset.stpname].active = true;
//                     this.views_data.selected_view = Element.dataset.stpname;
//                     this.views_data.key = Element.dataset.stpkey;

//                     console.log(this.views_data.views[Element.dataset.stpname])
//                 }
//                 // else dont change view
            
//             // else if target element key is less then currnet view key
//             } else {
                
//                 // just change view
//                 this.views_data.views[this.views_data.selected_view].active = false ;
//                 this.views_data.views[Element.dataset.stpname].active = true;
//                 this.views_data.selected_view = Element.dataset.stpname;
//                 this.views_data.key = Element.dataset.stpkey;
//                 console.log(this.views_data.views[Element.dataset.stpname])
//             }
//             console.log(Element)

//             if (this.views_data.selected_view ==  this.views_data.views.stp_4.name) {

//                 this.views_data.fields.stp_4.plan.name = this.views_data.fields.stp_2.options[this.views_data.fields.stp_2.selected].name;
//                 this.views_data.fields.stp_4.plan.price = this.views_data.fields.stp_2.options[this.views_data.fields.stp_2.selected].price;
//                 this.views_data.fields.stp_4.plan.time = this.views_data.fields.stp_2.options[this.views_data.fields.stp_2.selected].time;
                
//                 let add_ons_keys = Object.keys(this.views_data.fields.stp_3)

//                 this.views_data.fields.stp_4.total = this.views_data.fields.stp_2.options[this.views_data.fields.stp_2.selected].price;
//                 this.views_data.fields.stp_4.add_ons = [];
//                 for (let key of add_ons_keys){
                    
//                     if (this.views_data.fields.stp_3[key].checked == true)
//                     {
//                         this.views_data.fields.stp_4.total += this.views_data.fields.stp_3[key].price;
//                         this.views_data.fields.stp_4.add_ons.push({
//                             name: this.views_data.fields.stp_3[key].name,
//                             price: this.views_data.fields.stp_3[key].price,
//                             time: this.views_data.fields.stp_3[key].time,
//                         })
//                     }
//                     // this.views_data.fields.stp_3[key].price = this.views_data.fields.stp_3[key].per_year.price
//                     // this.views_data.fields.stp_3[key].time = this.views_data.fields.stp_3[key].per_year.time
//                 }
//                 // plan: {
//                 //     name: "",
//                 //     price: 0,
//                 //     time: "",
//                 // },
//                 // add_ons: [],
//                 // total: 0,
//             }
//         },

//         // todo
//         check_stp_1() { 
//             let errors = 0;

//             if (this.views_data.fields.stp_1.user_name == "")
//             {
//                 this.views_data.fields.stp_1.user_name_error = true;
//                 errors++
//             } else { this.views_data.fields.stp_1.user_name_error = false; }

//             if (this.views_data.fields.stp_1.email_eddress == "")
//             {
//                 this.views_data.fields.stp_1.email_eddress_error = true;
//                 errors++
//             } else { this.views_data.fields.stp_1.email_eddress_error = false; }

//             if (this.views_data.fields.stp_1.phone_number == "")
//             {
//                 this.views_data.fields.stp_1.phone_number_error = true;
//                 errors++
//             } else { this.views_data.fields.stp_1.phone_number_error = false; }
            
//             if ( errors > 0 ){
//                 this.views_data.views.stp_1.error = true;
//             } else { this.views_data.views.stp_1.error = false }

//         },
//         check_stp_2() { 

//             console.log("check_stp_2"); 
//             let errors = 0;

//             if (this.views_data.fields.stp_2.selected == "")
//             {
//                 this.views_data.views.stp_2.error = true
//             } else { this.views_data.views.stp_2.error = false }

//         },

//         check_stp_3() { console.log("check_stp_3"); this.views_data.views.stp_3.error = false },
        
//         check_stp_4() { console.log("check_stp_4"); this.views_data.views.stp_4.error = true },

//         // dienamic
//         // step 2
//         timing_on_change(e) {
//             let Element = e.target;
//             console.log(Element.id)

//             // console.log(Object.keys(this.views_data.fields.stp_3))
//             let plan_keys = Object.keys(this.views_data.fields.stp_2.options)
//             let add_ons_keys = Object.keys(this.views_data.fields.stp_3)
//             if (Element.id == "monthly") 
//             {
//                 for (let key of plan_keys){
//                     this.views_data.fields.stp_2.options[key].price = this.views_data.fields.stp_2.options[key].per_month.price
//                     this.views_data.fields.stp_2.options[key].time = this.views_data.fields.stp_2.options[key].per_month.time
//                 }

//                 this.views_data.fields.stp_2.yearly = false
 
//                 for (let key of add_ons_keys){
//                     this.views_data.fields.stp_3[key].price = this.views_data.fields.stp_3[key].per_month.price
//                     this.views_data.fields.stp_3[key].time = this.views_data.fields.stp_3[key].per_month.time
//                 }
//             }
//             if (Element.id == "yearly") 
//             {   
//                 for (let key of plan_keys){
//                     this.views_data.fields.stp_2.options[key].price = this.views_data.fields.stp_2.options[key].per_year.price
//                     this.views_data.fields.stp_2.options[key].time = this.views_data.fields.stp_2.options[key].per_year.time
//                 }
   
//                 this.views_data.fields.stp_2.yearly = true

//                 for (let key of add_ons_keys){
//                     this.views_data.fields.stp_3[key].price = this.views_data.fields.stp_3[key].per_year.price
//                     this.views_data.fields.stp_3[key].time = this.views_data.fields.stp_3[key].per_year.time
//                 }
//             }
//         }
//     },

//     mounted() {
//         this.views_data.checkers = {
//             stp_1: this.check_stp_1,
//             stp_2: this.check_stp_2,
//             stp_3: this.check_stp_3,
//             stp_4: this.check_stp_4,
//         }

//         // console.log(
//         //     Object.values(this.views_data.views)[0].name
//         // )
//         // this.views_data.views.key(0)
//     }

// }).mount('#app')




