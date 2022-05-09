export interface ICity {
    id: string;
    platenumber: number;
    name: string;
    path: string;
    color?: string;
    strokeColor?: string;
    mask?: string;
    customTooltip?: JSX.Element;
}