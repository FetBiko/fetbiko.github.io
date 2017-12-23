
var $URL_PARAM = function( n ) {

    n = n.replace(/[\[]/, '\\[').replace(/[\]]/, '\\]');
    var r = new RegExp('[\\?&]' + n + '=([^&#]*)');
    var res = r.exec(location.search);
    return res === null ? '' : decodeURIComponent(res[1].replace(/\+/g, ' '));
}

var getFaviconUrl = function( url ) {
    
    return 'https://icons.better-idea.org/icon?url=' + url + '&size=60';
}

var app = {

    API: {
        VERSION: '5.69' ,
        SCOPES: {
            PAGES: 128
        }
    },

    initialize: function() {

        app.info = {
            api_settings:   $URL_PARAM( 'api_settings' ),
            app_id:         $URL_PARAM( 'api_id' ),
            group_id:       $URL_PARAM( 'group_id' ),
            viewer_id:      $URL_PARAM( 'viewer_id' ),
            viewer_type:    $URL_PARAM( 'viewer_type' ),
            access_token:   $URL_PARAM( 'access_token' )
        }

        app.initializeUI();
        app.initializeVK();        
        app.initializeDatabase();

        // if application not installed.
        app.go( false ? 'page-install' : 'page-profile' );
    },

    initializeUI: function() {

        app.ui = new UIApp();
        app.ui.add( 'page-install' ).add( 'page-profile' );
        
    },

    initializeDatabase: function() {
        
        app.database = new WikiDatabase( {}, app.info );
    },

    initializeVK: function() {

        VK.init( null, null, app.API.VERSION );

        var isOwner = app.info.viewer_type == 4;
        var isReady = app.info.api_settings & app.API.SCOPES.PAGES == app.API.SCOPES.PAGES;

        /* If the user is community's owner or administrator. */
        if( app.info.viewer_type == 4 && !isReady ) {

            VK.callMethod( 'showSettingsBox', app.API.SCOPES.PAGES );

            VK.addCallback( 'onSettingsChanged', function() {

            });
        }
    }
}