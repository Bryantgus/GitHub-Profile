import "./Repositories.css"
import PropTypes from "prop-types"

export default function Repositories(props) {
    return (
        <div className="repository">
            <span>{props.title}</span>
            <span>{props.content}</span>
            
        </div> 
    )
}

Repositories.propTypes = {
    title: PropTypes.string,
    content: PropTypes.string,
    nestingImg: PropTypes.string,
}