import { createApp } from './vue@3/vue.esm-browser.js'

createApp({
    data() {
        return {
            AliveMsg: "",
            successMessage: false,

            holderName: {
                reef: "holderNameInput",
                inputText: "",
                inputTextS: "Holder Name",
                inputError: false,
                inputErrorMsgD: ""
            },

            cardNumber: {
                reef: "cardNumberInput",
                inputText: "",
                inputTextS: "0000 0000 0000 0000",
                inputError: false,
                inputErrorMsgD: ""
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
                inputErrorMsgD: ""
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

            this.cardNumber.inputTextS = "";
            this.cardNumber.inputError = false;
            if (str.split(" ").length > 1) { 
                this.cardNumber.inputError = true;
                this.cardNumber.inputTextS = "0000 0000 0000 0000";
                this.cardNumber.inputErrorMsgD = "Wrong formate, Number only";
                this.SpeakAlive(this.cardNumber.inputErrorMsgD);
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
                this.SpeakAlive(this.cardNumber.inputErrorMsgD);
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
            let errorInputs =  new Object;

            if (this.holderName.inputText == "") {

                this.holderName.inputError = true;
                this.holderName.inputErrorMsgD = "Can't be blank";
                errorCount++;
                errorInputs[this.holderName.reef] = {ref: this.holderName.reef, msg: "holder Name Can't be blank"};

            } else { this.holderName.inputError = false; }

            if (this.cardNumber.inputText == "") {

                this.cardNumber.inputError = true;
                this.cardNumber.inputTextS = "0000 0000 0000 0000";
                this.cardNumber.inputErrorMsgD = "Can't be blank";
                errorInputs[this.cardNumber.reef] = {ref: this.cardNumber.reef , msg: "card Number Can't be blank"};
                errorCount++;

            } else if (this.cardNumber.inputText.length < 16) {
                this.cardNumber.inputError = true;
                this.cardNumber.inputErrorMsgD = "must be 16 characters";
                errorInputs[this.cardNumber.reef] = {ref: this.cardNumber.reef , msg: "card Number must be 16 characters"};
                errorCount++;

            } else if (this.cardNumber.inputError == true) {

                errorInputs[this.cardNumber.reef] = {ref: this.cardNumber.reef , msg: this.cardNumber.inputErrorMsgD};
                errorCount++;

            } else { this.cardNumber.inputError = false; }




            if (this.date.month.inputText == "" && 
            typeof  this.date.month.inputText == "string") {

                this.date.month.inputTextS = "00";
                this.date.month.inputError = true;
                this.date.inputErrorMsgD = "Month Can't be Blank";
                errorInputs[`${this.date.month.reef}${this.date.year.reef}`] = {ref: this.date.month.reef , msg: "Month Can't be Blank"};
                errorCount++;

            } else if (this.date.month.inputError == true) {

                this.date.month.inputTextS = "00";
                this.date.month.inputError = true;
                this.date.inputErrorMsgD = "Invalid Month";
                errorInputs[`${this.date.month.reef}${this.date.year.reef}`] = {ref: this.date.month.reef , msg: "Invalid Month"};
                errorCount++;

            }

            if (this.date.year.inputText == "" && 
            typeof  this.date.year.inputText == "string") {

                this.date.year.inputTextS = "00";
                this.date.year.inputError = true;
                this.date.inputErrorMsgD = "Year Can't be Blank";
                errorInputs[`${this.date.month.reef}${this.date.year.reef}`] = {ref: this.date.year.reef , msg: "Year Can't be Blank"}
                errorCount++;

            } else if (this.date.year.inputError == true) {

                this.date.year.inputTextS = "00";
                this.date.year.inputError = true;
                this.date.inputErrorMsgD = "Invalid Year";
                errorInputs[`${this.date.month.reef}${this.date.year.reef}`] = {ref: this.date.year.reef , msg: "Invalid Year"};
                errorCount++;
            }

            if ( (this.date.month.inputText == "" && 
            typeof  this.date.month.inputText == "string") && 
            (this.date.year.inputText == "" && 
            typeof  this.date.year.inputText == "string") ) {

                this.date.inputErrorMsgD = "Year and Month Can't be Blank";
                errorInputs[`${this.date.month.reef}${this.date.year.reef}`] = {ref: this.date.month.reef , msg: "Month and Year Can't be Blank"}
                
            } else if (this.date.month.inputError == true && this.date.year.inputError == true) {

                this.date.inputErrorMsgD = "Invalid Month and Year";
                errorInputs[`${this.date.month.reef}${this.date.year.reef}`] = {ref: this.date.month.reef , msg: "Invalid Month and Year"}

            }

            if (this.cvcNum.inputText == ""){

                this.cvcNum.inputError = true;
                this.cvcNum.inputErrorMsgD = "Can't be Blank";
                errorInputs[this.cvcNum.reef] = {ref: this.cvcNum.reef , msg: "CVC Can't be Blank"}
                errorCount++;

            }

            if (errorCount == 0) {
                this.AliveMsg = ".";
                this.successMessage = true;
                this.$refs.form_fields.focus()
            } else {

                const keys = Object.keys(errorInputs);
                this.SpeakAlive(errorInputs[keys[0]].msg);
                this.$refs[errorInputs[keys[0]].ref].focus();

            }
        },

        onContinue() {
            this.AliveMsg = ""

            this.holderName.inputText = "";
            this.holderName.inputTextS = "Holder Name";
            this.holderName.inputError = false;
            this.holderName.inputErrorMsgD = "";

            this.cardNumber.inputText = "";
            this.cardNumber.inputTextS = "0000 0000 0000 0000";
            this.cardNumber.inputError = false;
            this.cardNumber.inputErrorMsgD = "";

            this.date.month.inputText = "";
            this.date.month.inputTextS = "00";
            this.date.month.inputError = false;
            this.date.month.inputErrorMsgD = "";

            this.date.year.inputText = "";
            this.date.year.inputTextS = "00";
            this.date.year.inputError = false;
            this.date.year.inputErrorMsgD = "";

            this.date.focused = "";
            this.date.inputErrorMsgD = "";

            this.cvcNum.inputText = "";
            this.cvcNum.inputTextS = "000";
            this.cvcNum.inputError = false;
            this.cvcNum.inputErrorMsgD = "";

            this.successMessage = false;
            this.$refs.form_fields.focus()
        },

        checkMonthYear() {
            this.date.inputErrorMsgD = "";
            let bothError = 0;

            // this.SpeakAlive();

            this.date.month.inputError = false;
            if (this.date.month.inputText == "" && 
            typeof  this.date.month.inputText == "string") {

                this.date.month.inputTextS = "00";
                this.date.month.inputError = false;

            } else if (this.date.month.inputText < 1 || this.date.month.inputText > 12) {

                this.date.month.inputTextS = "00";
                this.date.month.inputError = true;
                this.date.inputErrorMsgD = "Invalid Month";
                this.SpeakAlive(this.date.inputErrorMsgD);
                bothError++;

            } else { this.date.month.inputTextS = this.fancyNumber(this.date.month.inputText); }

            this.date.year.inputError = false;
            if (this.date.year.inputText == "" && 
            typeof  this.date.year.inputText == "string") {

                this.date.year.inputTextS = "00";
                this.date.year.inputError = false;

            } else if (this.date.year.inputText < 1 || this.date.year.inputText > 99) {

                this.date.year.inputTextS = "00";
                this.date.year.inputError = true;
                this.date.inputErrorMsgD = "Invalid Year";
                this.SpeakAlive(this.date.inputErrorMsgD);
                bothError++;

            } else { this.date.year.inputTextS = this.fancyNumber(this.date.year.inputText); }
            
            if (this.date.focused != "") { this.$refs[this.date.focused].focus(); }
            if (bothError == 2) { this.date.inputErrorMsgD = "Invalid Month and Year"; this.SpeakAlive(this.date.inputErrorMsgD); }
            
        },

        fancyNumber(Num) {
            var str = "" + Num;
            var pad = "00";
            var ans = pad.substring(0, pad.length - str.length) + str;
            return ans;
        },
        SpeakAlive(msg) {
            if (this.AliveMsg == msg) {
                this.AliveMsg = msg + ".";
            } else { this.AliveMsg = msg  }
        }
    },

    mounted() {
        // todo    
    }

}).mount('#app')



































































