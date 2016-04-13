var _ = require('lodash-node'); 

var g_hlaseni = [
    { id: 1, 
      active: true,
        hlavicka: { kodPracovisteDodavatele: 'kod-01', obdobiHlaseni: '201604', idHlaseni: 'abcd0000-0000-0000-0000-000000000001', typHlaseni:'D' },
        polozky: [
            { typPohybuLP: 'vratka',  typOdberateleLP: 'Sklad distributora v ČR', kodSUKL: 'SUKL-001', nazev: 'Položka 001', mnozstvi: 100, sarze: '1234567'},
            { typPohybuLP: 'dodávka', typOdberateleLP: 'Distributor v EU',        kodSUKL: 'SUKL-002', nazev: 'Položka 002', mnozstvi: 500, sarze: '7891234'},
            { typPohybuLP: 'dodávka', typOdberateleLP: 'Distributor mimo EU',     kodSUKL: 'SUKL-003', nazev: 'Položka 003', mnozstvi: 500, sarze: '5678901'}
        ]
    },
    { id: 2, 
      active: true,
        hlavicka: { kodPracovisteDodavatele: 'kod-02', obdobiHlaseni: '201604', idHlaseni: 'abcd0000-0000-0000-0000-000000000002', typHlaseni:'D'},
        polozky: [
            { typPohybuLP: 'vratka',  typOdberateleLP: 'Sklad distributora v ČR', kodSUKL: 'SUKL-101', nazev: 'Položka 011', mnozstvi: 100, sarze: '1234567'},
            { typPohybuLP: 'dodávka', typOdberateleLP: 'Distributor v EU',        kodSUKL: 'SUKL-102', nazev: 'Položka 012', mnozstvi: 500, sarze: '7891234'},
            { typPohybuLP: 'vratka',  typOdberateleLP: 'Sklad distributora v ČR', kodSUKL: 'SUKL-014', nazev: 'Položka 113', mnozstvi: 666, sarze: '6678901'},
            { typPohybuLP: 'dodávka', typOdberateleLP: 'Distributor v EU',        kodSUKL: 'SUKL-103', nazev: 'Položka 013', mnozstvi: 500, sarze: '5678901'}
        ]
    },
    { id: 3, 
      active: true,
        hlavicka: { kodPracovisteDodavatele: 'kod-03', obdobiHlaseni: '201604', idHlaseni: 'abcd0000-0000-0000-0000-000000000003', typHlaseni:'D'},
        polozky: [
            { typPohybuLP: 'vratka',  typOdberateleLP: 'Sklad distributora v ČR', kodSUKL: 'SUKL-011', nazev: 'Položka 111', mnozstvi: 100, sarze: '1234567'},
            { typPohybuLP: 'dodávka', typOdberateleLP: 'Distributor v EU',        kodSUKL: 'SUKL-012', nazev: 'Položka 112', mnozstvi: 500, sarze: '7891234'},
            { typPohybuLP: 'dodávka', typOdberateleLP: 'Sklad distributora v ČR', kodSUKL: 'SUKL-013', nazev: 'Položka 113', mnozstvi: 500, sarze: '5678901'},
            { typPohybuLP: 'vratka',  typOdberateleLP: 'Sklad distributora v ČR', kodSUKL: 'SUKL-014', nazev: 'Položka 113', mnozstvi: 666, sarze: '6678901'},
            { typPohybuLP: 'vratka',  typOdberateleLP: 'Sklad distributora v ČR', kodSUKL: 'SUKL-015', nazev: 'Položka 113', mnozstvi: 333, sarze: '7678901'},
            { typPohybuLP: 'dodávka', typOdberateleLP: 'Distributor mimo EU',     kodSUKL: 'SUKL-016', nazev: 'Položka 113', mnozstvi: 777, sarze: '8678901'}
        ]
    },
];

function vratHlaseniSeznam(cb){
    var result = _.filter(g_hlaseni, { 'active': true });
    cb(null, result);
}

function vratHlaseni(id, cb){
    //_.findKey(users, { 'age': 1, 'active': true });
    if(typeof id == 'string')
        id = parseInt(id);
    var index = _.findKey(g_hlaseni, {id: id});
    
    var result = g_hlaseni[index];
    cb(null, result);
}

function vymazHlaseni(id, cb){
    if(typeof id == 'string')
        id = parseInt(id);
    var index = _.findKey(g_hlaseni, {id: id});
    
    g_hlaseni[index].active = false;
    
    cb(null, g_hlaseni[index].id);
}

exports.vratHlaseniSeznam = vratHlaseniSeznam;
exports.vratHlaseni = vratHlaseni;
exports.vymazHlaseni = vymazHlaseni;
