import { Arg, Query, Resolver, Mutation } from 'type-graphql';
import { PostModel, Post } from '../models/Post';
import { inputAddPost } from '../types/InputAddPost';

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
