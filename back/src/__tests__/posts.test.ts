import { gql } from 'apollo-server-core';
import { PostResolver } from '../resolvers/PostResolver';
import { AuthResolver } from '../resolvers/AuthResolver';
import { ApolloServer } from 'apollo-server';
import { buildSchema } from 'type-graphql';
import { MongoMemoryServer } from 'mongodb-memory-server';
import mongoose from 'mongoose';


// type Context =  {
//   user: string
// }


const ADD_POST = gql`
  mutation AddPost($input: inputAddPost!) {
    addPost(data: $input) {
      title
      wysiwyg
      skills {
        value
      }
    }
  }
`;
const REGISTER = gql`
  mutation register($input: AuthRegisterInput!) {
    register(input: $input) {
      user {
        nickname
        email
      }
      token
    }
  }
`;
const LOGIN = gql`
  mutation login($input: AuthLoginInput!) {
    login(input: $input) {
      token
      user {
        email
        nickname
        _id
      }
    }
  }
`;

let apollo: ApolloServer;

describe('Post Mutation test on with GraphQL', () => {
  beforeAll(async () => {
    const mongo: MongoMemoryServer = await MongoMemoryServer.create();
    const uri = mongo.getUri();
    mongoose
      .connect(uri, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
        useCreateIndex: true,
        autoIndex: true,
      })

      .then(() => console.log('Connected to database'))

      .catch((err: Error) => console.log(err));

    const schema = await buildSchema({
      resolvers: [PostResolver, AuthResolver],
    });

    apollo = new ApolloServer({schema });
  });

  afterAll(async () => {
    await mongoose.disconnect().then(() => console.log('Succesfully disconnect from database'));
  });

  it('Should list something from the DB', async () => {
    
    const resultRegister = await apollo.executeOperation({
      query: REGISTER,
      variables:{ input: {
        email: 'test@wcs.com',
        password:'test',
        nickname:'TESTEUR'
      }}
    });

    if(resultRegister.data !== null){
      console.log('resultRegister :>> ', resultRegister);
      const resultLogin = await apollo.executeOperation({
        query: LOGIN,
        variables:{ input: {
          email: 'test@wcs.com',
          password:'test'
        }}
      });
      const userId = resultLogin?.data?.login.user._id;

      if(!resultLogin) console.log('User connexion échouée');
  
      if (resultLogin.data !== null) {
        
        console.log('resultLogin :>> ', resultLogin);
        
        const schema = await buildSchema({
          resolvers: [PostResolver],
        });

        
        const newApollo = new ApolloServer({
          schema,
        })
        console.log('newApollo :>> ', newApollo);

        const resultAddPost = await newApollo.executeOperation({
          query: ADD_POST,
          variables : { input: { 
            title: "Je créer un post",
            wysiwyg:"<h1> Je suis un Test </h1>",
            skills:[{ "value": "ANG" }]
          }}},
        );
        if(resultAddPost.data !== null){
      
          console.log('resultAddPost :>> ', resultAddPost);
          expect(resultAddPost?.data?.addPost.title).toEqual('Je créer un post');
         }else{
           console.log('userId#2 :>> ', userId);
          console.log('resultAddPostError :>> ', resultAddPost);

         }
      } 
      
    }
    
   
    
  });
});
