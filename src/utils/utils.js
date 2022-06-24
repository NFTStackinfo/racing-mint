export const fontFace = (
  fontPath,
  fontFamily,
  fontWeight,
  fontStyle = "normal"
) => {
  return `
        @font-face {
          font-family: ${fontFamily};
          font-weight: ${fontWeight};
          font-style: ${fontStyle};
          font-display: fallback;
          src: local(${fontFamily}),
               url('${fontPath}.woff2') format('woff2'),
               url('${fontPath}.woff') format('woff'),
               url('${fontPath}.ttf') format('truetype'),
               url('${fontPath}.eot') format('embedded-opentype');
        }
    `
}
