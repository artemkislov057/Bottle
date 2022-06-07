import React from "react";
import './commercRegisterPage.css';
import { DataContainer } from "./dataContainer"; 
import { DocumentContainer } from "./documentsContainer";

export const CommercRegistrationPage:React.FC = React.memo(() => {
    return <div className="commerc-registration-page">
        <form className="commerc-registration-data-side" id='commerc-registration-data-side-form'>
            <div className="commerc-registration-data-side-header">
                Регистрация
            </div>
            <DataContainer 
                headerName="Данные владельца компании:"
                fieldsNames={['Фамилия', 'Имя', 'Отчество', 'Email']}
            />
            <DataContainer 
                headerName="Данные компании:"
                fieldsNames={['Наименование', 'ИНН компании']}
            />
            <div className="commerc-registration-data-side-documents">
                <DocumentContainer titleName="Скан свидетельства ИНН:" />
                <DocumentContainer titleName="Скан свидетельства ОГРН:" />
            </div>
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