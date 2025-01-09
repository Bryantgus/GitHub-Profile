import PropTypes from "prop-types"
import "./InfoComponent"

export default function Info(props) {
    return (
        <div className="info">
            <span>{props.left}</span>
            <span>{props.right}</span>
        </div>
    )
}

Info.propTypes = {
    left: PropTypes.string,
    right: PropTypes.string
}