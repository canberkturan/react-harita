import { ICity } from "./types";
import "./style.css";
import { useEffect, useState } from "react";

const CityComponent = (params: any) => {
    return <g id={params.city.id} data-platenumber={params.city.platenumber} data-name={params.city.name}
                onMouseOver={params.mouseOverHandler} onMouseOut={params.mouseOutHandler} onMouseMove={params.mouseMoveHandler}
                onClick={params.onClick}>
                <path d={params.city.path} fill={params.overrideFill !== undefined ? params.overrideFill : params.city.color !== undefined ? params.city.color : "#555555"} 
                        stroke={params.city.strokeColor !== undefined ? params.city.strokeColor : "none" } strokeWidth={2}/>
           </g>;
}

const Map = (params: any) => {
    const [cityList, setCityList] = useState(params.cities);
    const [tooltip, setTooltip] = useState<JSX.Element>(<></>);
    const [tooltipTop, setTooltipTop] = useState<string>();
    const [tooltipLeft, setTooltipLeft] = useState<string>();

    useEffect(() => {
        setCityList(params.cities);
    }, [params.cities])
    
    const handleMouseOver = (event: any) => {
        const cityData = event.target.parentNode.dataset;
        const customTooltip = cityList.find((city: ICity) => city.platenumber.toString() === cityData.platenumber)?.customTooltip;
        setTooltip(customTooltip || <div>{cityData.name}</div>);
    }
    const handleMouseOut = (event: any) => {
        setTooltip(<></>);
    }
    const handleMouseMove = (event: any) => {
        setTooltipTop(event.pageY + 25 + 'px');
        setTooltipLeft(event.pageX + 'px');
    }
    const handleMouseClick = (event: any) => {
        if (params.onClick !== undefined)
            params.onClick();
    }
    return <div className="harita">
            <div className="city-tooltip" style={{left: tooltipLeft, top: tooltipTop}}>{tooltip}</div>
            <div className="svg-map">
                <svg version="1.1" id="svg-map" xmlns="http://www.w3.org/2000/svg" xmlnsXlink="http://www.w3.org/1999/xlink" viewBox="0 0 1007.478 527.323" xmlSpace="preserve">
                    { cityList.map((city: ICity) => 
                        <CityComponent city={city} mouseOverHandler={params.mouseOverHandler !== undefined ? params.mouseOverHandler : handleMouseOver} 
                                    mouseOutHandler={params.mouseOutHandler !== undefined ? params.mouseOutHandler : handleMouseOut} 
                                    mouseMoveHandler={params.mouseMoveHandler !== undefined ? params.mouseMoveHandler : handleMouseMove} 
                                    onClick={params.onClick !== undefined ? params.onClick : handleMouseClick} />
                    )}
            </svg>
        </div></div>
}

export default Map;