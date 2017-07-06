var vm = new Vue({
    el: "#container",
    data: {
        methods: {
            isPortrait: function() {
                
            }
        },
        personal: {
            avatar: "./img/avatar.jpeg",
            name: "FetBiko",
            status: "Designer / Coder",
            links: [
                {
                    title: "VKontakte",
                    url: "https://vk.com/fetbiko",
                    icon: "./img/icons/vk.png"
                },
                {
                    title: "Twitter",
                    url: "https://twitter.com/fetbiko",
                    icon: "./img/icons/twitter.png"
                },
                {
                    title: "Instagram",
                    url: "https://instagram.com/fetbiko",
                    icon: "./img/icons/instagram.png"
                },
                {
                    title: "Telegram",
                    url: "https://t.me/fetbiko",
                    icon: "./img/icons/telegram.png"
                },
                {
                    title: "Dishots",
                    url: "https://dishots.com/u/fetbiko",
                    icon: "./img/icons/dishots.png"
                }
            ]
        },
        web: {
            background: "./img/bg/landscape.jpg"
        }
    },
    created: function() {
        console.info("Site initialized!");
    }
});
