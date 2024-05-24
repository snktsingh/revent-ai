import { customStyles, theme } from "@/constants/theme";
import styled from "styled-components";

export const CreditsContainer = styled.div`
    display: flex;
    justify-content: space-around;
    align-items: center;
    border-radius: .2rem;
    border: 1px solid #dfdfdf;
    max-width: 180px;
    padding: 0.2rem .4rem;
    height: 4.5vh;
`;

export const CreditCoins = styled.p`
   font-family: ${customStyles.fonts.robotoSansSerif};
   font-size: .75rem;
   color: ${theme.colorSchemes.light.palette.common.lightGrey} !important;
   margin-left: 5px;
`;