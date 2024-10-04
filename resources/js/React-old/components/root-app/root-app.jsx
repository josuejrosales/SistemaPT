import { useContext, useEffect } from "react";
import { useParams } from "react-router-dom";
import useHttpAxios from "../../hooks/useHttpAxios";
import { AppContext } from "../../context/app";
import LOAD from "../../global/load";
import './root-app.css';
import HeaderRegister from "../header-register/header-register";

function RootApp({ SectionUrl, ItemsUrl }) {

    const { navigate, change, setChange, setSectionId, page } = useContext(AppContext);

    const { id_param } = useParams();

    const id_param_bool = (new Boolean(id_param)).valueOf();

    const Items = useHttpAxios({
        url: id_param_bool ? `${ItemsUrl}/${id_param}` : ItemsUrl
    });


    const sectionRoot = useHttpAxios({
        url: id_param_bool ? `${SectionUrl}/${id_param}` : SectionUrl
    });


    useEffect(() => {
        if ([LOAD.fail, LOAD.complete].includes(Items.state)) {
            setChange(false);
        }
    }, [Items.state]);

    useEffect(() => {
        if (change == false) return;
        Items.start();
    }, [change]);


    useEffect(() => {

        sectionRoot.start();
        setChange(true);

        setSectionId(id_param_bool ? parseInt(id_param) : 0);
        page.current.classList.remove("show-page");
        void page.current.offsetWidth;
        page.current.classList.add("show-page");

    }, [id_param, page]);


    return (
        <>
            {
                <>
                    <div className="header-section">
                        {
                            sectionRoot.state == LOAD.complete && <>
                                <div className="description">
                                    <h2>{sectionRoot.data.description}</h2>
                                    <p>{sectionRoot.data.traduction}</p>
                                </div>
                                <img src={sectionRoot.data.photo} alt="" />
                            </>
                        }
                    </div>
                    <div>
                        <HeaderRegister />
                        <div className="body-section-item">
                            {
                                Items.state == LOAD.complete && Items.data.map((element, i) =>
                                    element.type == 'section' ?
                                        <button key={i} className={element.type} onClick={() => navigate(`/select/${element.id}`)}>
                                            <img src={element.photo} alt="" />
                                            <div>
                                                {element.description}
                                            </div>
                                        </button>
                                        :
                                        <div key={i} className={element.type}>
                                            <img src={element.photo} alt="" />
                                            <div>
                                                {element.description}
                                            </div>
                                        </div>
                                )
                            }
                        </div>
                    </div>
                </>
            }
        </>

    );
}

export default RootApp;