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
var DeepDivePage = (function () {
    function DeepDivePage() {
    }
    DeepDivePage = __decorate([
        core_1.Component({
            selector: 'deep-dive-page',
            templateUrl: './app/webpages/deep-dive-page/deep-dive.page.html',
        }), 
        __metadata('design:paramtypes', [])
    ], DeepDivePage);
    return DeepDivePage;
}());
exports.DeepDivePage = DeepDivePage;
/*public widgetPlace: string = "widgetForPage";

//page variables
scope: string;
sidescrollScope:string;
partnerID: string;
partnerData:any;
profileName:string;
geoLocation:string;

sideScrollData: any;
scrollLength: number;
ssMax:number = 9;
callCount:number = 1;
callLimit:number = 9;
safeCall: boolean = true;
//for carousel
carouselData: any;
videoData:any;
blockIndex: number = 1;
changeScopeVar: string = "";
​
private isPartnerZone: boolean = false;

constructor(
  private _router:Router,
  private _deepDiveData: DeepDiveService,
  private _schedulesService:SchedulesService,
  private _geoLocation:GeoLocation,
  private _partnerData: PartnerHeader,
  public ngZone:NgZone){
    // needs to get Geolocation first
  GlobalSettings.getParentParams(_router, parentParams => {
      this.partnerID = parentParams.partnerID;
      this.scope = parentParams.scope;
      this.changeScopeVar = this.scope;
      this.profileName = this.scope == 'fbs'? 'NCAAF':this.scope.toUpperCase();
      var partnerHome = GlobalSettings.getHomeInfo().isHome && GlobalSettings.getHomeInfo().isPartner;
      if (window.location.pathname == "/" + GlobalSettings.getHomeInfo().partnerName && GlobalSettings.getHomeInfo().isPartner) {
        let relPath = this.getRelativePath(_router);
          //_router.navigate([relPath+'Partner-home',{scope:'nfl',partnerId:GlobalSettings.getHomeInfo().partnerName}]);
          window.location.pathname = "/" + GlobalSettings.getHomeInfo().partnerName + "/nfl";
      }
      this.isPartnerZone = partnerHome;
      if(this.partnerID != null){
        this.getPartnerHeader();
      }else{
        this.getGeoLocation();
      }
  });
}

getRelativePath(router:Router){
  let counter = 0;
  let hasParent = true;
  let route = router;
  for (var i = 0; hasParent == true; i++){
    if(route.parent != null){
      counter++;
      route = route.parent;
    }else{
      hasParent = false;
      let relPath = '';
      for(var c = 1 ; c <= counter; c++){
        relPath += '../';
      }
      return relPath;
    }
  }
}

//api for Schedules
private getSideScroll(){
  let self = this;
  if(this.safeCall){
    this.safeCall = false;
    let changeScope = this.changeScopeVar.toLowerCase() == 'ncaaf'?'fbs':this.changeScopeVar.toLowerCase();
    this._schedulesService.setupSlideScroll(this.sideScrollData, changeScope, 'league', 'pregame', this.callLimit, this.callCount, (sideScrollData) => {
      if(this.sideScrollData == null){
        this.sideScrollData = sideScrollData;
      }
      else{
        sideScrollData.forEach(function(val,i){
          self.sideScrollData.push(val);
        })
      }
      this.safeCall = true;
      this.callCount++;
      this.scrollLength = this.sideScrollData.length;
    }, null, null)
  }
}
changeScope($event) {
  var partnerHome = GlobalSettings.getHomeInfo().isHome && GlobalSettings.getHomeInfo().isPartner;
  let relPath = this.getRelativePath(this._router);
  if(partnerHome){
    this._router.navigate([relPath+'Partner-home',{scope:$event.toLowerCase(),partnerId:GlobalSettings.getHomeInfo().partnerName}]);
    window.location.pathname = "/" + GlobalSettings.getHomeInfo().partnerName + "/"+$event.toLowerCase();
  }else{
    this._router.navigate([relPath+'Default-home',{scope:$event.toLowerCase()}]);
    window.location.pathname = "/"+$event.toLowerCase();
  }

  // if($event == this.changeScopeVar){
  //   this.getSideScroll();
  // }else{
  //   this.changeScopeVar = $event;
  //   this.callCount = 1;
  //   this.sideScrollData = null;
  //   this.getSideScroll();
  // }
}

private scrollCheck(event){
  let maxScroll = this.sideScrollData.length;
  if(event >= (maxScroll - this.ssMax)){
   this.getSideScroll();
  }
}

private getDeepDiveVideoBatch(){
    this._deepDiveData.getDeepDiveVideoBatchService(this.scope, '1', '1', this.geoLocation).subscribe(
      data => {
        this.videoData = data.data;
      }
    )
  }

private getDataCarousel() {
  this._deepDiveData.getCarouselData(this.scope, this.carouselData, '25', '1', this.geoLocation, (carData)=>{
    this.carouselData = carData;
  })
}

getPartnerHeader(){//Since it we are receiving
  if(this.partnerID != null){
    this._partnerData.getPartnerData(this.partnerID)
    .subscribe(
      partnerScript => {
        this.partnerData = partnerScript;
        //super long way from partner script to get location using geo location api
        var state = partnerScript['results']['location']['realestate']['location']['city'][0].state;
        state = state.toLowerCase();
        this.geoLocation = state;
        this.callModules();
      }
    );
  }else{
    this.getGeoLocation();
  }
}

//Subscribe to getGeoLocation in geo-location.service.ts. On Success call getNearByCities function.
getGeoLocation() {
  var defaultState = 'ca';
    this._geoLocation.getGeoLocation()
        .subscribe(
            geoLocationData => {
              this.geoLocation = geoLocationData[0].state;
              this.geoLocation = this.geoLocation.toLowerCase();
              this.callModules();

            },
            err => {
              this.geoLocation = defaultState;
              this.callModules();
            }
        );
}

callModules(){
  this.getDataCarousel();
  this.getDeepDiveVideoBatch();
 this.getSideScroll();
}
private onScroll(event) {
  if (jQuery(document).height() - window.innerHeight - jQuery("footer").height() <= jQuery(window).scrollTop()) {
    //fire when scrolled into footer
    this.blockIndex = this.blockIndex + 1;
  }
}
ngOnInit(){
  // var script = document.createElement("script");
  // script.src = 'http://content.synapsys.us/deepdive/rails/rails.js?selector=.web-container&adMarginTop=100';
  // document.head.appendChild(script);
  // jQuery("deep-dive-page").parent().addClass('deep-dive-container');
}*/
//# sourceMappingURL=deep-dive.page.js.map