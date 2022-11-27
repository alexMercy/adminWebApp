import {Affix, Card, Typography, Input, Button, Tag} from "antd";
import React, {useState} from "react";
import {PlusCircleOutlined} from "@ant-design/icons";


export const CreateTodoItem = ({onAddClick} ) => {

    const buttonStyle = {
        tag: {
            width: 90,
            height: 25,

            display: "flex",
            alignItems: "center",
            justifyContent: "center"
        },
        add: {
            display: "flex",
            alignItems: "center",
            justifyContent: "center"
        }
    }

    const tagStyle = {
        completed: {
            color: "lime",
            status: "COMPLETED"
        },
        inProgress: {
            color: "volcano",
            status: "IN PROGRESS"
        },
    }

    const [item, setItem] = useState({
        tag: tagStyle.inProgress,
        text: ""
    })

    const onTagClick = () => {
        if(item.tag.status === tagStyle.inProgress.status) {
            setItem(prevState => {
                prevState = {...prevState};
                prevState.tag = tagStyle.completed;
                return prevState;
            })
            return;
        }
        setItem(prevState => {
            prevState = {...prevState};
            prevState.tag = tagStyle.inProgress;
            return prevState;
        })
    };

    const onTextChange = (text) => {
        setItem(prevState => {
            prevState = {...prevState};
            prevState.text = text;
            return prevState;
        })
    }


    return (
        <Affix offsetTop={250}>
            <div>

                <Typography.Title  style={{fontWeight: 900}} level={3}>Create:</Typography.Title>

                <Card title={<Button onClick={onTagClick} type={"text"} style={buttonStyle.tag} >
                            <Tag style={{margin: 0}} color={item.tag.color}>{item.tag.status}</Tag></Button>}

                      type={"inner"}
                      bordered={false}

                      extra={<Button style={buttonStyle.add} shape={"circle"} type={"text"} onClick={() => onAddClick(item)}
                                     icon={<PlusCircleOutlined style={{fontSize: 20}}/>}/>}

                      style={{maxWidth: 300, minHeight: 200, marginBottom: 20, fontSize:14}}
                      hoverable="true">

                    <Input maxLength={350} style={{fontWeight: 500,minHeight: 120, maxHeight: 330}}
                           onChange={(event) => onTextChange(event.target.value)} placeholder="Enter text..." />
                </Card>
            </div>
        </Affix>);
}


