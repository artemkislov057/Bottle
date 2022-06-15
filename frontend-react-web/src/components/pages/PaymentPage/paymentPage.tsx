import React, { useEffect } from "react";
import './paymentPage.css';

export const PaymentPage:React.FC = React.memo(() => {
    useEffect(() => {
        //@ts-ignore
        const checkout = new window.YooMoneyCheckoutWidget({
            confirmation_token: 'confirmation-token', //Токен, который перед проведением оплаты нужно получить от ЮKassa
            return_url: 'https://merchant.site', //Ссылка на страницу завершения оплаты
        
            //Настройка виджета (при необходимости)
            customization: {
                //Настройка цветовой схемы, минимум один параметр, значения цветов в HEX
                colors: {
                    //Цвет акцентных элементов: кнопка Заплатить, выбранные переключатели, опции и текстовые поля
                    control_primary: '#00BF96' //Значение цвета в HEX
                }
            },
            //@ts-ignore
            error_callback: function(error) {
                //Обработка ошибок инициализации
            }
        });
        
        //Отображение платежной формы в контейнере
        checkout.render('payment-form');
    }, [])
    


    return <div className="payment-page">
        <div id='payment-form' className="payment-form">

        </div>
    </div>
})