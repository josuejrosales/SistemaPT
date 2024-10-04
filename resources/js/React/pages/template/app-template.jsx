import React, { useEffect, useState } from "react";
import { BrowserRouter, NavLink } from "react-router-dom";
import AppContextProvider from "../../contexts/appContext.jsx";
import { getSvgNav } from "../../svg/nav.jsx";
import { NavLinkUser } from "../../global/app.js";
import Search from "../../components/search.jsx";
import ToastInline from "../../components/toast-inline.jsx";
import './app-template.css';

const modalNavInitial = { open: false, close: false, process: false };

function Templater({ title = "Admin", children }) {
  const [modalNav, setModalNav] = useState(modalNavInitial);
  const [floatNav, setFloatNav] = useState(false);

  const updateResize = (width) => {
    width <= 900
      ? !floatNav && setFloatNav(true)
      : !floatNav && setFloatNav(false);
  };

  const resetModalNav = () => {
    setModalNav({ open: false, close: false, process: false });
  };

  useEffect(() => {
    if (modalNav.close) {
      setTimeout(() => resetModalNav(), 500);
    }
  }, [modalNav.close]);

  useEffect(() => {
    if (modalNav.open) {
      setTimeout(() => {
        setModalNav({ ...modalNav, progress: false });
      }, 500);
    }
  }, [modalNav.open]);

  useEffect(() => {
    floatNav == false && resetModalNav();
  }, [floatNav]);

  useEffect(() => {
    updateResize(window.innerWidth);
    window.onresize = function () {
      updateResize(this.innerWidth);
    };
  }, []);

  return (
    <div className="container-root">
      <BrowserRouter>
        <AppContextProvider>
          <div
            className={`container-nav ${modalNav.open && "open"} ${modalNav.close && "close"
              }`}
          >
            <div className="title-nav">{title}</div>
            <div className="nav-menu">
              {NavLinkUser.map((item, i) => (
                <NavLink
                  to={item.link}
                  key={i}
                  onClick={(e) => {
                    modalNav.progress == false &&
                      setModalNav({ ...modalNav, close: true });
                  }}
                >
                  {getSvgNav("home")}
                  {item.title}
                  <span className="info-item-nav">23</span>
                </NavLink>
              ))}
            </div>
            {floatNav && (
              <button
                style={{ top: "2rem" }}
                className="btnModalClose"
                onClick={(e) =>
                  modalNav.progress == false &&
                  setModalNav({ ...modalNav, close: true })
                }
              >
                {getSvgNav("close-modal", 30)}
              </button>
            )}
          </div>
          {floatNav && (
            <div
              className={`fixed-nav-left content-fixed ${modalNav.open && "active"
                } ${modalNav.close && "close"}`}
              onClick={(e) =>
                modalNav.progress == false &&
                setModalNav({ ...modalNav, close: true })
              }
            ></div>
          )}
          <div className="container-body">
            <div className="body-header">
              {floatNav && (
                <button
                  className="btn-open-nav-left"
                  onClick={(e) =>
                    setModalNav({ ...modalNav, open: true, process: true })
                  }
                >
                  {getSvgNav("open-nav-left", 30)}
                </button>
              )}
              <Search />
              <ToastInline icon="user" nameClass="btn-active">
                <a href="/login-close">
                  Cerrar Session
                  {getSvgNav("close-session")}
                </a>
              </ToastInline>
            </div>
            <div
              className="body-content"
              style={{ borderTopLeftRadius: floatNav ? "0" : "revert-layer" }}
            >
              {children}
            </div>
          </div>
        </AppContextProvider>
      </BrowserRouter>
    </div>
  );
}

export default Templater;
