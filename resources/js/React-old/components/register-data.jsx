import { useContext, useEffect, useRef } from "react";
import { AppContext } from "../context/app";
import useHttpAxios from "../hooks/useHttpAxios";
import LOAD from "../global/load";

function RegisterData({ title, type, onload }) {

    const preview = useRef();
    const form = useRef();
    const { setChange, sectionId } = useContext(AppContext);
    const { state, start } = useHttpAxios({ method: 'POST', url: `/saveFormSectionOrItem/${type}/${sectionId}` });

    useEffect(() => {
        if (state == LOAD.complete) {
            setChange(true);
            onload();
        }
    }, [state]);

    return (
        <form ref={form} onSubmit={e => e.preventDefault()} encType="multipart/form-data">
            <h1>{title}</h1>
            <img src="" alt="" ref={preview} />
            <input type="file" name="photo" accept="image/*" onChange={e => {
                const prev = e.target.files[0];
                const reader = new FileReader();
                reader.onload = (ev) => {
                    preview.current.src = ev.target.result;
                }
                reader.readAsDataURL(prev);
            }} />

            <input type="text" name="description" placeholder="nombre" />
            <input type="text" name="traduction" placeholder="nombre ingles" />

            <button onClick={e => {
                start(new FormData(form.current));
            }}>click</button>
        </form>
    );
}

export default RegisterData;