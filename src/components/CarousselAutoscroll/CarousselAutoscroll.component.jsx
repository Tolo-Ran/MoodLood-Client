import "./CarousselAutoscroll.styles.css";
import ImageProgressivelyLoading from "../ProgressiveImageLoader/ProgressiveImageLoader.component";
import {Carousel} from "antd";

const CarouselAutoscroll = () => (

    <Carousel
        arrows
    >
        <div>
            <ImageProgressivelyLoading/>
        </div>
        <div>
            <ImageProgressivelyLoading/>
        </div>
        <div>
            <ImageProgressivelyLoading/>
        </div>
        <div>
            <ImageProgressivelyLoading/>
        </div>
    </Carousel>
);

export default CarouselAutoscroll;