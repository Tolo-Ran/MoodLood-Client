import {Button} from "antd";

const PrimaryButton = ({innerText, icon, htmlType, ...restProps}) => {
    return (
        <Button
            shape={"round"}
            icon={icon}
            className="me-3"
            htmlType={htmlType}
            {...restProps}>
            {innerText}
        </Button>
    )
}
export default PrimaryButton;