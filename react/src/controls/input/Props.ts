export default interface PropsBase {
    defaultValue?: string;
    placeholder?: string;
    minLength?: number;
    maxLength?: number;
    mustInclude?: string[]; 
    canInclude?: string[];
    mustExclude?: string[];
}
