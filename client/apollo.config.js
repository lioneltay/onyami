module.exports = {
  client: {
    service: {
      name: "api",
      url: "http://localhost:7070/graphql",
      // localSchemaFile: './src/types/graphql-schema.json',
      // optional headers
      // headers: {
      //   authorization: 'Bearer lkjfalkfjadkfjeopknavadf',
      // },
      // optional disable SSL validation check
      skipSSLValidation: true,
    },

    includes: ["./src/**/*.{ts,tsx}"],
    excludes: ["./src/types/**/*"],
  },
}
