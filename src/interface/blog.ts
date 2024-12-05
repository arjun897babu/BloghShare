import { Document, ObjectId } from "mongoose";

export interface IBlog extends Document {
  uId: string;
  userId: ObjectId;
  title: string;
  content: string;
  file: string; //image link
}
