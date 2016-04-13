/**
 * sukl-hlaseni-nove.js
 */

function ViewModelHlaseniNove() {
    var self = this;
    
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

        sukl.services.cliHlaseni.ulozitHlaseni(data, function(err, res){
            if(res){
                self.hlavicka({});
                self.polozky([]);
            }
            else{
                alert(res.zprava);
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

