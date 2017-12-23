
function Page( id ) {       var self = this;

    self.id = id;
    self.dom = function() { return document.getElementById( self.id ) }
    self.hide = function() { self.dom().style.display = 'none'; }
    self.show = function() { self.dom().style.display = '' }
    self.set = function( d ) { d ? self.show() : self.hide(); }
}

function UIApp( ) {            var self = this;

    self.pages = [];

    /**
     *  Open the page and close all other pages.
     */
    self.go = function( id ) {

        if( typeof id !== 'string' )    return;

        self.pages.forEach( function( p ) {
            
            p.set( p.id == id );
        });
    }
    
    /**  Add page to UI App. */
    self.add = function( id ) {

        if( document.getElementById( id ) )
            self.pages.push( new Page( id ) );

        // for chains.
        return self;
    }
    
    /** Remove page from UI App. */
    self.remove = function( id ) {

        for( var i = 0; i < self.pages.length; i++ ) {

            var p = self.pages[ i ];

            if( p )
                self.pages.splice( i, 1 );
        }
    }

    self.contains = function( id ) {
        return self.pages.find( function ( p ) { return p.id == id; }) !== undefined;
    } 
}