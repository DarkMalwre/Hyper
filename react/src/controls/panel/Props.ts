export default interface Props {
    flowDirection?: 'row' | 'column';
    verticalAlign?: 'top' | 'center' | 'bottom';
    horizontalAlign?: 'left' | 'center' | 'right';
    width: number | string;
    maxWidth?: number | string;
    minWidth?: number | string;
    height: number | string;
    maxHeight?: number | string;
    minHeight?: number | string;
    padding?: number | string;
    margin?: number | string;
    spacing?: number | string;
    children: any;
    forgroundColor?: string;
    backgroundColor?: string;
}
