import { apiUrl } from "components/connections/apiUrl";
import { ContextLogin } from "loginContext";
import React, { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import './commercRegisterPage.css';
import { DataContainer } from "./dataContainer"; 
import { DocumentContainer } from "./documentsContainer";

type CommercialData = {
    // fullname: string
    firstName: string
    secondName: string
    patronymic: string
    email: string
    password: string
    secondPassword: string
    companyName: string
    itn: string
    psrn: string
}

export const CommercRegistrationPage:React.FC = React.memo(() => {
    const [commercData, setCommercData] = useState<CommercialData>();
    const loginData = useContext(ContextLogin);
    const navigate = useNavigate();


    function updateCommercData(currentField: string, value: string) {
        setCommercData({...commercData, [currentField]: value});
    }

    async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
        e.preventDefault();
        if(commercData.password !== commercData.secondPassword) {
            alert('Пароли не совпадают');
            return;
        }
        let response = await fetch(`${apiUrl}/api/account`, {
            method: 'POST',
            body: JSON.stringify({
                nickname: commercData.email.split('@')[0],
                password: commercData.password,
                email: commercData.email,
                sex: "?"                   
            }),
            credentials: 'include',
            headers: {
                "content-type": 'application/json'
            }
        });
        if(response.ok) {
            console.log('регистрация обычного акк успешна');
            let responseCommerc = await fetch(`${apiUrl}/api/commercial/make`, {
                method: 'POST',
                body: JSON.stringify({
                    fullName: `${commercData.secondName} ${commercData.firstName} ${commercData.patronymic}`,
                    contactPerson: '?',
                    email: commercData.email,
                    phoneNumber: '?',
                    identificationNumber: commercData.itn,
                    psrn: commercData.psrn
                }),
                credentials: 'include',
                headers: {
                    "content-type": 'application/json'
                }
            });
            if(responseCommerc.ok) {
                loginData.setIsLogin(true);
                console.log('регистрация коммерции успешна')
                navigate('/mainPage');
            } else {
                navigate('/');
                console.log('не успешно ничего..')
            }
        } else {
            navigate('/');
            console.log('не успешно ничего..')
        }
        
    }

    return <div className="commerc-registration-page">
        <form className="commerc-registration-data-side" id='commerc-registration-data-side-form' onSubmit={e => onSubmit(e)}>
            <div className="commerc-registration-data-side-header">
                Регистрация
            </div>
                <DataContainer 
                    headerName="Данные владельца компании:"
                    fieldsNames={[
                        // {field: 'fullname' , title: 'ФИО'}, 
                        {field: 'secondName' , title: 'Фамилия'}, 
                        {field: 'firstName', title: 'Имя'}, 
                        {field: 'patronymic', title: 'Отчество'}, 
                        {field: 'email', title: 'Email', type: 'email'},                         
                    ]}
                    updateData={updateCommercData}
                />
                <DataContainer 
                    headerName="Данные компании:"
                    fieldsNames={[
                        {field: 'companyName', title: 'Наименование'}, 
                        {field: 'itn', title: 'ИНН компании'}, 
                        {field: 'psrn', title: 'ОГРН компании'}
                    ]}
                    updateData={updateCommercData}
                />                
                <div className="commerc-registration-data-side-documents">
                    <DocumentContainer titleName="Скан свидетельства ИНН и ОГРН (одним файлом):" />
                </div>
                <DataContainer 
                    headerName=""
                    fieldsNames={[
                        {field: 'password', title:'Пароль', type: 'password'},
                        {field: 'secondPassword', title:'Повторите пароль', type: 'password'}
                    ]}
                    updateData={updateCommercData}
                />
            <button 
                type="submit" 
                className="commerc-registration-data-side-register-button" 
                form="commerc-registration-data-side-form"
            >
                Зарегистрироваться
            </button>
        </form>
        <div className="commerc-registration-description-side">

        </div>
    </div>
})