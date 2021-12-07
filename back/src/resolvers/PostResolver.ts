import { Arg, Query, Resolver, Mutation, UseMiddleware } from 'type-graphql';
import { PostModel, Post } from '../models/Post';
import { inputAddPost } from '../types/InputAddPost';
import { isAuth } from '../middleware/isAuth';

@Resolver(Post)
export class PostResolver {
  @UseMiddleware(isAuth)
  @Query(() => [Post])
  async allPosts(): Promise<Post[]> {
    const posts = await PostModel.find();
    return posts;
  }

  @UseMiddleware(isAuth)
  @Mutation(() => Post)
  async addPost(@Arg('data') data: inputAddPost): Promise<Post> {
    const post = await PostModel.create(data);
    await post.save();

    return post;
  }

  @UseMiddleware(isAuth)
  @Query(() => Post)
  async getPostById(@Arg('id') id: string): Promise<Post | null> {
    const post = await PostModel.findById(id)

    return post;
  }
}
