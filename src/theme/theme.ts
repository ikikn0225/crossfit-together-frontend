const size = {
    mobile: "770px",
    tabletS:"1023px",
    tabletM:"1220px",
    tabletL:"1280px",
    laptop: "1460px",
    desktop:"1700px",
}

const reactiveTheme = {
    mobile: `(min-width:${size.mobile})`,
    tabletS:`(min-width:${size.tabletS})`,
    tabletM:`(min-width:${size.tabletM})`,
    tabletL:`(min-width:${size.tabletL})`,
    laptop:`(min-width:${size.laptop})`,
    desktop:`(min-width:${size.desktop})`,
}

const dark = {
    mainBackground: "#000",
    primaryText: "#fff",
    secondaryText: "rgba(255,255,255,0.45)",
    disable: "rgba(255,255,255,0.25)",
    border: "#d1d5da",
    divider: "rgba(255, 255, 255, 0.6)",
    background: "rgb(217, 223, 226)",
    tableHeader: "rgba(255,255,255,0.02)",
    themeIcon: "#FBE302",
    // point-color
    blue1: "#f1f8ff",
    blue2: "#c0d3eb",
    blue3: "#00adb5",
    green: "#1fab89",
    gray: "#393e46",
};

const light = {
    mainBackground: "#fff",
    primaryText: "#292B2E",
    secondaryText: "rgba(0, 0, 0, 0.45)",
    disable: "rgba(0, 0, 0, 0.25)",
    border: "#d1d5da",
    divider: "rgba(106, 115, 125, 0.3)",
    background: "rgb(217, 223, 226)",
    tableHeader: "rgba(0, 0, 0, 0.02)",
    themeIcon: "#fcb00a",
    blue1: "#f1f8ff",
    blue2: "#c0d3eb",
    blue3: "#00adb5",
    green: "#1fab89",
    gray: "#393e46",
};

const fontSizes = {
    xsm: "10px",
    sm: "12px",
    md: "16px",
    lg: "20px",
    xl: "24px",
    xxl: "28px",
};

const fontWeights = {
    extraBold: 800,
    bold: 700,
    semiBold: 600,
    regular: 400,
};

export { dark, light, fontSizes, fontWeights, reactiveTheme };