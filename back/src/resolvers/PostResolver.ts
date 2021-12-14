import { Arg, Query, Resolver, Mutation, UseMiddleware, Ctx } from 'type-graphql';
import { PostModel, Post } from '../models/Post';
import { inputAddPost } from '../types/InputAddPost';
import { isAuth } from '../middleware/isAuth';
import { ApolloError } from 'apollo-server';
import { mongoose } from '@typegoose/typegoose';

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
    const post = await PostModel.findById(mongoose.Types.ObjectId(id));

    if (!post) throw new ApolloError(`Could not find post with id: ${id}`);

    const postAggregated: Post[] = await PostModel.aggregate([
      { $match: { _id: mongoose.Types.ObjectId(id) } },
      { $lookup: { from: 'users', localField: 'creatorId', foreignField: '_id', as: 'creator' } },
      { $project: { 'creator.password': 0, 'creator.__v': 0 } },
    ]);

    return postAggregated[0];
  }
}
