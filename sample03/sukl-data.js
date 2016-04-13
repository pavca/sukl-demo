var g_hlaseni = [
    { id: 1, 
        hlavicka: { kodPracovisteDodavatele: 'kod-01', obdobiHlaseni: '201604', idHlaseni: 'abcd0000-0000-0000-0000-000000000001', typHlaseni:'D' },
        polozky: [
            { typPohybuLP: 'vratka',  typOdberateleLP: 'Sklad distributora v ČR', kodSUKL: 'SUKL-001', nazev: 'Položka 1', mnozstvi: 100, sarze: '1234567'},
            { typPohybuLP: 'dodávka', typOdberateleLP: 'Distributor v EU',        kodSUKL: 'SUKL-002', nazev: 'Položka 2', mnozstvi: 500, sarze: '7891234'},
            { typPohybuLP: 'dodávka', typOdberateleLP: 'Distributor mimo EU',     kodSUKL: 'SUKL-003', nazev: 'Položka 3', mnozstvi: 500, sarze: '5678901'}
        ]
    },
    { id: 2, 
        hlavicka: { kodPracovisteDodavatele: 'kod-02', obdobiHlaseni: '201604', idHlaseni: 'abcd0000-0000-0000-0000-000000000002', typHlaseni:'D'},
        polozky: [
            { typPohybuLP: 'vratka',  typOdberateleLP: 'Sklad distributora v ČR', kodSUKL: 'SUKL-001', nazev: 'Položka 1', mnozstvi: 100, sarze: '1234567'},
            { typPohybuLP: 'dodávka', typOdberateleLP: 'Distributor v EU',        kodSUKL: 'SUKL-002', nazev: 'Položka 2', mnozstvi: 500, sarze: '7891234'},
            { typPohybuLP: 'dodávka', typOdberateleLP: 'Distributor mimo EU',     kodSUKL: 'SUKL-003', nazev: 'Položka 3', mnozstvi: 500, sarze: '5678901'}
        ]
    },
    { id: 3, 
        hlavicka: { kodPracovisteDodavatele: 'kod-03', obdobiHlaseni: '201604', idHlaseni: 'abcd0000-0000-0000-0000-000000000003', typHlaseni:'D'},
        polozky: [
            { typPohybuLP: 'vratka',  typOdberateleLP: 'Sklad distributora v ČR', kodSUKL: 'SUKL-001', nazev: 'Položka 1', mnozstvi: 100, sarze: '1234567'},
            { typPohybuLP: 'dodávka', typOdberateleLP: 'Distributor v EU',        kodSUKL: 'SUKL-002', nazev: 'Položka 2', mnozstvi: 500, sarze: '7891234'},
            { typPohybuLP: 'dodávka', typOdberateleLP: 'Distributor mimo EU',     kodSUKL: 'SUKL-003', nazev: 'Položka 3', mnozstvi: 500, sarze: '5678901'}
        ]
    },
];

function vratHlaseniSeznam(cb){
    cb(null, g_hlaseni);
}

function vratHlaseniDetail(id, cb){
    var result = g_hlaseni[1];
    cb(null, result);
}

exports.vratHlaseniSeznam = vratHlaseniSeznam;
exports.vratHlaseniDetail = vratHlaseniDetail;
