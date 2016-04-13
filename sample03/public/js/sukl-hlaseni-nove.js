
function ViewModelHlaseniNove() {
    var self = this;
    
    self.hlaseni = ko.observable( { hlavicka: {}, polozky: {} } );
    
    self.init = function(){
        
    }
}

// JavaScript Pattern: Immediately-Invoked-Function-Expressions (IIFE)
$(function () {
    var viewModel = new ViewModelHlaseniNove();
    ko.applyBindings(viewModel);
    viewModel.init();
});

