import { InputType, Field } from 'type-graphql';
import { FileUpload, GraphQLUpload } from 'graphql-upload';

@InputType()
export class UserInput {
  @Field()
  nickname: string;

  @Field({ nullable: true })
  email?: string;

  @Field(() => GraphQLUpload)
  photo?: FileUpload;
}
