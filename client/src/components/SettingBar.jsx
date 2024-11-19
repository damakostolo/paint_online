import React from 'react';
import '../styles/toolbar.scss'
import toolState from "../store/toolState";


const SettingBar = () => {
    return (
        <div className='setting-bar'>
            <label style={{marginLeft: '15px'}} htmlFor="line-size">Толщина линии</label>
            <input
                onChange={e => toolState.setlineWidth(e.target.value)}
                style={{marginLeft: '15px'}}
                id="line-size"
                type='number'
                defaultValue={1} min={1} max={100} />
        </div>
    );
};

export default SettingBar;