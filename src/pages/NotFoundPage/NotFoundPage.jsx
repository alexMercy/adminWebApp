import {Button, Empty} from "antd";
import {useNavigate} from "react-router-dom";

export const NotFoundPage = () => {
    const navigate = useNavigate();
    return(
        <>
            <Button onClick={() => navigate(-1)}>Back</Button>
            <Empty />
        </>
    );
}