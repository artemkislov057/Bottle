import '../../../../connections/hystModal/hystmodal.min'
import '../../../../connections/hystModal/hystmodal.min.css'
import './style_reg.css'

const registrationModal = new HystModal({
    linkAttributeName: "data-hystmodal",
    //настройки, см. API
});

const submitButton = document.querySelector('[type="submit"]');

/*submitButton.addEventListener('click', () => {
    const email = document.querySelector('[type="email"]');
    const password = document.querySelector('[type="password"]');
    const profileModal = getProfileModal();
    console.log(profileModal);
    
    
    const newUser = {
        nickname: "Nikaiвaaффtka",
        password: password.value,
        email: email.value,
        sex: "ne bilo",
    }

    const response = fetch('https://localhost:44358/api/account', {
    headers: {
        'Accept': 'application/json; charset=utf-8',
        'Content-Type': 'application/json;charset=UTF-8'
    },
        credentials: "include",
        method: 'POST',
        body: JSON.stringify(newUser)
    });
   
    response.then(g => {
        console.log(g);
    }).catch(g => {
        console.log('fuck');
    });
    
})
*/