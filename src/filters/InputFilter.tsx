import { Component, ReactNode } from "react";

import FilterDialog from "../FilterDialog";
import { FilterComparator, FilterItem, FilterSetting, FilterType } from "../utils/SearchFilter";

interface InputFilterProp {
    setting: FilterSetting;
    onHide: () => void;
    onApply: (item: FilterItem) => void;
}

class InputFilter extends Component<InputFilterProp> {
    private _value: string = "";

    private _onApply = (): void => {
        if (this._value === "") {
            this.props.onHide();
            return;
        }
        const type = this.props.setting.type ?? FilterType.inputLike;
        this.props.onApply({
            key: this.props.setting.key,
            comparator: type === FilterType.inputLike ? FilterComparator.like : FilterComparator.equal,
            value: this._value
        });
    }

    render(): ReactNode {
        const type = this.props.setting.type ?? FilterType.inputLike;
        return (
            <FilterDialog
                className="input-filter"
                setting={this.props.setting}
                width="300px"
                onHide={this.props.onHide}
                onApply={this._onApply}
            >
                <div className="input-filter--body">
                    <div className="text-start">
                        <label>{type === FilterType.inputLike ? "包含" : "等於"}</label>
                        <input placeholder="值" onChange={(e) => this._value = e.target.value} />
                    </div>
                </div>
            </FilterDialog>
        )
    }
}

export default InputFilter;