
function ViewModelHlaseniSeznam() {
    var self = this;
    
    self.seznam = ko.observableArray( [] );
    self.hlaseni = ko.observable( { hlavicka: {}, polozky: {} } );
    
    self.vymazatHlaseni = function(item){
        $.ajax({
            type: 'DELETE',
            url: '/sukl/hlaseni/' + item.id,
            dataType: 'JSON'
        }).done(function( response ) {
            if(response.zprava == 'OK'){
                self.nactiSeznam();
            }
        });
    };
    
    self.nactiHlaseni = function(item){
        $.ajax({
            type: 'GET',
            url: '/sukl/hlaseni/' + item.id,
            dataType: 'JSON'
        }).done(function( response ) {
            if(response.zprava == 'OK'){
                self.hlaseni(response.data);
            }
        });
    };
    
    self.nactiSeznam = function(){
        $.ajax({
            type: 'GET',
            url: '/sukl/hlaseni',
            dataType: 'JSON'
        }).done(function( response ) {
            if(response.zprava == 'OK'){
                self.seznam(response.data);
                
                var pocet = self.seznam().length;
                if(pocet > 0)
                    self.nactiHlaseni(self.seznam()[0]);
                else
                    self.hlaseni( { hlavicka: {}, polozky: {} } );
            }
        });
    };
    
    self.obnovitSeznamHlaseni = function(){
        $.ajax({
            type: 'PUT',
            url: '/sukl/hlaseni',
            dataType: 'JSON'
        }).done(function( response ) {
            if(response.zprava == 'OK'){
                self.seznam(response.data);
                
                var pocet = self.seznam().length;
                if(pocet > 0)
                    self.nactiHlaseni(self.seznam()[0]);
                else
                    self.hlaseni( { hlavicka: {}, polozky: {} } );
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

