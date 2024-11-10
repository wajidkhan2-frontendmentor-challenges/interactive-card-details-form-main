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
            if (this.holderName.inputText == "")
            {
                this.holderName.inputError = false;
            } else {
                this.holderName.inputTextS = this.holderName.inputText
            }
        },

        'cardNumber.inputText'() {
            let str = this.cardNumber.inputText;
            let strlength = str.length;
            let splitOn = 4;
            let splitss = parseInt(strlength / splitOn);

            let jump = 0;
            console.log(splitss)
            this.cardNumber.inputTextS = "";
            for (let i = 0; i < splitss; i++)
            {
                console.log(str.substring(jump , jump + splitOn), `(${i})`);
                this.cardNumber.inputTextS += str.substring(jump , jump + splitOn);
                this.cardNumber.inputTextS += " ";
                jump += splitOn;
            }
        }
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

            this.holderName.inputError = false;
            if (this.holderName.inputText == "")
            {
                this.holderName.inputError = true;
                this.holderName.inputErrorMsgD = "Can't be blank";
                errorCount++
            }
        }
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




