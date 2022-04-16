import { Component } from 'react';
import "./style.css";
import { DoubleRightOutlined, DoubleLeftOutlined } from '@ant-design/icons';

class Modal extends Component {
    constructor(props) {
        super(props);
        this.state = {
            index: this.props.index
        };
    }

    imageChange = (index) => {
        this.setState({
            index: index
        });
    }

    render() {
        console.log(this.props.images);
        const thumbnails = this.props.images.map((image, index) =>
            <img onClick={() => { console.log(index);this.imageChange(index);}} src={image} alt="alt" />
        );
        const currentImage = this.props.images[this.state.index];
        const length = this.props.images.length;

        return (
            <div className="background2" onClick={() => this.props.close(null)}>
                <div className="modal2" onClick={(e) => e.stopPropagation()}>
                    <div className="viewer">
                        <span onClick={() => this.imageChange((this.state.index + length - 1) % length)}><DoubleLeftOutlined /></span>
                        <img src={currentImage} />
                        <span onClick={() => this.imageChange((this.state.index + 1) % length)}><DoubleRightOutlined /></span>
                    </div>
                    <div className="thumbnails">
                        {thumbnails}
                    </div>
                </div>
            </div>
        );
    }
}

export default Modal;