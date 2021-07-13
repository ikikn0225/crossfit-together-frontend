module.exports = {
    client: {
        includes: ["./src/**/*.{tsx,ts}"],
        tagName: "gql",
        service: {
            name: "crossfit-together-backend",
            url: "http://localhost:4000/graphql",
        }
    }
}