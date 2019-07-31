function setCookie(sName,sValues,sTime){
    if (sTime){
        let oDay=new Date();
        oDay.setDate(oDay.getDate()+sTime);
        document.cookie=`${sName}=${sValues};expires=${oDay};path=/`;
    } else {
        document.cookie=`${sName}=${sValues};path=/`;
    }
}
function getCookie(sName){
    let arr=document.cookie.split('; ');

    for (let i=0;i<arr.length;i++){
        let arr2=arr[i].split('=');

        if (arr2[0]==sName){
           return arr2[1]
        }
    }
    return '';
}
function removeCookie(sName) {
    setCookie(sName,'aa',-1)
}