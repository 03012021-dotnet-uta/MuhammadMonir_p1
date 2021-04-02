let user = JSON.parse(sessionStorage.getItem("user"));
let userelement = document.querySelector('.userelement');
if(user)
{
    userelement.innerHTML = `<span style="float:right">You are logged in as ${user.email}</span>`;
}
