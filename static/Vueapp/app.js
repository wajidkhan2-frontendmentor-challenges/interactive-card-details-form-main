import { createApp } from './vue@3/vue.esm-browser.js'

createApp({
    data() {
        return {
            successMessage: false,
            holderName: {
                reef: "holderNameInput",
                inputText: "",
                inputTextS: "Holder Name",
                inputError: false,
                inputErrorMsgD: "awdwad"
            },

            cardNumber: {
                reef: "cardNumberInput",
                inputText: "",
                inputTextS: "0000 0000 0000 0000",
                inputError: false,
                inputErrorMsgD: "awdaw"
            },

            date: {
                focused: "",

                month: {
                    reef: "monthInput",
                    inputText: "",
                    inputTextS: "00",
                    inputError: false,
                },

                year: {
                    reef: "yearInput",
                    inputText: "",
                    inputTextS: "00",
                    inputError: false,
                },

                inputErrorMsgD: ""
            },

            cvcNum: {
                reef: "cvcNumInput",
                inputText: "",
                inputTextS: "000",
                inputError: false,
                inputErrorMsgD: "adwad"
            },
        }
    },

    watch: {
        'holderName.inputText'() {
            this.holderName.inputError = false;
            this.holderName.inputTextS = "";
            if (this.holderName.inputText == "") {
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
                this.cardNumber.inputTextS = "0000 0000 0000 0000";
                this.cardNumber.inputErrorMsgD = "Wrong formate, Number only";
                this.$refs[this.cardNumber.reef].focus();
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
                this.cardNumber.inputTextS = "0000 0000 0000 0000";
                this.cardNumber.inputErrorMsgD = "value must be 16 characters";
                this.$refs[this.cardNumber.reef].focus();
            }
            
        },

        'date.month.inputText'() { this.checkMonthYear(); },
        'date.year.inputText'() { this.checkMonthYear(); },

        'cvcNum.inputText'() { 
            this.cvcNum.inputError = false;
            this.cvcNum.inputTextS = "";
            if (this.cvcNum.inputText == "") {
                this.cvcNum.inputError = false;
                this.cvcNum.inputTextS = "000";
            } else {
                this.cvcNum.inputTextS = this.cvcNum.inputText;
            }
        }

    },

    created() {
        // pass
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
            let errorInputs = [];

            if (this.holderName.inputText == "") {
                this.holderName.inputError = true;
                this.holderName.inputErrorMsgD = "Can't be blank";
                errorInputs.push(this.holderName.reef);
                errorCount++;
            } else { this.holderName.inputError = false; }

            if (this.cardNumber.inputText == "") {
                this.cardNumber.inputError = true;
                this.cardNumber.inputTextS = "0000 0000 0000 0000";
                this.cardNumber.inputErrorMsgD = "Can't be blank";
                errorInputs.push(this.cardNumber.reef);
                errorCount++;
            } else if (this.cardNumber.inputError == true) {
                errorInputs.push(this.cardNumber.reef);
                errorCount++;
            } else { this.cardNumber.inputError = false; }


            if (this.date.month.inputText == "" && 
            typeof  this.date.month.inputText == "string") {
                this.date.month.inputTextS = "00";
                this.date.month.inputError = true;
                this.date.inputErrorMsgD = "Month Can't be Blank";
                errorInputs.push(this.date.month.reef);
                errorCount++; 
            } else if (this.date.month.inputError == true) {
                this.date.month.inputTextS = "00";
                this.date.month.inputError = true;
                this.date.inputErrorMsgD = "Invalid Month";
                errorInputs.push(this.date.month.reef);
                errorCount++;
            }

            if (this.date.year.inputText == "" && 
            typeof  this.date.year.inputText == "string") {
                this.date.year.inputTextS = "00";
                this.date.year.inputError = true;
                this.date.inputErrorMsgD = "Year Can't be Blank";
                errorInputs.push(this.date.year.reef);
                errorCount++;
            } else if (this.date.year.inputError == true) {
                this.date.year.inputTextS = "00";
                this.date.year.inputError = true;
                this.date.inputErrorMsgD = "Invalid Year";
                errorInputs.push(this.date.year.reef);
                errorCount++;
            }

            if ( (this.date.month.inputText == "" && 
            typeof  this.date.month.inputText == "string") && 
            (this.date.year.inputText == "" && 
            typeof  this.date.year.inputText == "string") ) {
                this.date.inputErrorMsgD = "Year and Month Can't be Blank";
            }
            
            if (this.cvcNum.inputText == ""){
                this.cvcNum.inputError = true;
                this.cvcNum.inputErrorMsgD = "Can't be Blank";
                errorInputs.push(this.cvcNum.reef);
                errorCount++;
            }

            if (errorCount == 0) {
                this.successMessage = true;
            } else {
                this.$refs[errorInputs[0]].focus();
                console.log(errorInputs)
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
                // this.$refs[this.date.month.reef].focus();
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
                // this.$refs[this.date.year.reef].focus();
                bothError++;
            } else { this.date.year.inputTextS = this.fancyNumber(this.date.year.inputText); }
            
            if (this.date.focused != "") { this.$refs[this.date.focused].focus(); }
            
            if (bothError == 2) { this.date.inputErrorMsgD = "Invalid Month and Year"; }
        },

        fancyNumber(Num) {
            var str = "" + Num;
            var pad = "00";
            var ans = pad.substring(0, pad.length - str.length) + str;
            return ans;
        },

        // check() {
        //     // cardNumber: {
        //     //     inputText: "",
        //     //     inputTextS: "0000 0000 0000 0000",
        //     //     inputError: false,
        //     //     inputErrorMsgD: "awdaw"
        //     // },

        //     this.cardNumber.inputErrorMsgD = "Invalid Month and Year";
        //     this.cardNumber.inputError = true;
        //     const input = this.$refs.CardNumberInput;
        //     input.focus();
        // }

        
    },

    mounted() {
        // todo    
        console.log(this.$refs[this.date.month.reef])
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




