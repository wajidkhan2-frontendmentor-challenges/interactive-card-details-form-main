import { createApp } from './vue@3/vue.esm-browser.js'

createApp({
    data() {
        return {
            successMessage: false,
            holderName: {
                inputText: "",
                inputTextS: "Holder Name",
                inputError: false,
                inputErrorMsgD: "awdwad"
            },

            cardNumber: {
                inputText: "",
                inputTextS: "0000 0000 0000 0000",
                inputError: false,
                inputErrorMsgD: "awdaw"
            },

            cvcNum: {
                inputText: "",
                inputTextS: "000",
                inputError: false,
                inputErrorMsgD: "adwad"
            },

            date: {
                month: {
                    inputText: "",
                    inputTextS: "00",
                    inputError: false,
                },

                year: {
                    inputText: "",
                    inputTextS: "00",
                    inputError: false,
                },

                inputErrorMsgD: "adawdawdawd"
            }
        }
    },

    watch: {
        'holderName.inputText'() {
            this.holderName.inputError = false;
            this.holderName.inputTextS = "";
            if (this.holderName.inputText == "")
            {
                this.holderName.inputError = false;
                this.holderName.inputTextS = "Holder Name";
            } else {
                this.holderName.inputTextS = this.holderName.inputText
            }
        },

        'cardNumber.inputText'() {
            let str = this.cardNumber.inputText;
            let strlength = str.length;
            let splitOn = 4;
            let spacedon = 0

            console.log(strlength)
            this.cardNumber.inputTextS = "";
            this.cardNumber.inputError = false;
            if (str.split(" ").length > 1) { 
                this.cardNumber.inputError = true;
                this.cardNumber.inputTextS = "0000 0000 0000 0000"
                this.cardNumber.inputErrorMsgD = "Wrong formate, Number only"
            } else if (strlength > 0 && strlength <= 16) {
                for (let i = 0; i < strlength; i++)
                {
                    this.cardNumber.inputTextS += this.cardNumber.inputText[i];
                    spacedon++
                    if (spacedon == splitOn) {
                        this.cardNumber.inputTextS += " "
                        spacedon = 0;
                    }
                }
            } else if (str == "") {
                this.cardNumber.inputError = false;
                this.cardNumber.inputTextS = "0000 0000 0000 0000";
                this.cardNumber.inputErrorMsgD = ""
            } else {
                this.cardNumber.inputError = true;
                this.cardNumber.inputTextS = "0000 0000 0000 0000"
                this.cardNumber.inputErrorMsgD = "value must be 16 characters"
            }
            
        },

        'date.month.inputText'() { this.checkMonthYear(); },
        'date.year.inputText'() { this.checkMonthYear(); }

    },

    created() {
        let todo = 'todo';
    },
    computed: {
        dateError(){
            if (this.date.month.inputError == false && this.date.year.inputError == false) {
                return false
            } else {
                return true;
            }
        }
    },
    methods: {
        onFSubmite(E) {
            E.preventDefault();

            let errorCount = 0;

            
            if (this.holderName.inputText == "")
            {
                this.holderName.inputError = true;
                this.holderName.inputErrorMsgD = "Can't be blank";
                errorCount++
            } else { this.holderName.inputError = false; }

            if (this.cardNumber.inputText == "") {
                this.cardNumber.inputError = true;
                this.cardNumber.inputTextS = "0000 0000 0000 0000"
                this.cardNumber.inputErrorMsgD = "Can't be blank"
                errorCount++
            } else if (this.cardNumber.inputError == true) {
                errorCount++
            } else { this.cardNumber.inputError = false; }

            if (errorCount == 0) {
                this.successMessage = true;
            }
        },

        checkMonthYear() {
            this.date.inputErrorMsgD = "";
            let bothError = 0;
            
            this.date.month.inputError = false;
            if (this.date.month.inputText == "" && 
            typeof  this.date.month.inputText == "string") {
                this.date.month.inputTextS = "00";
                this.date.month.inputError = false;
                console.log("yes")
            } else if (this.date.month.inputText < 1 || this.date.month.inputText > 12) {
                this.date.month.inputTextS = "00";
                this.date.month.inputError = true;
                this.date.inputErrorMsgD = "Invalid Month";
                bothError++;
            } else { this.date.month.inputTextS = this.fancyNumber(this.date.month.inputText); }

            this.date.year.inputError = false;
            if (this.date.year.inputText == "" && 
            typeof  this.date.year.inputText == "string") {
                this.date.year.inputTextS = "00";
                this.date.year.inputError = false;
                console.log("yes")
            } else if (this.date.year.inputText < 1 || this.date.year.inputText > 99) {
                this.date.year.inputTextS = "00";
                this.date.year.inputError = true;
                this.date.inputErrorMsgD = "Invalid Year";
                bothError++;
            } else { this.date.year.inputTextS = this.fancyNumber(this.date.year.inputText); }
            
            if (bothError == 2) { this.date.inputErrorMsgD = "Invalid Month and Year"; }
        },

        fancyNumber(Num) {
            var str = "" + Num;
            var pad = "00";
            var ans = pad.substring(0, pad.length - str.length) + str;
            return ans;
        },
    },

    mounted() {
        // todo    
    }

}).mount('#app')










































































// import { createApp } from './vue@3/vue.esm-browser.js'

// createApp({
//     data() {
//         return {
//             successMessage: false,

//             holderName: "",
//             holderNameS: "Holder Name",
//             holderNameError: false,
//             holderNameErrorMsgD: "", 

//             cardNumber: "",
//             cardNumberS: "0000 0000 0000 0000",
//             // cardNumber: "959164896389101E",
//             // cardNumberS: "9591 6489 6389 101E",
//             cardNumberError: false,
//             cardNumberErrorMsgD: "",
            
//             month: "",
//             monthS: "00",
//             year: "",
//             yearS: "00",
//             monthYearError: false,
//             monthYearErrorMsgD: "",

//             cvcNum: "",
//             cvcNumS: "000",
//             cvcNumError: false,
//             cvcNumErrorMsgD: "wadwadwadad",

//             errorMsgBlank: "Can't be blank",
//             errorMsgMoreCharacter: "Can't be more then 16 characters"
//         }
//     },

//     watch: {

//         holderName() {
//             if (this.holderName == "")
//             {
//                 this.holderNameS = "Holder Name";
//             } else {
//                 this.holderNameS = this.holderName;
//             }
//         },

//         cardNumber() {

//             let value = this.cardNumber;
//             // this.cardNumber = value;
//             let value_length = value.length;
//             let spaces = parseInt(value_length / 4);
//             // console.log(value_length, spaces);

//             this.cardNumberError = false;
//             if ( value_length > 0 && value_length <= 16 ){

//                 console.log(value.split(" "))
//                 if (value.split(" ").length > 1 )
//                 {
//                     this.cardNumberS = "0000 0000 0000 0000";
//                     this.cardNumberError = true;
//                     this.cardNumberErrorMsgD = "Wrong formate, Number only";
//                 } else {
                    
//                     this.cardNumberS = '';
//                     let j = 0;
//                     for (let i = 0; i < value_length; i++)
//                     {
//                         if ( j == 4 ){
//                             this.cardNumberS += " "
//                             this.cardNumberS += this.cardNumber[i];
//                             j = 0;
//                         } else {
//                             this.cardNumberS += this.cardNumber[i];
//                         }
//                         j++;
//                         // this.cardNumberS = this.cardNumber;
//                     }
//                 }
//             } else if (this.cardNumber == "") {
//                 this.cardNumberS = "0000 0000 0000 0000";
//                 this.cardNumberError = false;
//             } else {
//                 this.cardNumberS = "0000 0000 0000 0000";
//                 this.cardNumberError = true;
//                 this.cardNumberErrorMsgD = this.errorMsgMoreCharacter;
//             }
//         },
//         month() { this.checkMonthYear(); },
//         year() { this.checkMonthYear(); },

//         cvcNum() {
//             if (this.cvcNum == "")
//             {
//                 this.cvcNumS = "000";
//             } else {
//                 this.cvcNumS = this.cvcNum;
//             }
//         },
//     },

//     created() {
//         let todo = 'todo';
//     },
//     computed: {

//     },
//     methods: {
//         onFSubmite(E) {
//             E.preventDefault();

//             let errorCount = 0
//             if (this.holderName == ""){
//                 this.holderNameErrorMsgD = this.errorMsgBlank;
//                 this.holderNameError = true;
//                 errorCount++;
//             }

//             if (this.cardNumber == "" || this.cardNumber.length < 16){
//                 // pass
//                 this.cardNumberError = true;
//                 this.cardNumberErrorMsgD = "cardNumber adawdwad"
//                 errorCount++;
//             }

//             if (this.month == ""){
//                 // pass
//                 this.monthYearError = true;
//                 this.monthYearErrorMsgD = "month adawdwad"
//                 errorCount++;
//             }

//             if (this.year == ""){
//                 // pass
//                 this.monthYearError = true;
//                 this.monthYearErrorMsgD = "year adwdadwad"
//                 errorCount++;
//             }

//             if (this.cvcNum == ""){
//                 // pass
//                 this.cvcNumError = true;
//                 this.cvcNumErrorMsgD = "cvc awdawdawd";
//                 errorCount++;
//             }

//             this.successMessage = false;
//             if (errorCount == 0)
//             {
//                 this.successMessage = true;
//             }

//         },

//         fancyNumber(Num) {
//             var str = "" + Num
//             var pad = "00"
//             var ans = pad.substring(0, pad.length - str.length) + str
//             return ans;
//         },

//         checkMonthYear() {
//             this.monthYearError = false

//             let monthEmpty = false;
//             let monthInvalid = false;
//             if (this.month == "" && typeof this.month == "string"){
//                 monthEmpty = true;
//                 this.monthS = "00";
//             } else if ( this.month < 1 || this.month > 12 ) {
//                 monthInvalid = true;
//             }
            
//             if (monthInvalid == true) {
//                 this.monthYearError = true;
//                 this.monthYearErrorMsgD = "invalid month";
//             } else {
//                 this.monthS = this.fancyNumber(this.month) 
//                 console.log(this.fancyNumber(this.month), this.monthS)
//             }

//             let yearEmpty = false;
//             let yearInvalid = false;
//             if (this.year == "" && typeof this.year == "string"){
//                 yearEmpty = true;
//                 this.yearS = "00";
//             } else if (this.year < 1 || this.year > 99) {
//                 yearInvalid = true;
//             }

//             if (yearInvalid == true) {
//                 this.monthYearError = true;
//                 this.monthYearErrorMsgD = "invalid year";
//             } else {
//                 this.yearS = this.fancyNumber(this.year);
//             }

//             if (monthInvalid == true && yearInvalid == true)
//             {
//                 this.monthYearError = true;
//                 this.monthYearErrorMsgD = "invalid month and year";
//             }
//         },

//         onContinue() {
            
//             this.holderName = "";
//             this.holderNameS = "Holder Name";
//             this.holderNameError = false;
//             this.holderNameErrorMsgD = "";
            
//             this.cardNumber = "";
//             this.cardNumberS = "0000 0000 0000 0000";
//             this.cardNumberError = false;
//             this.cardNumberErrorMsgD = "";
            
//             this.month = "";
//             this.monthS = "00";
//             this.year = "";
//             this.yearS = "00";
//             this.monthYearError = false;
//             this.monthYearErrorMsgD = "";
            
//             this.cvcNum = "";
//             this.cvcNumS = "000";
//             this.cvcNumError = false;
//             this.cvcNumErrorMsgD = "";

//             this.successMessage = false;
//         }
//     },

//     mounted() {
//         // todo    
//     }

// }).mount('#app')




