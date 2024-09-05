import { IElementStyles } from "@/interface/elDataTypes";
import { setPreferredStyles } from "@/redux/reducers/slide";
import { useAppSelector } from "@/redux/store";
import { useDispatch } from "react-redux"

export const useElPreferredStyles = () => {
    const dispatch = useDispatch();
    const { preferredStyles } = useAppSelector(state => state.slide);

    const updateElementsPreferredStyles = (ElStyles: IElementStyles ) => {
        dispatch(setPreferredStyles(ElStyles));
    }

    const updatePreferredStyle = (styleString: string) => {
        console.log({styleString})
        let elementKey: string;
        if (styleString.startsWith('Metric_')) {
            elementKey = 'statistics';
        } else if (styleString.startsWith('Toc_')) {
            elementKey = 'tableOfContents';
        } else if (styleString.startsWith('Hub_')) {
            elementKey = 'hubsAndSpoke';
        } else {
            const [elementName] = styleString.split('_');
            elementKey = elementName.charAt(0).toLowerCase() + elementName.slice(1);
        }
        
        if (elementKey in preferredStyles) {
            const updatedStyles: IElementStyles = {
                ...preferredStyles,
                [elementKey]: styleString
            };
            dispatch(setPreferredStyles(updatedStyles));
            console.log("updatedStyles", updatedStyles);
        }
    }

    const updateMultiplePreferredStyles = (styleStrings: string[]) => {
        const updatedStyles: IElementStyles = { ...preferredStyles };
        
        styleStrings.forEach(styleString => {
            let elementKey: keyof IElementStyles;
            if (styleString.startsWith('Metric_')) {
                elementKey = 'statistics';
            } else if (styleString.startsWith('Toc_')) {
                elementKey = 'tableOfContents';
            } else if (styleString.startsWith('Hub_')) {
                elementKey = 'hubsAndSpoke';
            } else {
                const [elementName] = styleString.split('_');
                elementKey = elementName.charAt(0).toLowerCase() + elementName.slice(1) as keyof IElementStyles;
            }
            
            if (elementKey in preferredStyles) {
                updatedStyles[elementKey] = styleString;
            }
        });

        dispatch(setPreferredStyles(updatedStyles));
        console.log("updatedStyles", updatedStyles);
    }

    return {
        updateElementsPreferredStyles,
        updatePreferredStyle,
        updateMultiplePreferredStyles
    };
}