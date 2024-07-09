import React from 'react';
import DOMPurify from 'dompurify';

interface SvgViewerProps {
    svgContent: string;
}

const SvgViewer: React.FC<SvgViewerProps> = ({ svgContent }) => {
    const updatedSvgContent = svgContent && svgContent.replace(/width="[^"]*"/, 'width="100%"').replace(/height="[^"]*"/, 'height="100%"');

    return (
        <div style={{width:'100%', height: '100%' }}>
            <div style={{ height: '100%', width: '100%', display: 'flex', justifyContent: 'center', alignItems: 'center' }} dangerouslySetInnerHTML={{ __html: DOMPurify.sanitize(updatedSvgContent) }} />
        </div>
    );
}

export default SvgViewer;