"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var core_1 = require('@angular/core');
var platform_browser_1 = require('@angular/platform-browser');
var deep_dive_service_1 = require('../../services/deep-dive.service');
var global_settings_1 = require("../../global/global-settings");
var global_functions_1 = require("../../global/global-functions");
var deep_dive_block_1_module_1 = require('../../fe-core/modules/deep-dive-blocks/deep-dive-block-1/deep-dive-block-1.module');
var DeepDiveModule = (function () {
    function DeepDiveModule(
        //  private _router:Router,
        _deepDiveData, 
        //  private _schedulesService:SchedulesService,
        _geoLocation, _partnerData, ngZone) {
        var _this = this;
        this._deepDiveData = _deepDiveData;
        this._geoLocation = _geoLocation;
        this._partnerData = _partnerData;
        this.ngZone = ngZone;
        this.widgetPlace = "widgetForPage";
        this.ssMax = 9;
        this.callCount = 1;
        this.callLimit = 9;
        this.safeCall = true;
        this.blockIndex = 1;
        this.changeScopeVar = "";
        this.isPartnerZone = false;
        // needs to get Geolocation first
        global_settings_1.GlobalSettings.getParentParams(_router, function (parentParams) {
            _this.partnerID = parentParams.partnerID;
            _this.scope = parentParams.scope;
            _this.changeScopeVar = _this.scope;
            _this.profileName = _this.scope == 'fbs' ? 'NCAAF' : _this.scope.toUpperCase();
            var partnerHome = global_settings_1.GlobalSettings.getHomeInfo().isHome && global_settings_1.GlobalSettings.getHomeInfo().isPartner;
            if (window.location.pathname == "/" + global_settings_1.GlobalSettings.getHomeInfo().partnerName && global_settings_1.GlobalSettings.getHomeInfo().isPartner) {
                var relPath = _this.getRelativePath(_router);
                //_router.navigate([relPath+'Partner-home',{scope:'nfl',partnerId:GlobalSettings.getHomeInfo().partnerName}]);
                window.location.pathname = "/" + global_settings_1.GlobalSettings.getHomeInfo().partnerName + "/nfl";
            }
            _this.isPartnerZone = partnerHome;
            if (_this.partnerID != null) {
                _this.getPartnerHeader();
            }
            else {
                _this.getGeoLocation();
            }
        });
    }
    DeepDiveModule.prototype.getRelativePath = function (router) {
        var counter = 0;
        var hasParent = true;
        var route = router;
        for (var i = 0; hasParent == true; i++) {
            if (route.parent != null) {
                counter++;
                route = route.parent;
            }
            else {
                hasParent = false;
                var relPath = '';
                for (var c = 1; c <= counter; c++) {
                    relPath += '../';
                }
                return relPath;
            }
        }
    };
    //api for Schedules
    DeepDiveModule.prototype.getSideScroll = function () {
        var _this = this;
        var self = this;
        if (this.safeCall) {
            this.safeCall = false;
            var changeScope = this.changeScopeVar.toLowerCase() == 'ncaaf' ? 'fbs' : this.changeScopeVar.toLowerCase();
            this._schedulesService.setupSlideScroll(this.sideScrollData, changeScope, 'league', 'pregame', this.callLimit, this.callCount, function (sideScrollData) {
                if (_this.sideScrollData == null) {
                    _this.sideScrollData = sideScrollData;
                }
                else {
                    sideScrollData.forEach(function (val, i) {
                        self.sideScrollData.push(val);
                    });
                }
                _this.safeCall = true;
                _this.callCount++;
                _this.scrollLength = _this.sideScrollData.length;
            }, null, null);
        }
    };
    DeepDiveModule.prototype.changeScope = function ($event) {
        var partnerHome = global_settings_1.GlobalSettings.getHomeInfo().isHome && global_settings_1.GlobalSettings.getHomeInfo().isPartner;
        var relPath = this.getRelativePath(this._router);
        if (partnerHome) {
            this._router.navigate([relPath + 'Partner-home', { scope: $event.toLowerCase(), partnerId: global_settings_1.GlobalSettings.getHomeInfo().partnerName }]);
            window.location.pathname = "/" + global_settings_1.GlobalSettings.getHomeInfo().partnerName + "/" + $event.toLowerCase();
        }
        else {
            this._router.navigate([relPath + 'Default-home', { scope: $event.toLowerCase() }]);
            window.location.pathname = "/" + $event.toLowerCase();
        }
        // if($event == this.changeScopeVar){
        //   this.getSideScroll();
        // }else{
        //   this.changeScopeVar = $event;
        //   this.callCount = 1;
        //   this.sideScrollData = null;
        //   this.getSideScroll();
        // }
    };
    DeepDiveModule.prototype.scrollCheck = function (event) {
        var maxScroll = this.sideScrollData.length;
        if (event >= (maxScroll - this.ssMax)) {
            this.getSideScroll();
        }
    };
    DeepDiveModule.prototype.getDeepDiveVideoBatch = function () {
        var _this = this;
        this._deepDiveData.getDeepDiveVideoBatchService(this.scope, '1', '1', this.geoLocation).subscribe(function (data) {
            _this.videoData = data.data;
        });
    };
    DeepDiveModule.prototype.getDataCarousel = function () {
        var _this = this;
        this._deepDiveData.getCarouselData(this.scope, this.carouselData, '25', '1', this.geoLocation, function (carData) {
            _this.carouselData = carData;
        });
    };
    DeepDiveModule.prototype.getPartnerHeader = function () {
        var _this = this;
        if (this.partnerID != null) {
            this._partnerData.getPartnerData(this.partnerID)
                .subscribe(function (partnerScript) {
                _this.partnerData = partnerScript;
                //super long way from partner script to get location using geo location api
                var state = partnerScript['results']['location']['realestate']['location']['city'][0].state;
                state = state.toLowerCase();
                _this.geoLocation = state;
                _this.callModules();
            });
        }
        else {
            this.getGeoLocation();
        }
    };
    //Subscribe to getGeoLocation in geo-location.service.ts. On Success call getNearByCities function.
    DeepDiveModule.prototype.getGeoLocation = function () {
        var _this = this;
        var defaultState = 'ca';
        this._geoLocation.getGeoLocation()
            .subscribe(function (geoLocationData) {
            _this.geoLocation = geoLocationData[0].state;
            _this.geoLocation = _this.geoLocation.toLowerCase();
            _this.callModules();
        }, function (err) {
            _this.geoLocation = defaultState;
            _this.callModules();
        });
    };
    DeepDiveModule.prototype.callModules = function () {
        this.getDataCarousel();
        this.getDeepDiveVideoBatch();
        this.getSideScroll();
    };
    DeepDiveModule.prototype.onScroll = function (event) {
        if (jQuery(document).height() - window.innerHeight - jQuery("footer").height() <= jQuery(window).scrollTop()) {
            //fire when scrolled into footer
            this.blockIndex = this.blockIndex + 1;
        }
    };
    DeepDiveModule.prototype.ngOnInit = function () {
        // var script = document.createElement("script");
        // script.src = 'http://content.synapsys.us/deepdive/rails/rails.js?selector=.web-container&adMarginTop=100';
        // document.head.appendChild(script);
        // jQuery("deep-dive-page").parent().addClass('deep-dive-container');
    };
    DeepDiveModule = __decorate([
        core_1.NgModule({
            imports: [
                platform_browser_1.BrowserModule,
                global_settings_1.GlobalSettings,
                global_functions_1.GlobalFunctions,
            ],
            declarations: [
                deep_dive_block_1_module_1.DeepDiveBlock1,
            ],
            providers: [
                deep_dive_service_1.DeepDiveService
            ],
            bootstrap: []
        }), 
        __metadata('design:paramtypes', [deep_dive_service_1.DeepDiveService, Object, Object, Object])
    ], DeepDiveModule);
    return DeepDiveModule;
}());
exports.DeepDiveModule = DeepDiveModule;
//# sourceMappingURL=deep-dive-page.module.js.map