import { customStyles, theme } from '@/constants/theme'
import React from 'react'

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
                     <p>Change the look and feel </p>
                     <p>of your presentation!</p>
                    </>
                    : ChildName === 'share' ? 
                    <>
                     <p>Export your presentation</p>
                     <p>as a PDF or PPT</p>
                    </>
                    : ChildName === 'edit' ? 
                    <>
                     <p>Edit data with ease</p>
                    </> : ''
                }
            </div>

        </div>
    )
}

export default CustomTooltipContent
