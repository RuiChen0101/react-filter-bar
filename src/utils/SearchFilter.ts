enum FilterType {
    inputEq,
    inputLike,
    dropdown,
}

enum FilterComparator {
    equal,
    like,
    in,
    bitEnable,
}

interface FilterOption {
    text: string;
    value: string | number;
}

interface FilterSetting {
    key: string;
    text: string;
    type?: FilterType;
    options?: FilterOption[];
}

interface FilterItem {
    key: string;
    comparator: FilterComparator;
    value: string | number | string[] | number[];
}

const buildFilterText = (setting: FilterSetting[], item: FilterItem): string => {
    const itemSetting = setting.find((value) => value.key === item.key)!;
    const text: string[] = [itemSetting.text, ':'];

    switch (item.comparator ?? FilterComparator.equal) {
        case FilterComparator.equal:
            text.push('equal');
            break;
        default:
            text.push('include');
            break
    }

    switch (itemSetting.type ?? FilterType.inputLike) {
        case FilterType.inputLike:
        case FilterType.inputEq:
            text.push(`${item.value}`);
            break;
        case FilterType.dropdown:
            text.push(_findOptionText(itemSetting.options ?? [], item.value as string | number));
            break;
    }

    return text.join(' ');
}

const _findOptionText = (options: FilterOption[], value: number | string): string => {
    return options.find((v: FilterOption) => v.value === value)?.text ?? "";
}

export { FilterType, FilterComparator, buildFilterText };
export type { FilterSetting, FilterItem, FilterOption }