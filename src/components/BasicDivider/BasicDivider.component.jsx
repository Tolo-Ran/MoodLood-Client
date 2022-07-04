import {ToastContainer} from "react-toastify";
import {Divider} from "antd";

const BasicDivider = ({titleHeader}) => {

    return (
        <>
            <ToastContainer/>
            <Divider orientation={"left"}>
                <h4>
                    {titleHeader}
                </h4>
            </Divider>
        </>
    );
};
export default BasicDivider;