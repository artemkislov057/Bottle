import { apiUrl } from "components/connections/apiUrl";
import { BottleRequestType } from "components/pages/MainPage/BottleRequestType";
import { UserInfoType } from "components/pages/MainPage/UserInfoType";
import React, { useEffect, useState } from "react";
import { Navigate, useNavigate } from "react-router-dom";
import { BottlesCard } from "./cardBuyBottles";
import './commercPart.css';

type TProps = {
    openLeftBar: Function
    closeThis: Function,
    isOrdinary: boolean
}

export const CommercPart:React.FC<TProps> =  React.memo((props) => {
    const [currentAccessCountBottles, setCurrentAccessCountBottles] = useState(0);
    const navigate = useNavigate();

    useEffect(() => {
        async function getCurrentCount() {
            let responseUserInfo = await fetch(`${apiUrl}/api/account`, {
                credentials: "include"
            });
            let userData = await responseUserInfo.json() as UserInfoType;
            let accessCount = userData.remainingBottlesCount;            
            setCurrentAccessCountBottles(accessCount)
        }

        getCurrentCount();
    }, []);

    function onClickOtherButton() {
        props.openLeftBar();
        props.closeThis();
    }

    function toCommercRegPage() {
        navigate('/commercial-registration');
    }

    function toPaymentPage(price: number) {
        navigate('/payment');
    }

    if(props.isOrdinary) {
        return <div className="commerc-part-container">
        <div className="commerc-part-data-side">
            <div className="commerc-part-data-side-header">
                <div className="commerc-part-data-side-header-button-container">
                    <button type="button" className="commerc-part-data-side-header-other-button" onClick={() => onClickOtherButton()}></button>
                    <div className="commerc-part-data-side-header-part-name">Меню</div>
                </div>                
            </div>
            <div className="commerc-part-data-side-bottles-preview">                
                
            </div>
            <div className="commerc-part-data-side-try-button-container">
                <button className="commerc-part-data-side-try-button" onClick={() => toCommercRegPage()}>Попробовать</button>
            </div>            
        </div>
        <div className="commerc-part-design-side">

        </div>
    </div>
    }

    return <div className="commerc-part-container">
        <div className="commerc-part-data-side">
            <div className="commerc-part-data-side-header">
                <div className="commerc-part-data-side-header-button-container">
                    <button type="button" className="commerc-part-data-side-header-other-button" onClick={() => onClickOtherButton()}></button>
                    <div className="commerc-part-data-side-header-part-name">Меню</div>
                </div>
                <div className="commerc-part-data-side-header-title">Управление бутылочками</div>
            </div>
            <div className="commerc-part-data-side-bottles-info">
                <div className="commerc-part-data-side-bottles-info-text-container">
                    <div className="commerc-part-data-side-bottles-info-text-title">Количество бутылочек уменьшается</div>
                    <div className="commerc-part-data-side-bottles-info-text-description">
                        <span>У вас осталось 
                            <span className="commerc-part-data-side-bottles-info-text-description-count"> {currentAccessCountBottles} </span> 
                            бутылочек.
                        </span>
                        <span>Вы можете в любой момент увеличить их количество.</span>
                    </div>
                </div>
                <div className="commerc-part-data-side-bottles-info-buy-cards-container">
                    <BottlesCard 
                        count={1}
                        discount={0}
                        price={150}
                        type={'one'}
                        onClick={toPaymentPage}
                    />
                    <BottlesCard 
                        count={5}
                        discount={20}
                        price={600}
                        type={'five'}
                        onClick={toPaymentPage}
                    />
                    <BottlesCard 
                        count={15}
                        discount={50}
                        price={1125}
                        type={'fiveteen'}
                        onClick={toPaymentPage}
                    />
                </div>
            </div>
        </div>
        <div className="commerc-part-design-side">

        </div>
    </div>
})