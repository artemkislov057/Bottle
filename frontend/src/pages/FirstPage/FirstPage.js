import "./stylesheet.css"
import "./pages/registration/style_reg.css"
import "./pages/entrance/style.css"
import "./pages/create_profile/style_prof.css"
// import "./pages/create_profile/script_prof"
// import "./pages/entrance/script"
// import "./pages/registration/script_reg";
import "./hystmodal.min"
// import "./hystmodal.min.css"
import '../MainPage/hystModal/hystmodal.min.css'
import screenmap from "../../../dist/img/screenmap.jpg"
import logo from "../../../dist/img/logo.svg"

const createProfileModal = new HystModal({
    linkAttributeName: "data-hystmodal",
    //настройки, см. API
});




const email = document.getElementById('reg-email');
const password = document.getElementById('reg-password');
const secondPassword = document.getElementById('reg-password-two');
const emailRegex = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

document.querySelector('.main-content_pic').innerHTML = `<img src=${screenmap} alt="screenmap" class="main-content-picture" />`;
document.querySelector('.page-logo').innerHTML = `<img src=${logo} alt="логотип" class="logo">`;
console.log('asdfhdsfhsdf');
(function registerModal() {
    document.querySelector('.button-register').addEventListener('click', () => {
        document.querySelector('.validation-reg').textContent = '';
    });

    document.getElementById('reg-submit').addEventListener('click', () => {
        const emailIsValid = emailRegex.test(email.value);
        if (password.value !== secondPassword.value 
            | !emailIsValid | password.value === '' 
            | secondPassword.value === '') {
            setTimeout(() => {
                document.querySelector('.hystmodal__close').click();
                document.querySelector('.button-register').click();
                checkRegisterData(password.value, secondPassword.value, email.value);
            }, 0);
        }
    });

    function checkRegisterData(pass, secondPass, login) {
        const emailIsValid = emailRegex.test(login);
        let result = 'Некорректные данные';
        if (pass== '' && secondPass === '')
            result = 'Напишите пароль';
        if (pass != secondPass && emailIsValid) 
            result = 'Пароли не совпадают';
        if (!emailIsValid && pass === secondPass) 
            result = 'Некорректный email';
        document.querySelector('.validation-reg').textContent = result;
    }
})();



(function profileModal() {
    let gender;
    document.querySelector('.gender-man').addEventListener('click', () => gender = 'male');
    document.querySelector('.gender-women').addEventListener('click', () => gender = 'female');
    document.getElementById('reg-submit').addEventListener('click', () => {
        document.querySelector('.validation-prof').textContent = '';
    });

    document.getElementById('create-prof-submit').addEventListener('click', () => {
        const request = {
            nickname: nickname.value,
            password: password.value,
            email: email.value,
            sex: gender,
            commercialData: null
        }

        console.log('click');
        fetch('https://localhost:44358/api/account', {
            method: 'POST',        
            body: JSON.stringify(request),
            credentials: 'include',
            headers: {
                'Content-Type': 'application/json'
            }
        })
        .then(res => {
            if(!res.ok) {
                res.text().then(text => {
                    document.querySelector('.validation-prof').textContent = text;
                })
            }
            else {
                document.querySelector('.hystmodal__close').click();
                document.location='./MainPage.html';
                return res.json();
            }    
        })
        .then(res => console.log(res));
        
    });
})();



(function entranceModal() {
    document.querySelector('.button-entry').addEventListener('click', () => {
        document.querySelector('.validation-entr').textContent = '';
    });

    document.getElementById('entr-submit').addEventListener('click', () => {
        console.log('click');
        const email = document.getElementById('entr-email');
        const password = document.getElementById('entr-password');
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
        .then(res => {
            if(!res.ok) {
                res.text().then(text => {
                    document.querySelector('.validation-entr').textContent = text;
                })
            }
            else {
                document.querySelector('.hystmodal__close').click();
                document.location='./MainPage.html';
                return res.json();
            } 
        })
        .then(res => {
            console.log(res)
        })
    });
})();


