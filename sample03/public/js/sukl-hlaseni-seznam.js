/**
 * sukl-hlaseni-seznam.js
 */

function ViewModelHlaseniSeznam() {
    var self = this;
    
    self.seznam = ko.observableArray( [] );
    self.hlaseni = ko.observable( { hlavicka: {}, polozky: {} } );
    
    self.vymazatHlaseni = function(item){
        sukl.services.cliHlaseni.vymazatHlaseni(item.id, function(err, res){
            if(res){
                self.nactiSeznam();
            }
            else{
                alert(res.zprava);
            }
        });
    };
    
    self.nactiHlaseni = function(item){
        sukl.services.cliHlaseni.nactiHlaseni(item, function(err, res){
            if(res){
                self.hlaseni(res.data);
            }
            else{
                alert(res.zprava);
            }
        });
    };
    
    self.nactiSeznam = function(){
        sukl.services.cliHlaseni.nactiSeznam(function(err, res){
            if(res){
                self.seznam(res.data);
                
                var pocet = self.seznam().length;
                if(pocet > 0)
                    self.nactiHlaseni(self.seznam()[0]);
                else
                    self.hlaseni( { hlavicka: {}, polozky: {} } );
            }
            else{
                alert(res.zprava);
            }
        });
    };
    
    self.obnovitSeznamHlaseni = function(){
        sukl.services.cliHlaseni.obnovitSeznamHlaseni(function(err, res){
            if(res){
                self.seznam(res.data);
                
                var pocet = self.seznam().length;
                if(pocet > 0)
                    self.nactiHlaseni(self.seznam()[0]);
                else
                    self.hlaseni( { hlavicka: {}, polozky: {} } );
            }
            else{
                alert(res.zprava);
            }
        });
    };
    
    self.init = function(){
        self.nactiSeznam();
    };
}

// JavaScript Pattern: Immediately-Invoked-Function-Expressions (IIFE)
$(function () {
    var viewModel = new ViewModelHlaseniSeznam();
    ko.applyBindings(viewModel);
    viewModel.init();
});

