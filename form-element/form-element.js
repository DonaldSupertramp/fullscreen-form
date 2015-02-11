var element = (function(){

    var self = this;

    var component;

    return{

        publish: {
            required: false,
            fieldtype: '',
            label: ''
        },

        ready: function(){

            var self = this;
            component = this;

            this.state = '';

            var ready = new CustomEvent('input::ready',{detail:this});
            document.dispatchEvent(ready);
        },

        toggleActive: function(){

            if(this.state === 'active'){
                this.state = '';
                this.value = '';
            }
            else{
                this.state = 'active';
            }

        },

        submit: function(e){

            if(e.keyCode === 13){
                var submitEvent = new CustomEvent('input::submit');
                document.dispatchEvent(submitEvent);
            }
        },

        setFocus: function(){
            this.$.input.focus();
        },

        getValue: function(){
            return{
                label: this.label,
                value: this.value
            };
        },

        isValid: function () {
            return !!(this.value || !this.required);
        }
    }

})();

Polymer('form-element',element);
