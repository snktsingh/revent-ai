import React, { useEffect, useState } from 'react'
import { CreditCoins, CreditsContainer, StyledText } from './style';
import { useAppDispatch, useAppSelector } from '@/redux/store';
import { getUserCredit } from '@/redux/thunk/user';
import { CreditIcon } from '@/constants/media';
import Tooltip, { TooltipProps, tooltipClasses } from '@mui/material/Tooltip';
import { styled } from '@mui/material/styles';
import { Zoom } from '@mui/material';

const CustomTooltip = styled(({ className, ...props }: TooltipProps) => (
    <Tooltip {...props} classes={{ popper: className }} />
))(({ theme }) => ({
    '& .MuiTooltip-tooltip': {
        backgroundColor: 'white',
        color: 'rgba(0, 0, 0, 0.87)',
        maxWidth: 220,
        fontSize: theme.typography.pxToRem(12),
        border: '1px solid #dadde9',
        borderRadius: '8px',
        boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
        padding: '10px',
    },
}));

const CreditsTooltip = ({lessCredits} : {lessCredits : boolean}) => {
    return (
        <>
            <StyledText>
            1 credit is deducted when a new slide is regenerated. 
            </StyledText>
            {/* {!lessCredits && (
                <StyledText style={{color: '#004fba'}}>
                    low credits
                </StyledText>
            )} */}
            <StyledText>
                Need more credits? Contact us at <a href="mailto:support@revent.ai" style={{ textDecoration: 'underline' }}>support@revent.ai</a>
            </StyledText>
        </>
    )
};

const AnimatedCreditCoins = styled(CreditCoins)`
    transition: transform 0.3s ease-in-out;
    &.pulse {
        animation: pulse 0.5s;
    }
    @keyframes pulse {
        0% {
            transform: scale(1);
        }
        50% {
            transform: scale(1.1);
        }
        100% {
            transform: scale(1);
        }
    }
`;

const CreditsComponent = () => {
    const dispatch = useAppDispatch();
    const { creditAmount } = useAppSelector(state => state.manageUser)
    const { activeSlideID, canvasList } = useAppSelector(state => state.canvas);
    const index = canvasList.findIndex((slide) => slide.id === activeSlideID);
    const [animate, setAnimate] = useState<boolean>(false);

    useEffect(() => {
        setAnimate(true);
        const timer = setTimeout(() => setAnimate(false), 500);
        return () => clearTimeout(timer);
    }, [creditAmount]);

    return (
        <CustomTooltip title={<CreditsTooltip lessCredits={creditAmount < 11} />} placement="bottom">
            <CreditsContainer>
                <img src={CreditIcon} style={{ marginBottom: '5%' }} alt="credit" />
                <CreditCoins>Credits Left :</CreditCoins>
                <Zoom in={true} style={{ transitionDelay: animate ? '100ms' : '0ms' }}>
                    <AnimatedCreditCoins 
                        className={animate ? 'pulse' : ''}
                        style={{ color : creditAmount < 11 ? 'red' : 'inherit'}}
                    >
                        {creditAmount}
                    </AnimatedCreditCoins>
                </Zoom>
            </CreditsContainer>
        </CustomTooltip>
    )
}

export default CreditsComponent;