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

        // document.getElementById('btn-include')
        //         .href = 'https://vk.com/add_community_app?aid=' + app.appId;

        VK.init(null, null, app.API_VERSION);

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