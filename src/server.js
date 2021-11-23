const { ApolloServer, gql } = require('apollo-server');
const {
    GraphQLObjectType,
    GraphQLString,
    GraphQLInt,
    GraphQLSchema,
    GraphQLList,
    GraphQLNonNull,
    GraphQLBoolean,
    GraphQLID,
} = require('graphql');

// Toda request é POST
// Toda request bate no mesmo endpoint (/graphql)

//Query - obter informação (GET)
//Mutation - manipular dados (POST, PUT, PATCH, DELETE)
//Scalar Types - String, Int, Boolean, Float e ID

const typeDefs = gql`
    type Aluno{
        nome: String!
        curso: String!
        semestre: Int!
        ra: Int!
        cpf: String!
        cidade: String!
    }

    type Query{
        hello: String
        alunos: [Aluno!]!
        getAlunoByRa(ra: Int!): Aluno!
    }

    type Mutation{
        createAluno(nome: String!, curso: String!, semestre: Int!, ra: Int!, cpf: String!, cidade: String!): Aluno!
    }
`;

const alunos = [
];

const resolvers = {
    Query: {
        hello: () => 'Hello World',
        alunos: () => alunos,
        getAlunoByRa: (_, args) => {
            return alunos.find((aluno) => aluno.ra === args.ra);
        },
    },
    Mutation: {
        createAluno: (_, args) => {
            const newAluno = {
                nome: args.nome,
                curso: args.curso,
                semestre: args.semestre,
                ra: args.ra,
                cpf: args.cpf,
                cidade: args.cidade
            };

            alunos.push(newAluno);
            return newAluno;
        },
    },
};

const server = new ApolloServer({ typeDefs, resolvers });
server.listen().then(({url}) => console.log(`Servidor Rodando em ${url}`));
