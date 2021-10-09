const { ApolloServer } = require('apollo-server')
const fs = require('fs')
const path = require('path')

let links = [{
    id: 'link-0',
    url: 'www.howtographql.com',
    description: 'Fullstack tutorial for GraphQL',
}]

const resolvers = {
    Query: {
        info: () => `This is the API of the Hackernews Clone`,
        feed: () => links,
    },
    Mutation: {
        post: (parent, args) => {
            let idCount = links.length

            const link = {
                id: `link-${idCount++}`,
                description: args.description,
                url: args.url,
            }
            links.push(link)
            return link
        },
        updateLink: (parent, args) => {
            links.forEach((item) => {
                if (item.id == args.id) {
                    item.description = args.description
                    item.url = args.url
                    return item
                }
            })
        },
        deleteLink: (parent, args) => {
            links.pop({id: args.id})
        },
    },
}

const server =  new ApolloServer({
    typeDefs: fs.readFileSync(
        path.join(__dirname, 'schema.graphql'),
        'utf8'
    ),
    resolvers,
})

server.listen().then(({url}) => {
    console.log(`Server is running on ${url}`)
})