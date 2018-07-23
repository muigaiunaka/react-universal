import React, { Component } from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import Logo from "../../assets/images/react.svg";
import "./SplitLayout.scss";
import Header from "../Header/Header";

const SplitLayout = (InnerComponent) => {
    class SplitLayoutWithComponent extends Component {
        
        render() {
            return (
                <main className="layout split d-flex">
                    <aside className="split-aside">
                        <img src={require("../../assets/images/pattern2.jpeg")} />
                    </aside>
                    <section className="split-content">
                        <Header />
                        <InnerComponent className="inner-component"/>
                    </section>
                </main>
            )
        }
    }
    function mapStateToProps(state) {
        return { authenticated: state.auth.authenticated };
    }

    return connect(mapStateToProps)(SplitLayoutWithComponent);
}

export default SplitLayout;