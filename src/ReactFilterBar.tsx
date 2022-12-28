import hash from 'object-hash';
import { Component, createRef, ReactNode, RefObject } from "react";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
    faFilter,
    faXmark
} from '@fortawesome/free-solid-svg-icons';

import FilterItemPill from "./FilterItemPill";
import InputFilter from "./filters/InputFilter";
import DropdownFilter from './filters/DropdownFilter';
import { FilterSetting, FilterItem, FilterType, buildFilterText } from "./utils/SearchFilter";

interface FilterBarProp {
    filterSetting: FilterSetting[];
    onFilterUpdate: (result: FilterItem[]) => void;
}

interface FilterBarState {
    showDropdown: boolean;
    filterItems: FilterItem[];
    selectSetting?: FilterSetting;
}

class ReactFilterBar extends Component<FilterBarProp, FilterBarState> {
    private _dropdownRef: RefObject<HTMLDivElement> = createRef();
    constructor(prop: FilterBarProp) {
        super(prop);
        this.state = {
            showDropdown: false,
            filterItems: [],
        }
    }

    componentDidMount() {
        document.addEventListener('keydown', this._onKeyStroke);
        document.addEventListener("mousedown", this._handleClickOutside);
    }

    componentWillUnmount() {
        document.removeEventListener("mousedown", this._handleClickOutside);
        document.removeEventListener('keydown', this._onKeyStroke);
    }

    private _handleClickOutside = (event: any): void => {
        if (this._dropdownRef.current && !this._dropdownRef.current.contains(event.target)) {
            this.setState({
                showDropdown: false,
            });
        }
    }

    private _onKeyStroke = (e: KeyboardEvent): void => {
        if (e.key === 'Escape') {
            this.setState({
                showDropdown: false,
            });
        }
    }

    private _onDropdownClick = (setting: FilterSetting): void => {
        this.setState({
            showDropdown: false,
            selectSetting: setting
        });
    }

    private _onDialogHide = (): void => {
        this.setState({
            selectSetting: undefined
        })
    }

    private _onItemDelete = (h: string): void => {
        const filterItem = this.state.filterItems.filter((value: FilterItem) => hash(value) !== h);
        this.setState({
            filterItems: filterItem
        });
        this.props.onFilterUpdate(filterItem);
    }

    private _onItemClear = (): void => {
        if (this.state.filterItems.length === 0) return;
        this.setState({
            filterItems: []
        });
        this.props.onFilterUpdate([]);
    }

    private _onApply = (item: FilterItem): void => {
        const filterItem = [...this.state.filterItems, item];
        this.setState({
            filterItems: filterItem,
            selectSetting: undefined
        });
        this.props.onFilterUpdate(filterItem);
    }

    private _buildDialog = (): ReactNode => {
        const setting: FilterSetting | undefined = this.state.selectSetting;
        if (setting === undefined) {
            return (<></>);
        }
        switch (setting.type ?? FilterType.inputLike) {
            case FilterType.inputLike:
            case FilterType.inputEq:
                return (<InputFilter
                    setting={this.state.selectSetting!}
                    onHide={this._onDialogHide}
                    onApply={this._onApply}
                />)
            case FilterType.dropdown:
                return (<DropdownFilter
                    setting={this.state.selectSetting!}
                    onHide={this._onDialogHide}
                    onApply={this._onApply}
                />)
        }
    }

    render(): ReactNode {
        return (
            <div className="filter-bar">
                <div className="filter-bar--dialog">
                    {this._buildDialog()}
                </div>
                <div className="filter-bar--dropdown">
                    <button
                        className="filter-bar--btn filter-bar--dropdown-toggle"
                        onClick={() => { this.setState({ showDropdown: true }) }}
                    >
                        <FontAwesomeIcon icon={faFilter} />
                    </button>
                    <div
                        ref={this._dropdownRef}
                        className={`filter-bar--dropdown-menu ${this.state.showDropdown ? "show" : ""}`}
                    >
                        {this.props.filterSetting.map(
                            (setting: FilterSetting, index: number) => {
                                return <button
                                    className="filter-bar--dropdown-item filter-bar--btn"
                                    key={`filter-dropdown-${index}`}
                                    onClick={() => this._onDropdownClick(setting)}
                                >
                                    {setting.text}
                                </button>
                            })}
                    </div>
                </div>
                {
                    this.state.filterItems.length === 0 ?
                        <span className="filter-bar--filter-text">過濾器</span> :
                        this.state.filterItems.map(
                            (item: FilterItem) => {
                                const h = hash(item);
                                return (<FilterItemPill
                                    key={h}
                                    hash={h}
                                    className="filter-bar--item-pill"
                                    text={buildFilterText(this.props.filterSetting, item)}
                                    onDelete={this._onItemDelete}
                                />)
                            }
                        )
                }
                <button
                    className="filter-bar--btn filter-bar--clear"
                    onClick={this._onItemClear}
                >
                    <FontAwesomeIcon icon={faXmark} />
                </button>
            </div>
        )
    }
}

export default ReactFilterBar;