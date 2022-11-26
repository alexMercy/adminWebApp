import styles from "./styles.module.css";
import {Affix, Card} from "antd";
import React, {useState} from "react";


export const Title = ({video, title}) => {
    const [affixEffect, setAffixEffect] = useState({
        height: 150,
        fontSize: 48,
        margin: 0,
        alignItems: "center"
    });

    const onAffixChange = (affixed) => {
        affixed
            ? setAffixEffect({height: 50, fontSize: 24, margin: 5, alignItems: ""})
            :setAffixEffect({height: 150, fontSize: 48, margin: 0, alignItems: "center"});
    }

    return (
        <Affix onChange={onAffixChange} style={{width: "100%", zIndex: 1}} offsetTop={64}>
            <div className={styles.container}
                 style={{height: affixEffect.height, alignItems: affixEffect.alignItems}}>

                <video className={styles.video} style={{height: affixEffect.height}}
                       muted loop src={video} autoPlay={true}/>

                <Card  headStyle={{padding:0}}
                       bodyStyle={{padding: 0, paddingRight: 10, paddingLeft: 10}}
                       className={styles.title}
                       style={{fontSize: affixEffect.fontSize,
                           marginLeft: affixEffect.margin + "%", marginRight:affixEffect.margin + (80 * !!affixEffect.margin) + "%"}}
                >{title}</Card>

            </div>
        </Affix>
    );
}