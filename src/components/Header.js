import React from "react"
import css from "./Header.module.css"
import publicUrl from "../utils/publicUrl"

function Header(){
  return (
    <header className={css.header}>
      <div>
        <button>
          <img src={publicUrl("/assets/camera.svg")} alt="Camera"/>
        </button>
      </div>
      <div>
        <img src={publicUrl("/assets/logo.png")} alt="Logo"/>
      </div>
      <div>
        <button>
          <img src={publicUrl("/assets/message.svg")} alt="Camera"/>
        </button>
      </div>
    </header>
  )
}

export default Header