console.info("[#крутикакВК] Я на странице!");

function showSpinnerSettings(content) {
    var content = '<div class="pedit_row clear_fix">\
      <div class="pedit_label">Своя иконка:</div>\
      <div class="pedit_labeled">\
      <input type="text" value="http://fetbiko.ru/spinners/steak.png" id="icon_link" class="dark" autocomplete="off">\
      </div>\
    </div>';


    showFastBox(
        "#кручукаквк",
        content,
        "Save", "No", "onNo");
}

function Save(key, data) {
    localStorage.setItem(key, data);
}

function Load(key) {
    localStorage.getItem(key);
}

ReplaceBoxLoader();
function ReplaceBoxLoader(url) {
    var boxLoader = document.getElementById("box_loader");
    var spinner = boxLoader.getElementsByClassName("fidget_spinner")[0];

    chrome.storage.sync.get(['icon'], function (data) {
        console.log(data);
        var link = data['icon'];
        console.log(link);

        spinner.setAttribute('style', "background: url('" + link + "') 50% / contain!important");
        console.info("[#крутикакВК] Я успешно заменил иконку загрузки!");
    });
}
