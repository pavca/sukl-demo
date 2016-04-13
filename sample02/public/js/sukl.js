        var g_hlaseni = {
            hlavicka: {},
            zaznamy: []
        };
        
        function odeslatHlaseni(){
           
            var dataHlaseni = {
                'kod-pracoviste-dodavatele': $('#kod-pracoviste-dodavatele').val(),
                'obdobi-hlaseni': $('#obdobi-hlaseni').val(),
                'id-hlaseni': $('#id-hlaseni').val(),
                'typ-hlaseni': $('#typ-hlaseni').val()
            };
            
            $.ajax({
                type: 'POST',
                data: dataHlaseni,
                url: '/sukl/hlaseni/add',
                dataType: 'JSON'
            }).done(function( response ) {
                alert(response.message);
            // Check for successful (blank) response
            /*
            if (response.msg === '') {
                // Clear the form inputs
                $('#addUser fieldset input').val('');
                // Update the table
                populateTable();
            }
            else {
                // If something goes wrong, alert the error message that our service returned
                alert('Error: ' + response.msg);
            }
            */
            });
        }
        
        function pridatRadekHlaseni(){
           //alert('pridatRadekHlaseni');
           var dataRadku = {
                typPohybuLP: $('#typ-pohybu-lp').val(),
                typOdberatele: $('#typ-odberatele').val(),
                kodSukl: $('#kod-sukl').val(),
                nazev: $('#nazev').val(),
                mnozstvi: $('#mnozstvi').val(),
                sarze: $('#sarze').val(),
            };
            
            g_hlaseni.zaznamy.push(dataRadku);
           alert(JSON.stringify(dataRadku));
        }
        
        function vymazatRadekHlaseni(){
            alert('vymazatRadekHlaseni');
        }
        
        $(document).ready(function() {
            $('#odeslat-hlaseni').on('click', odeslatHlaseni);
            $('#pridat-radek-hlaseni').on('click', pridatRadekHlaseni);
        });
        
