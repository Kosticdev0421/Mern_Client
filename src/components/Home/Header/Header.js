import React from "react";
import headerImage from "../../../images/undraw_collab_8oes.svg";
import "./Header.css";

const Header = () => {
    return (
        <div className="header">
            <div>
                <p className="text-featured">
                    Ask The
                    <span>Impossible!</span>
                    &mdash; Free & Instant &mdash;
                </p>
              <button className="btn-brand">See All Questions</button>
              <button className="btn-brand">Ask A Question</button>
            </div>
            <div>
                <img src={headerImage} alt="" />
            </div>
        </div>
    );
};

export default Header;
