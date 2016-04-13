
function ViewModelHlaseniSeznam() {
    var self = this;
    
    self.seznam = ko.observableArray( [] );
    self.hlaseni = ko.observable( { hlavicka: {}, polozky: {} } );
    
    self.vymazatHlaseni = function(item){
        // $.ajax({
        //     type: 'DELETE',
        //     url: '/sukl/hlaseni/' + item.id,
        //     dataType: 'JSON'
        // }).done(function( response ) {
        //     if(response.zprava == 'OK'){
        //         self.nactiSeznam();
        //     }
        // });
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
        // $.ajax({
        //     type: 'GET',
        //     url: '/sukl/hlaseni/' + item.id,
        //     dataType: 'JSON'
        // }).done(function( response ) {
        //     if(response.zprava == 'OK'){
        //         self.hlaseni(response.data);
        //     }
        // });
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
        // $.ajax({
        //     type: 'GET',
        //     url: '/sukl/hlaseni',
        //     dataType: 'JSON'
        // }).done(function( response ) {
        //     if(response.zprava == 'OK'){
        //         self.seznam(response.data);
                
        //         var pocet = self.seznam().length;
        //         if(pocet > 0)
        //             self.nactiHlaseni(self.seznam()[0]);
        //         else
        //             self.hlaseni( { hlavicka: {}, polozky: {} } );
        //     }
        // });
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
        // $.ajax({
        //     type: 'PUT',
        //     url: '/sukl/hlaseni',
        //     dataType: 'JSON'
        // }).done(function( response ) {
        //     if(response.zprava == 'OK'){
        //         self.seznam(response.data);
                
        //         var pocet = self.seznam().length;
        //         if(pocet > 0)
        //             self.nactiHlaseni(self.seznam()[0]);
        //         else
        //             self.hlaseni( { hlavicka: {}, polozky: {} } );
        //     }
        // });
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

