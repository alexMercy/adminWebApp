import styles from "./styles.module.css";
import {Affix, Card} from "antd";
import React, {useState, useRef} from "react";
import { Transition } from 'react-transition-group';


export const Title = ({video, title}) => {

    const nodeRef = useRef(null);

    const defaultStyle = {
        container: {
            height: 150,
            alignItems: "center",
            transition: `all 500ms ease-in-out`,
        },

        card: {
            textAlign: "center",
            fontSize: 48,
            marginLeft: "60%",
            marginRight:"30%",
            borderRadius: 0,
            transition: `all 500ms ease-in-out`,
        },
    }

    const [affixEffect, setAffixEffect] = useState(false);

    const onAffixChange = (affixed) => {
        affixed
            ? setAffixEffect(true)
            :setAffixEffect(false);
    }
    const transitionStyles = {
        entering: {
            container: {height: 50, alignItems: "",},
            card: {textAlign: "left",fontSize: 24, marginLeft: "5%", marginRight:"85%", borderRadius: 20,},},

        entered:  {
            container: {height: 50, alignItems: "",},
            card: {textAlign: "left", fontSize: 24, marginLeft: "5%", marginRight:"85%", borderRadius: 20,},},

        exiting:  {
            container: {height: 150, alignItems: "center",},
            card: {textAlign: "center", fontSize: 48, marginLeft: "40%", marginRight:"40%", borderRadius: 0,},},

        exited:  {
            container: {height: 150, alignItems: "center",},
            card: {textAlign: "center", fontSize: 48, marginLeft: "40%", marginRight: "40%", borderRadius: 0,},},

    };

    return (
        <Transition nodeRef={nodeRef} in={affixEffect} timeout={300}>
            {state => (
                <div ref={nodeRef} style={{  transition: `all 500ms ease-in-out`,}}>
                    <Affix onChange={onAffixChange} style={{maxWidth: "100%", zIndex: 1}} offsetTop={64}>
                        <div className={styles.container}
                             style={{...defaultStyle.container, ...transitionStyles[state].container}}>

                            <video className={styles.video}
                                   style={{height:transitionStyles[state].container.height,
                                       transition: `all 500ms ease-in-out`,}}
                                   muted loop src={video} autoPlay={true}></video>

                            <Card  headStyle={{padding:0}}
                                   bodyStyle={{padding: 0, paddingRight: 10, paddingLeft: 10}}
                                   className={styles.title}
                                   style={{...defaultStyle.card, ...transitionStyles[state].card}}
                            >{title}</Card>
                        </div>
                    </Affix>
                </div>
            )}
        </Transition>
    );
}