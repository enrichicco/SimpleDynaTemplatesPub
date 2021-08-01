export const NavDefs: any = {
  templates: {
    template01: `<button type="button" routerLink='item.link'>item.desc</button>&nbsp;`
  }
  , navElements: [
    {
      idName: "__EMPTY__"
      , link: "__EMPTY__"
      , label: "default page - home page - empty path"
      , virtual: true
      , enabled: true
    },
    {
      idName: "__SLASHONLY__"
      , link: "/"
      , label: "/ - slash only"
      , virtual: false
      , enabled: true
    },
    {
      idName: "boilerplateHome"
      , link: "/boilerplateHome"
      , label: "boilerplate home"
      , virtual: false
      , enabled: true
    },
    {
      idName: "angularAds"
      , link: "/angularAds"
      , label: "ads: Angular claims and demos"
      , virtual: false
      , enabled: true
    },
    //
    //
    // ============================================================================================
    //
    //
    {
      idName: "dynaComponentsTest"
      , link: "/dynaComponentsTest"
      , label: "test dynamic components"
      , virtual: false
      , enabled: true
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
      , virtual: false
      , enabled: false
    },
    {
      idName: "externalApp"
      , link: "externalApp"
      , label: "implemented application launcher"
      , virtual: false
      , enabled: false
    },
    {
      idName: "childRoutesTest"
      , link: "childRoutesTest"
      , label: "child routes (multiple router outlet) navigation test"
      , virtual: false
      , enabled: false
    },

  ]

}