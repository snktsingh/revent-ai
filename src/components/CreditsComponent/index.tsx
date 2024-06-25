import React, { useEffect } from 'react'
import { CreditCoins, CreditsContainer } from './style';
import { useAppDispatch, useAppSelector } from '@/redux/store';
import { getUserCredit } from '@/redux/thunk/user';
import { CreditIcon } from '@/constants/media';

const CreditsComponent = () => {
    const dispatch = useAppDispatch();
    const { creditAmount } = useAppSelector(state => state.manageUser)
    const { activeSlideID, canvasList } = useAppSelector(state => state.canvas);
    const index = canvasList.findIndex((slide) => slide.id === activeSlideID);



    return (
        <CreditsContainer>
            <img src={CreditIcon} style={{marginBottom : '5%'}} alt="credit" />
            <CreditCoins>Credits Left :</CreditCoins>
            <CreditCoins>{creditAmount}</CreditCoins>
        </CreditsContainer>
    )
}

export default CreditsComponent;