export interface FormItemHintType {
    text?: string,
    status?: 'danger' | ''
}

export interface FormItemType {
    required?: boolean,
    label?: string,
    color?: string,
    placeholder?: string,
    disabled?: boolean,
    readonly?: boolean,
    density?: 'compact' | 'comfortable',
    suffix?: string,
    rounded?: string,
    hint?: FormItemHintType,
    clearable?: boolean
}

export type FormRulesVType = undefined | string | number

export type FormRulesType = ((v: FormRulesVType) => boolean | string)[];
