import React from 'react';

interface SvgViewerProps {
    svgContent: string;
}

const SvgViewer: React.FC<SvgViewerProps> = ({ svgContent }) => {

    const updatedSvgContent = svgContent && svgContent.replace(/width="[^"]*"/, 'width="100%"').replace(/height="[^"]*"/, 'height="100%"');
    return (
        <div style={{ width: 'fit-content', height: 'fit-content' }}>
            <div dangerouslySetInnerHTML={{ __html: updatedSvgContent }} />
        </div>
    );
}

export default SvgViewer;