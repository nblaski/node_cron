const stageArray = ["Quoting", "Engineering", "Prepress"];

function setField() {
    let stageValue = document.getElementById('stageValue').innerText;
    // console.log('stageValue: ' + stageValue);
    for (var i = 0; i < stageArray.length; i++) {
        // console.log(stageArray[i]+ " " + i);
        // console.log('stageValue: ' + stageValue)
        if (stageValue === null || stageValue == undefined) {
            console.log("null or undefined");
        } else if (stageValue === stageArray[i]) { 
            var opt = document.getElementById('s'+ i);
                opt.selected = true;
        }
    }
}    

setField();
