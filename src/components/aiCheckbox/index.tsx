import React, { useState, ChangeEvent, useEffect } from 'react';
import {
    CheckboxWrapper4,
    CbxLabel,
    CbxSpan,
    InpCbx,
    InlineSvg,
    MediaQueryWrapper,
} from './style';
import { useAppDispatch, useAppSelector } from '@/redux/store';
import { updateCheckboxForAI } from '@/redux/reducers/apiData';
import { setUseAiForSlides } from '@/redux/reducers/canvas';
import { useDebounce } from '@/hooks/useDebounce';

interface AiCheckboxProps {
    handleAICheckbox: (value: boolean) => void;
}

const AiCheckbox: React.FC<AiCheckboxProps> = ({ handleAICheckbox }) => {
    const { enhancementWithAI } = useAppSelector(state => state.apiData);
    const dispatch = useAppDispatch()
    const { canvasJS } = useAppSelector(state => state.canvas);
    const [enhance, setEnhance] = useState(canvasJS.useAI || enhancementWithAI);
    
    const handleCheckBox = (e: ChangeEvent<HTMLInputElement>) => {
        setEnhance(e.target.checked);
        dispatch(updateCheckboxForAI(e.target.checked));
        dispatch(setUseAiForSlides({slideId : canvasJS.id, useAI: e.target.checked}));
    }
    

    return (
        <CheckboxWrapper4>
            <InpCbx
                id="use_ai"
                checked={enhance}
                onChange={handleCheckBox}
            />
            <CbxLabel htmlFor="use_ai">
                <CbxSpan>
                    <svg width="12px" height="10px">
                        <use href="#check-4" />
                    </svg>
                </CbxSpan>
                <CbxSpan>Use AI</CbxSpan>
            </CbxLabel>
            <InlineSvg>
                <symbol id="check-4" viewBox="0 0 12 10">
                    <polyline points="1.5 6 4.5 9 10.5 1"></polyline>
                </symbol>
            </InlineSvg>
        </CheckboxWrapper4>
    )
};

export default AiCheckbox;