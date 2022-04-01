export default interface PropsBase {
    defaultValue?: string;
    placeholder?: string;
    minLength?: number;
    maxLength?: number;
    mustInclude?: string[]; 
    canInclude?: string[];
    mustExclude?: string[];
    onChange?: (value: string) => void;
    onClear?: () => void;
    onEnter?: (value: string) => void;
}
