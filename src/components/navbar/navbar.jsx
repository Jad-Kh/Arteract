import React from 'react'
import "./navbar.css"
import { NotificationsNone, Language, Settings } from "@material-ui/icons"

export default function Navbar() {
    return (
    <div className="navbar">
        <div className="navbarWrapper">
          <div className="navLeft">
              <span className="logo">Arteract</span>
          </div>
          <div className="navRight">
              <div className="navIcons">
                <NotificationsNone/>
                <span className="navIconNumber">2</span>
              </div>
              <div className="navIcons">
                <Language/>
                <span className="navIconNumber">2</span>
              </div>
              <div className="navIcons">
                <Settings/>
              </div>
              <img src="./images/profiletest.jpg" alt="" className="navAvatar"/>
          </div>
        </div>
    </div>
    )
}