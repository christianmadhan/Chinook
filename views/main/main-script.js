$( document ).ready(() => {
    if(sessionStorage.getItem('auth') == null){
        location.href = "http://localhost/apps/phpvariables/";
    }
});