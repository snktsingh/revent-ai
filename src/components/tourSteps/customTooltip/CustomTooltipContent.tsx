import { customStyles, theme } from '@/constants/theme'
import React from 'react'
import { ConclusionText, StyledText } from '../style'
import ConclusionStep from '../steps/conclusionStep'

const CustomTooltipContent : React.FC<{ChildName: string}> = ({ChildName}) => {
    return (
        <div
            style={{
                backgroundColor: '#ffffff',
                borderRadius: '5px',
                fontFamily: `${customStyles.fonts.robotoSansSerif}`,
                fontSize: '0.98rem',
                padding: 0
            }}
        >
            <div style={{ color: `${theme.colorSchemes.light.palette.common.black}` }}>
                {
                    ChildName === 'changeTheme' ? 
                    <>
                     <ConclusionText>Select from a variety of themes to customize your look.</ConclusionText>
                     {/* <StyledText>of your presentation!</StyledText> */}
                    </>
                    : ChildName === 'share' ? 
                    <>
                     <ConclusionText>Export your presentation as PDF or PPT.</ConclusionText>
                     {/* <StyledText>as a PDF or PPT</StyledText> */}
                    </>
                    : ChildName === 'edit' ? 
                    <>
                     <ConclusionText>Easily edit your data.</ConclusionText>
                    </> : ''
                }
            </div>

        </div>
    )
}

export default CustomTooltipContent
