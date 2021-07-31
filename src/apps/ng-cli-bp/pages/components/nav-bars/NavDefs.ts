export const NavDefs: any = {
  templates: {
    template01: `<button type="button" routerLink='item.link'>item.desc</button>&nbsp;`
  }
  , navElements: [
    {
      idName: "boilerplateHome"
      , link: "boilerplateHome"
      , label: "boilerplate home"
    },
    {
      idName: "angularAds"
      , link: "angularAds"
      , label: "ads: Angular claims and demos"
    },
    //
    //
    // ============================================================================================
    //
    //
    {
      idName: "dynaComponentsTest"
      , link: "dynaComponentsTest"
      , label: "test dynamic components"
    },
    //
    //
    // ============================================================================================
    //
    //
    {
      idName: "routesManager"
      , link: "routesManager"
      , label: "router manager interface"
    },
    {
      idName: "externalApp"
      , link: "externalApp"
      , label: "implemented application launcher"
    },
    {
      idName: "childRoutesTest"
      , link: "childRoutesTest"
      , label: "child routes (multiple router outlet) navigation test"
    },

  ]
  , routesLabels: {
    "__EMPTY__": "default page - home page"
    , "__SLASHONLY__": "/ - slash only"
    , "/": "home slash..."
    , "/home": "home"
    , "/routesManager": "routes Manager"
    , "/angularAds": "angular Ads"
    , "/dynaCompLight_InsideHtmlObjRef": "Dynamic template (statically compiled), insertion in html dom refpoint."
    , "/dynaCompLight_Factory": "Dynamic template (statically compiled), insertion in html dom refpoint."
    , "/dynaCompFull": "Dynamic Template, dynamically compiled"
    , "/testChildRoutes": "test child (nested) routes, multiple router outlets"
    , "/XXX": "YYYY"
  }

}