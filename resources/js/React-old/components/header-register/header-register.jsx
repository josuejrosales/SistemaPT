import { useState } from "react";
import ModalRoot from "../modal-root/modal-root";
import RegisterData from "../register-data";
import './header-register.css';

const modalInitial = { open: false, close: false, type: "" };

function HeaderRegister() {

    const [modal, setModal] = useState(modalInitial);

    return (
        <div className="content-register">
            <button onClick={e => setModal({ ...modal, open: true, type: "section" })}>registrar seccion</button>
            <button onClick={e => setModal({ ...modal, open: true, type: "item" })}>registrar item</button>
            {
                modal.open &&
                <ModalRoot classRoot="modal-space-fixed" classContent="modal-content"

                    modal={modal} setModal={setModal}
                    timeClose={500}

                    hideClick={true} onClose={() => {
                        setModal(modalInitial)
                    }}>

                    <RegisterData type={modal.type} onload={() => setModal({ ...modal, close: true })} />

                </ModalRoot>
            }
        </div>
    );
}

export default HeaderRegister;