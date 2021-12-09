let email;
let password;
let secondPassword;

const registerUserButton = document.getElementById('reg-submit');
registerUserButton.addEventListener('click', () => {
    email = document.getElementById('reg-email');
    password = document.getElementById('reg-password');
    secondPassword = document.getElementById('reg-password-two');
    // while (password.value !== secondPassword.value) {
    //     alert('Пароли не совпадают')
    // }
    console.log(email.value);
    console.log(password.value);
    console.log(secondPassword.value);
    
});


let gender;

document.querySelector('.gender-man').addEventListener('click', () => {
    gender = 'male';
    console.log(gender);
});
document.querySelector('.gender-women').addEventListener('click', () => {
    gender = 'female';
    console.log(gender);
});

const createProfileButton = document.getElementById('nickname');

document.getElementById('create-prof-submit').addEventListener('click', () => {
    const request = {
        nickname: nickname.value,
        password: password.value,
        email: email.value,
        sex: gender,
        commercialData: null
    }

    console.log('click')
    fetch('https://localhost:44358/api/account', {
        method: 'POST',        
        body: JSON.stringify(request),
        credentials: 'include',
        headers: {
            'Content-Type': 'application/json'
          }
    })
    .then(res => res.json())
    .then(res => {
        console.log(res)
    })

});

document.getElementById('entr-submit').addEventListener('click', () => {
    console.log('click');
    email = document.getElementById('entr-email');
    password = document.getElementById('entr-password');
    const request = {
        email: email.value,
        password: password.value
    };
    
    fetch('https://localhost:44358/api/account/login', {
        method: 'POST',        
        body: JSON.stringify(request),
        credentials: 'include',
        headers: {
            'Content-Type': 'application/json'
          }
    })
    .then(res => res.json())
    .then(res => {
        console.log(res)
    })
});