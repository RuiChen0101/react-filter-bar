import { Component, ReactNode } from "react";
import { faXmark } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

interface FilterItemPillProp {
    className?: string;
    hash: string;
    text: string;
    onDelete: (hash: string) => void;
}

class FilterItemPill extends Component<FilterItemPillProp>{
    render(): ReactNode {
        return (
            <div className={`filter-item-pill ${this.props.className ?? ""}`}>
                <span>{this.props.text}</span>
                <button
                    className="filter-bar--btn"
                    onClick={() => this.props.onDelete(this.props.hash)}
                >
                    <FontAwesomeIcon icon={faXmark} size="xs" />
                </button>
            </div>
        )
    }
}

export default FilterItemPill;