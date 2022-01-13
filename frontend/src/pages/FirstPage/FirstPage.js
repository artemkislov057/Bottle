import "./stylesheet.css"
import "./pages/registration/style_reg.css"
import "./pages/entrance/style.css"
import "./pages/create_profile/style_prof.css"
import '../../connections/hystModal/hystmodal.min'
import '../../connections/hystModal/hystmodal.min.css'
import { createCommModal } from './pages/registration/comercReg/modalCommercReg'
import screenmap from "../../../dist/img/screenmap.jpg"
import logo from "../../../dist/img/logo.svg"
import defaultAvatar from '../../../dist/img/defaultAvatarNormalPNG.png';

const createProfileModal = new HystModal({
    linkAttributeName: "data-hystmodal",
    //настройки, см. API
});

createCommModal()

const nickname = document.getElementById('nickname');
const email = document.getElementById('reg-email');
const password = document.getElementById('reg-password');
const secondPassword = document.getElementById('reg-password-two');
const emailRegex = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
let customAvatarButton = document.querySelector('.file-lable-input');
let avatar;

fetch(defaultAvatar).then(res => res.blob().then(x => avatar = x))

customAvatarButton.addEventListener('change', (e) => {
    avatar = e.target.files[0];
})

document.querySelector('.main-content_pic').innerHTML = `<img src=${screenmap} alt="screenmap" class="main-content-picture" />`;
document.querySelector('.page-logo').innerHTML = `<img src=${logo} alt="логотип" class="logo">`;
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
        console.log(request)
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
                let data = new FormData();
                data.append('file', avatar)
                fetch('https://localhost:44358/api/account/avatar', {
                    method: 'POST',
                    body: data,
                    credentials: 'include',      
                }).then(res => {                    
                    document.querySelector('.hystmodal__close').click();
                    document.location='./MainPage.html';
                    return res.json();
                })
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