import { Arg, Query, Resolver, Mutation } from 'type-graphql';
import { PostModel, Post, inputAddPost } from './models/Post';

@Resolver(Post)
export class PostResolver {
  @Query(() => [Post])
  async allPosts(): Promise<Post[]> {
    const posts = await PostModel.find();
    return posts;
  }

  @Mutation(() => Post)
  async addPost(@Arg('data') data: inputAddPost): Promise<Post> {
    const post = await PostModel.create(data);
    await post.save();

    return post;
  }
}
