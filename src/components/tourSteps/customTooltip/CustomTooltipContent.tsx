import { customStyles, theme } from '@/constants/theme'
import React from 'react'
import { StyledText } from '../style'

const CustomTooltipContent : React.FC<{ChildName: string}> = ({ChildName}) => {
    return (
        <div
            style={{
                backgroundColor: '#ffffff',
                borderRadius: '5px',
                fontFamily: `${customStyles.fonts.robotoSansSerif}`,
                fontSize: '0.98rem',
                minWidth: '250px',
                padding: 0
            }}
        >
            <div style={{ color: `${theme.colorSchemes.light.palette.common.black}`, maxWidth: '450px', textAlign: 'center' }}>
                {
                    ChildName === 'changeTheme' ? 
                    <>
                     <StyledText>Select from a variety of themes to customize your look.</StyledText>
                     {/* <StyledText>of your presentation!</StyledText> */}
                    </>
                    : ChildName === 'share' ? 
                    <>
                     <StyledText>Export your presentation as PDF or PPT.</StyledText>
                     {/* <StyledText>as a PDF or PPT</StyledText> */}
                    </>
                    : ChildName === 'edit' ? 
                    <>
                     <StyledText>Easily edit your data.</StyledText>
                    </> : ''
                }
            </div>

        </div>
    )
}

export default CustomTooltipContent
