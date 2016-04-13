
function ViewModelHlaseniNove() {
    var self = this;
    
    //self.hlaseni = ko.observable( { hlavicka: {}, polozky: [] } );
    self.hlavicka = ko.observable({});
    self.polozky = ko.observableArray([]);
    
    self.pridatPolozku = function() {
        self.polozky.push({
            typPohybuLP: "",
            typOdberateleLP: "",
            kodSUKL: "",
            nazev: "",
            mnozstvi: 0,
            sarze: "",
        });
    };

    self.odstranitPolozku = function(polozka){
        self.polozky.remove(polozka);
    };

    self.ulozitHlaseni = function() {
        var data = {
            hlaseni: {
                hlavicka: self.hlavicka(),
                polozky: self.polozky()
            }
        };

        $.ajax({
            type: 'POST',
            data: data,
            url: '/sukl/hlaseni',
            dataType: 'JSON'
        }).done(function( response ) {
            if(response.zprava == 'OK'){
                self.hlavicka({});
                self.polozky([]);
            }
            else{
                alert(responze.zprava);
            }
        });
    };
    
    self.init = function(){
        
    };
}

// JavaScript Pattern: Immediately-Invoked-Function-Expressions (IIFE)
$(function () {
    var viewModel = new ViewModelHlaseniNove();
    ko.applyBindings(viewModel);
    viewModel.init();
});

