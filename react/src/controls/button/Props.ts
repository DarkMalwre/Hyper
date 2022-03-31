/**
 * The button attributes.
 */
export default interface Props {
    children: string;

    type?: 'accent' | 'secondary' | 'outline' | 'text' | 'textAccent';

    onClick?: () => void;

    margin?: number | [number] | [number, number] | [number, number, number ] | [number, number, number, number];

    size?: 'small' | 'medium' | 'large';
}
