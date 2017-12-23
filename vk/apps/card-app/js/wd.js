
function WikiDatabase( options, app ) {
    // check parameters.
    if( typeof app !== 'object' ) {

        console.error( 'Bad parameters in WikiDatabase constructor.');
        return;
    }

    // private variables
    var self = this;

    var _app = {
        'app_id':           app.app_id         || 0,
        'group_id':         app.group_id       || 0,
        'viewer_id':        app.viewer_id      || 0,
        'viewer_type':      app.viewer_type    || 0,
        'access_token':     app.access_token   || 'null'
    }

    var _options = {

        'title':        options.title || 'database_' + _app.app_id + "_" + _app.group_id,
        'can_view':     options.can_view || 2,  // Default: all users can view the page.
        'can_edit':     options.can_edit || 0   // Default: only community managers can edit the page.
    }

    // public variables.
    self.data = { }
    // private methods.

    function pageExists( callback ) {

        if( !callback || typeof callback !== 'function' )
            return;

        VK.api( 'pages.get', {

            'owner_id':     '-' + _app.group_id.toString(),
            'title':        _options.title,
            'need_source':  true,
            'access_token': _app.access_token
        }, function( r ) {

            if( r.response ) {

                callback( {

                    exists: true,
                    source: r.response.source
                } );

            } else callback( { exists: false } )

        })
    }

    function pageSource( callback ) {

        if( !callback || typeof callback !== 'function' )
            return;

        pageExists( function( data ) {

            if( data.exists )   return JSON.parse( data.source );
            
            console.warn( "Page not found!" );
            return { };
        });
    }

    function save() {

        VK.api( 'pages.save', {

            'title':        _options.title,
            'text':         JSON.stringify( self.data ),
            'group_id':     _app.group_id,
            'access_token': _app.access_token
        }, function( r ) {

            if( r.response )    _app.page_id = parseInt( r.response );
            else console.warn( 'Error in createPage();' );
        });
    }

    function saveAccess( ) {

        if( !_app.page_id )    save();
        
        VK.api( 'pages.saveAccess', {

            'page_id': _app.page_id,
            'group_id': _app.group_id,
            'view':     _options.can_view,
            'edit':     _options.can_edit,
            'access_token': _app.access_token
        }, function( r ) {


        });
    }

    function load() {

        pageSource( function( source ) {

            self.data = source;
        })
    }

    // public methods.
    self.save = function(  ) {

        save();
    }
}