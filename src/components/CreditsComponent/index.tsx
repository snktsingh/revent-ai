import React, { useEffect } from 'react'
import { CreditCoins, CreditsContainer } from './style';
import { useAppDispatch, useAppSelector } from '@/redux/store';
import { getUserCredit } from '@/redux/thunk/user';

const CreditsComponent = () => {
    const dispatch = useAppDispatch();
    const { creditAmount } = useAppSelector(state => state.manageUser)
    const { activeSlideID, canvasList } = useAppSelector(state => state.canvas);
    const index = canvasList.findIndex((slide) => slide.id === activeSlideID);

    useEffect(()=> {
        dispatch(getUserCredit())
    },[])


    return (
        <CreditsContainer>
            <svg
                height="1.2rem"
                width="1.2rem"
                version="1.1"
                xmlns="http://www.w3.org/2000/svg"
                xmlnsXlink="http://www.w3.org/1999/xlink"
                viewBox="0 0 512 512"
                fill="#000000"
            >
                <g id="SVGRepo_bgCarrier" strokeWidth={0} />
                <g id="SVGRepo_tracerCarrier" strokeLinecap="round" strokeLinejoin="round" />
                <g id="SVGRepo_iconCarrier">
                    <path style={{ fill: '#FFDB2D' }} d="M512,153.6v204.8l0,0c0,47.128-114.615,85.333-256,85.333S0,405.528,0,358.4V153.6" />
                    <path style={{ fill: '#FFAF33' }} d="M256,153.6v290.133c141.385,0,256-38.205,256-85.333V153.6H256z" />
                    <ellipse style={{ fill: '#FFEA8A' }} cx="256" cy="153.6" rx="256" ry="85.333" />
                    <path style={{ fill: '#FFDB2D' }} d="M256,68.267v170.667c141.385,0,256-38.205,256-85.333S397.385,68.267,256,68.267z" />
                    <path
                        style={{ fill: '#FFAF33' }}
                        d="M256,315.733c-141.385,0-256-38.205-256-85.333v81.671c15.087,9.827,34.336,19.089,58.79,27.242 c53.436,17.811,123.472,27.621,197.21,27.621s143.775-9.81,197.21-27.621c24.455-8.151,43.704-17.415,58.79-27.242V230.4 C512,277.528,397.385,315.733,256,315.733z"
                    />
                    <path
                        style={{ fill: '#FF9408' }}
                        d="M256,315.733v51.2c73.738,0,143.775-9.81,197.21-27.621c24.455-8.151,43.704-17.415,58.79-27.242 V230.4C512,277.528,397.385,315.733,256,315.733z"
                    />
                </g>
            </svg>
            <CreditCoins>{creditAmount}</CreditCoins>
        </CreditsContainer>
    )
}

export default CreditsComponent;