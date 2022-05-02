import React from "react";
import './footerStartPage.css';

export const FooterStartPage:React.FC = React.memo(() => {
    return <div className="start-page-footer-container">
        <div className="start-page-footer-wave-first" onMouseMove={() => console.log('левая')}></div>
        <div className="start-page-footer-wave-second" onMouseMove={() => console.log('правая')}></div>
    </div>
})
