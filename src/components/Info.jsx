import PropTypes from "prop-types"
import "./Info.css"

export default function Info(props) {
    return (
        <div className="info">
            <span>{props.left}</span>
            <div className="line"></div>
            <span>{props.right}</span>
        </div>
    )
}

Info.propTypes = {
    left: PropTypes.string,
    right: PropTypes.string
}