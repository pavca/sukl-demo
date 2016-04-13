
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
                //alert(response.zprava);
            if(response.zprava == 'OK'){
                self.hlaseni(response.data);
                
                var xxx = self.hlaseni().hlavicka;
                var zzz = 1;
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
            }
        });
    };
    
    self.init = function(){
        self.nactiSeznam();
    };
}

$(function () {
    var viewModel = new ViewModelHlaseniSeznam();
    ko.applyBindings(viewModel);
    viewModel.init();
});

