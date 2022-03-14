import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type UserDocument = User & Document;

@Schema()
export class User {
  @Prop({ required: true })
  email: string;

  @Prop()
  username: string;

  @Prop()
  password: number;

  @Prop()
  bio: string;

  @Prop()
  image: string;

  @Prop({ value: Date.now })
  createAt: Date;

  @Prop({ value: Date.now })
  updateAt: Date
}

export const UserSchema = SchemaFactory.createForClass(User);