import { TextField } from '@mui/material';
import React, { useReducer, useEffect } from 'react';

function setFormDataDispatch(state, action) {
    return { ...state, ...action }
}

function Temp({ data = null, disabled = false }) {

    const [formData, setFormData] = useReducer(setFormDataDispatch, {});


    return (
        <div>
            <div>
                <label>Nombre:</label>

                <TextField value={formData.Nombre ?? ""} onChange={(e) => setFormData({ Nombre: e.target.value })} />

            </div>

        </div>
    );
}

export default Temp;
