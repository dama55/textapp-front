import React, { useState } from "react";
import './Text_Content.css';

function One_Content(props){
    const date = new Date(props.registration_date);
    const dateText = `${date.getFullYear()}年${date.getMonth() + 1}月${date.getDate()}日\
    ${date.getHours()}時${date.getMinutes()}分`;
    const id = props.id;
    const number = props.no;


    return (
        <div className="Contents">
            <div className="content_row">
                    <div className="no">{props.no}</div>
                    <div className="text">{props.text}</div>
                    <div className="date">{dateText}</div>
                    <input className='button del' type="button" value={'delete'} onClick={props.removeHandler}/>
            </div>
        </div>

        
    );
}

export default One_Content;