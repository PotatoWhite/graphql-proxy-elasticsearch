import express from 'express';
import graphqlHTTP from 'express-graphql';
import { graphql } from 'graphql-compose';
import {elasticApiFieldConfig } from 'graphql-compose-elasticsearch'

const { GraphQLSchema, GraphQLObjectType } = graphql;

const expressPort = process.env.PORT || 9201;

const generatedSchema = new GraphQLSchema({
    query: new GraphQLObjectType({
        name: 'Query',
        fields: {
            elastic: elasticApiFieldConfig({
                host: 'http://localhost:9200',
                apiVersion: '6.8'
            })
        }
    })
});

const server = express();
server.use('/',
graphqlHTTP({
    schema: generatedSchema,
    graphiql:true
}));

server.listen(expressPort, () => {
    console.log(`The server is running at http://localhost:${expressPort}`);
});

console.log("OK");