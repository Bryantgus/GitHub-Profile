import "./Repositories.css"
import PropTypes from "prop-types"

export default function Repositories(props) {
    return (
        <div className="repository">
            <div className="title">
                <span>{props.title}</span>
            </div>
            <div className="content">
                <span>{props.content}</span>
            </div>
            <div className="moreInfo">
                <img src="/Nesting.svg" alt=""/>
                <span>{props.nest}</span>
                <img src="/Star.svg" alt="" />
                <span>{props.star}</span>
                <span>{props.update}</span>
            </div>
            <span></span>
        </div> 
    )
}

Repositories.propTypes = {
    title: PropTypes.string,
    content: PropTypes.string,
    nest: PropTypes.string,
    star: PropTypes.number,
    update: PropTypes.number
}