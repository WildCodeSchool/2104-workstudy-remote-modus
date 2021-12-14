import { Arg, Query, Resolver, Mutation, UseMiddleware, Ctx } from 'type-graphql';
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
  async addPost(@Arg('data') data: inputAddPost, @Ctx() { userId }: { userId: string }): Promise<Post> {
    const postWithUserId = { ...data, creatorId: userId };
    const post = await PostModel.create(postWithUserId);
    await post.save();

    return post;
  }

  @UseMiddleware(isAuth)
  @Query(() => Post)
  async getPostById(@Arg('id') id: string): Promise<Post | null> {
    const post = await PostModel.findById(id);

    return post;
  }
}
