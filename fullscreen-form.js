var element = (function(){

    var self = this;

    var component;

    function saveInputValue(key,val){

        var found = component.results.some(function(item){
            if(item.label === key){
                item.value = val;
                return true;
            }
        });

        if(!found){
            component.results.push({
                label: key,
                value: val
            });
        }

    }

    function handleArrowKeys(e){
        if(e.keyCode === 38) component.prev();
        if(e.keyCode === 40) component.next();
    }


    function bindListener(){
        document.addEventListener('keydown',handleArrowKeys);
        document.addEventListener('input::submit',component.next);
    }

    return{

        ready: function(){

            var self = this;
            component = this;

            this.results = [];

            this.state = {
                currentItem: 0,
                showResults: false
            };

            bindListener();

            this.children[this.state.currentItem].toggleActive();

        },

        prev: function(){

            var self = this;

            this.children[this.state.currentItem].toggleActive();
            this.state.currentItem = this.state.currentItem > 0 ? this.state.currentItem -1 : 0;
            this.children[this.state.currentItem].toggleActive();

            setTimeout(function(){
                self.children[self.state.currentItem].setFocus();
            },150);
        },

        cancel: function(){

            this.results.length = 0;
            this.state.currentItem = 0;
            this.state.showResults = false;

            this.children[this.state.currentItem].toggleActive();

        },

        next: function(){

            if(!component.children[component.state.currentItem].isValid()){
                alert('This field is required. \n Please submit a value first');
                return;
            }

            var data = component.children[component.state.currentItem].getValue();

            saveInputValue(data.label,data.value);

            component.children[component.state.currentItem].toggleActive();

            if(component.state.currentItem == component.children.length - 1){
                component.state.showResults = true;
                return;
            }

            component.state.currentItem++;
            component.children[component.state.currentItem].toggleActive();

            setTimeout(function(){
                component.children[component.state.currentItem].setFocus();
            },150);
        },

        submit: function(){
            var submitEvent = new CustomEvent('fsc::submit',{detail: this.results});
            document.dispatchEvent(submitEvent);
        }
    }

})();

Polymer('fsc-form',element);
