module.exports = {
    entry: ["./src/index.tsx"],
    mode: "production",
    module: {
        rules: [
            {
                test: /\.tsx?$/,
                use: "ts-loader",
                exclude: /node_modules/
            },
            {
                test: /\.(png|jpg)$/,
                use: ["file-loader"]
            }
        ]
    },
    resolve: {
        extensions: [".tsx", ".ts", ".js"]
    },
    output: {
        path: __dirname + "/build",
        publicPath: "/",
        filename: "bundle.js"
    }
};