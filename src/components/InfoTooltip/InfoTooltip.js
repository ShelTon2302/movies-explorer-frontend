import './InfoTooltip.css'
import React from "react";
import accept from "../../images/accept.svg";
import error from "../../images/error.svg";

function InfoTooltip (props) {
    return (
        <div className={`InfoTooltip${props.isOpen ? ' InfoTooltip_visible' : ''}`}>
            <div className={`InfoTooltip__window`}>
                <button type="button" className="InfoTooltip__close-button" aria-label="Закрыть окно" onClick={props.onClose}></button>
                <img className="InfoTooltip__icon" alt="Иконка" src={(props.state.error) ? error : accept} />
                <h2 className="InfoTooltip__text">{props.state.msg}</h2>
            </div>
        </div>
    )
}

export default InfoTooltip;