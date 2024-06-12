import './Text_Content.css';
import { useState, useEffect } from "react";
import One_Content from './One_Content';
import axios from 'axios';

function My_Page() {
    const [display_text, setDisplay] = useState('Up Load Text');
    const baseURL = 'http://localhost:5000';
    const [contents, setContents] = useState([]);

    useEffect( () => {
        update();

    }, [])

    const update = () => {
        axios.get(baseURL + "/get-texts").then((response) => {
            setContents(response.data);
            console.log(response.data);
        }).catch(err => {
            console.error("Failed to get response", err);
        });
    }

    const Add_handler = (text) => {
        axios.post(baseURL + "/save-text", {text: text})
        .then(() => {
            update();
        }).catch(err => {
            console.error("Failed to add text", err);
        })
    }
    const Remove_handler = (id) => {
        axios.delete(baseURL + "/save-text", {id: id})
        .then(() => {
            update();
        }).catch(err => {
            console.error("Failed to ")
        })
    }

    const rows = contents.map((content, index) => {
        return <One_Content key = {content.id} no={index+1}  {...content} />
        // console.log("here!")
    })

    return (
        <div className="My_Page">
        
            <div>
                <h1 className='page--title'>TEXT<br />SAVER</h1>
                <h2 className='page--select-title'>{display_text}</h2>
            </div>
            
            <div className='input_box'>
                <input className='input_text' type="text" />
                <input className='button' type="button" value={'add'}/>
            </div>
            
            <div className="content_row root">
                <div className="no">No.</div>
                <div className="text">Text.</div>
                <div className="date">Date.</div>
                <input className='button del' type="button" value={'delete'}/>
            </div>
            {rows}
        </div>

    );
}

export default My_Page;