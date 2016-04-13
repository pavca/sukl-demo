/**
 * sukl-hlaseni-cli.js
 */

var sukl = sukl || {};

sukl.services = sukl.services || {};

sukl.services.cliHlaseni = sukl.services.cliHlaseni || (function () {
    
    function vymazatHlaseni(id, cb){
        $.ajax({
            type: 'DELETE',
            url: '/sukl/hlaseni/' + id,
            dataType: 'JSON'
        }).done(function( response ) {
            if(response.zprava == 'OK'){
                cb(null, response);
            }
            else{
                cb(response.zprava, null);
            }
        });
    };
    
    function nactiHlaseni(item, cb){
        $.ajax({
            type: 'GET',
            url: '/sukl/hlaseni/' + item.id,
            dataType: 'JSON'
        }).done(function( response ) {
            if(response.zprava == 'OK'){
                cb(null, response);
            }
            else{
                cb(response.zprava, null);
            }
        });
    };
    
    function nactiSeznam(cb){
        $.ajax({
            type: 'GET',
            url: '/sukl/hlaseni',
            dataType: 'JSON'
        }).done(function( response ) {
            if(response.zprava == 'OK'){
                cb(null, response);
            }
            else{
                cb(response.zprava, null);
            }
        });
    };
    
    function obnovitSeznamHlaseni(cb){
        $.ajax({
            type: 'PUT',
            url: '/sukl/hlaseni',
            dataType: 'JSON'
        }).done(function( response ) {
            if(response.zprava == 'OK'){
                cb(null, response);
            }
            else{
                cb(response.zprava, null);
            }
        });
    };

    function ulozitHlaseni(data, cb) {
        $.ajax({
            type: 'POST',
            data: data,
            url: '/sukl/hlaseni',
            dataType: 'JSON'
        }).done(function( response ) {
            if(response.zprava == 'OK'){
                cb(null, response);
            }
            else{
                cb(response.zprava, null);
            }
        });
    };

    return {
        vymazatHlaseni: vymazatHlaseni,
        nactiHlaseni: nactiHlaseni,
        nactiSeznam: nactiSeznam,
        obnovitSeznamHlaseni: obnovitSeznamHlaseni,
        ulozitHlaseni: ulozitHlaseni
    };
}());