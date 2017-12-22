var app = {
    API_VERSION: '5.69',
    API_SETTINGS_SCOPE_PHOTOS: 4 + 128,

    appId: 0,
    groupId: 0,
    userId: 0,
    userPermissions: 0,

    getUrlParameter: function ( name ) {
        name = name.replace(/[\[]/, '\\[').replace(/[\]]/, '\\]');

        var regex = new RegExp('[\\?&]' + name + '=([^&#]*)');
        var results = regex.exec(location.search);

        return results === null ? '' : decodeURIComponent(results[1].replace(/\+/g, ' '));
    },

    init: function () {
        app.appId = app.getUrlParameter('api_id');
        app.groupId = app.getUrlParameter('group_id');
        app.userId = app.getUrlParameter('viewer_id');
        app.userPermissions = app.getUrlParameter('viewer_type');

 /*       document.getElementById('btn-include')
                .href = 'https://vk.com/add_community_app?aid=' + app.appId; */

        VK.init(null, null, app.API_VERSION);

        VK.callMethod( 'showSettingsBox',
            app.API_SETTINGS_SCOPE_PHOTOS );
        
        VK.addCallback( 'onSettingsChanged', function() {
            if( app.userPermissions == 4 ) {
                
                document.getElementById( 'btn-create-wiki' ).onclick = function() {
                    
                    var requestData = {
                        'text': 'sample text!',
                        'group_id': app.groupId,
                        'user_id': app.userId,
                        'title': "title",
                        'access_token': app.getUrlParameter('access_token')
                    };
    
                    VK.api('pages.save', requestData);
                };
            } 
        } );
       
    },

    test() {
        var requestData = {
            'text': 'sample text!',
            'group_id': group_id,
            'user_id': user_id,
            'title': title
        };


        VK.api('pages.save', requestData);
    }
};

window.addEventListener('load', function () {
    app.init();
});


/*

pages:
- page-install
- page-edit
- page-view

*/

/*

api_id=6306700
api_settings=1
viewer_id=154843561
viewer_type=4
sid=44365736f3b83078a5e875dd1a6e4e279409bced0215a475ecb0e797c3b33e447599e1c24001e01fd6f6c
secret=36e036dcb7
access_token=635e8c0eff0a73e804679ff07892b0b9dc0ef5e366842a55ce46ff430afd6c3de8f14396681bce6db056e
user_id=0
group_id=158897845
is_app_user=1
auth_key=d3dc3bdd79f7513f0972ffa6621c83f9
language=
&parent_language=3
is_secure=1
ads_app_id=6306700_c9dc8f16aa56c96f86
referrer=group&lc_name=3df2c31c
sign=23aec05966fbc543e4e5279d3c1e72f59c2912b126454156fa4045fd7a27832e
hash=


*/