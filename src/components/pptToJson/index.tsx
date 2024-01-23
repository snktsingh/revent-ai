// import { useState, useEffect } from 'react';
// import * as PPTX from 'pptxgenjs';
// import Presentation from 'pptxgenjs';

// function PptToJson() {
//   const [pptData, setPptData] = useState<any>(null);

//   useEffect(() => {
//     const handleFile = async (file: File) => {
//       try {
//         const pptx = new PPTX.Presentation();
//         await pptx.load(file);
//         const jsonData = pptx.toJSON();
//         setPptData(jsonData);
//       } catch (error) {
//         console.error('Error converting PPT to JSON:', error);
//       }
//     };

//     const inputElement = document.createElement('input');
//     inputElement.type = 'file';
//     inputElement.accept = '.pptx';
//     inputElement.addEventListener('change', event => {
//       const file = event.target.files[0];
//       handleFile(file);
//     });
//     inputElement.click();
//   }, []);

//   return (
//     <div>
//       {pptData ? (
//         <pre>{JSON.stringify(pptData, null, 2)}</pre>
//       ) : (
//         <p>Loading or converting PPT...</p>
//       )}
//     </div>
//   );
// }

// export default PptToJson;
