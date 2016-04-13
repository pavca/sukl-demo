/**
 * Created by Pavel Procházka on 28. 2. 2015.
 */

var posdee = posdee || {};

posdee.services = posdee.services || {};

posdee.services.cliFirmy = posdee.services.cliFirmy || (function () {
        var baseServiceUrl = g_posdeeClientConfig.firmyServiceRoot;

        var m_urlMapFirmyService = {
            'vratFirmyId': '/vratFirmyId',
            'vratFirmaInfo': '/vratFirmaInfo',
            'zalozFirmu' : '/zalozFirmu',
            'zmenFirmu': '/zmenFirmu',
            'publikujFirmu':'/publikujFirmu',
            'vratPobockyId' : '/vratPobockyId',
            'vratPobockyInfo' : '/vratPobockyInfo',
            'vratPobockuInfo' : '/vratPobockuInfo',
            'vratPobockuDetail' : '/vratPobockuDetail',
            'vratPobockuEdit':'/vratPobockuEdit',
            'zrusPobocky':'/zrusPobocky',
            'zmenPobocku': '/zmenPobocku',
            'zalozObrazek': '/zalozObrazek',
            'vratFirmuProIC': '/vratFirmuProIC',
            'vratPocetFirem':'/vratPocetFirem',

            'zrusFirmu': '/zrusFirmu',
            'zalozPobocku': '/zalozPobocku',
            'zrusPobocku': '/zrusPobocku',
            'vratPobocku' : '/vratPobocku',
            'vratFirmuEdit': '/vratFirmuEdit'
        };

        var m_urlMapFirmyPage = {
            'posdee-firmy-detail': '/posdee-firmy-detail',
            'posdee-firmy-dlazdice': '/posdee-firmy-dlazdice',
            'posdee-firmy-find': '/posdee-firmy-find',
            'posdee-firmy-posdeecheck': '/posdee-firmy-posdeecheck'
        };

        function getFirmyServiceUrl(service){
            return baseServiceUrl + m_urlMapFirmyService[service];
        }

        function getFirmyPageUrl(page){
            return baseServiceUrl + m_urlMapFirmyPage[page];
        }

        var invokeGet = function (request, cb) {
            $.getJSON(request, function (result) {
                if (result.code < 0)
                    cb(result, null);
                else
                    cb(result);
            });
        };

        var invokeGet2 = function (request, cb) {
            $.getJSON(request, function (result) {
                if (result.code < 0)
                    cb(result, null);
                else
                    cb(null, result);
            });
        };

        var invokePost = function (request, data, cb) {
            $.post(request, data, function (result) {
                if (result.code < 0) {
                    cb(result, null);
                }
                else {
                    cb(result);
                }
            });
        };

        var invokePost2 = function (request, data, cb) {
            $.post(request, data, function (result) {
                if (result.code < 0)
                    cb(result, null);
                else
                    cb(null, result);
            });
        };

        var vratFirmyId = function (filtr, cb) {
            var request = getFirmyServiceUrl('vratFirmyId');
            invokeGet(request, cb);
        };

        var vratFirmaInfo = function (data, cb) {
            var request = getFirmyServiceUrl('vratFirmaInfo');
            invokePost2(request, {firmaId: data}, cb);
        };

        var zalozFirmu = function (data, cb) {
            var request = getFirmyServiceUrl('zalozFirmu');
            invokePost2(request, data, cb);
        };

        var zmenFirmu = function (data, cb) {
            var request = getFirmyServiceUrl('zmenFirmu');
            invokePost2(request, data, cb);
        };

        var publikujFirmu = function (data, cb) {
            var request = getFirmyServiceUrl('publikujFirmu');
            invokePost2(request, data, cb);
        };

        var vratPobockyId = function (data, cb) {
            var request = getFirmyServiceUrl('vratPobockyId');
            data = data || JSON.stringify({vratPobocky: {}});
            invokePost2(request, data, cb);
        };

        var vratPobockyInfo = function (data, cb) {
            var request = getFirmyServiceUrl('vratPobockyInfo');
            data = data || JSON.stringify({vratPobocky: {}});
            invokePost2(request, data, cb);
        };

        var vratPobockuInfo = function (pobockaId, cb) {
            //var request = getFirmyServiceUrl('vratPobockuInfo') + '?id=' + pobockaId;
            //invokeGet(request, cb);

            var request = getFirmyServiceUrl('vratPobockuInfo');
            var data = { vratPobockuInfo : { pobockaID: pobockaId } };
            invokePost2(request, data, cb);
        };

        var vratPobockuDetail = function (pobockaId, cb) {
            var request = getFirmyServiceUrl('vratPobockuDetail') + '?id=' + pobockaId;
            invokeGet(request, cb);
        };

        var vratPobockuEdit = function (pobockaId, cb) {
            var request = getFirmyServiceUrl('vratPobockuEdit') + '?id=' + pobockaId;
            invokeGet(request, cb);
        };

        var zrusPobocky = function (pobocky, cb) {
            invokePost2(getFirmyServiceUrl('zrusPobocky'), {pobocky: pobocky}, cb);
        };

        var zmenPobocku = function (data, cb) {
            invokePost(getFirmyServiceUrl('zmenPobocku'), data, cb);
        };

        var zalozObrazek = function (cb) {
            var request = getFirmyServiceUrl('zalozObrazek');
            invokeGet2(request, cb);
        };

        var nactiFirmuPodleIC = function (ic, cb) {
            var request = (getFirmyServiceUrl('vratFirmuProIC') + '?ico=' + ic);
            invokeGet2(request, cb);
        };

        var vratPocetFirem = function(filtr, cb) {
            var request = getFirmyServiceUrl('vratPocetFirem');
            var data = { vratPocetFirem : filtr };
            invokePost2(request, data, cb);
        };

        var uploadImage = function (id, data, cb) {
            var url = '/upload/' + id;

            var fd = new FormData();
            fd.append("data", data);

            var xhr = new XMLHttpRequest();
            xhr.open("POST", url, true);
            xhr.onload = function () {
                var result = JSON.parse(this.response);
                cb(result.err, result.res);
            };
            xhr.send(fd);
        };

        var postNavigate = function(req, params, method) {
            //var path = getPageUrl(req);
            var path = getFirmyPageUrl(req);

            method = method || "post";

            var form = document.createElement("form");
            form.setAttribute("method", method);
            form.setAttribute("action", path);

            for(var key in params) {
                if(params.hasOwnProperty(key)) {
                    var hiddenField = document.createElement("input");
                    hiddenField.setAttribute("type", "hidden");
                    hiddenField.setAttribute("name", key);
                    hiddenField.setAttribute("value", params[key]);

                    form.appendChild(hiddenField);
                }
            }

            document.body.appendChild(form);
            form.submit();
        };

        var getNavigate = function(req, params, method) {
            var path = getFirmyPageUrl(req);
            window.location.assign(path);
        };

        var createQueryDetail = function (firmaId) {
            return getPageUrl('posdee-firmy-detail') + '?firmaId=' + firmaId;
        };

        return {
            vratPocetFirem: vratPocetFirem,
            vratFirmyId: vratFirmyId,
            vratFirmaInfo: vratFirmaInfo,
            zalozFirmu: zalozFirmu,
            zmenFirmu: zmenFirmu,
            publikujFirmu: publikujFirmu,
            vratPobockyId: vratPobockyId,
            vratPobockyInfo: vratPobockyInfo,
            vratPobockuInfo: vratPobockuInfo,
            vratPobockuDetail: vratPobockuDetail,
            vratPobockuEdit: vratPobockuEdit,
            zrusPobocky: zrusPobocky,
            zmenPobocku: zmenPobocku,
            zalozObrazek: zalozObrazek,
            uploadImage: uploadImage,
            nactiFirmuPodleIC: nactiFirmuPodleIC,
            postNavigate: postNavigate,
            getNavigate: getNavigate,
            createQueryDetail: createQueryDetail
        };
    }());