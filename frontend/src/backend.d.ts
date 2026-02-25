import type { Principal } from "@icp-sdk/core/principal";
export interface Some<T> {
    __kind__: "Some";
    value: T;
}
export interface None {
    __kind__: "None";
}
export type Option<T> = Some<T> | None;
export type Time = bigint;
export interface Page {
    id: bigint;
    title: string;
    content: string;
    createdAt: Time;
    author: Principal;
    updatedAt: Time;
}
export interface UserProfile {
    name: string;
}
export interface Post {
    id: bigint;
    title: string;
    body: string;
    createdAt: Time;
    author: Principal;
    updatedAt: Time;
}
export enum UserRole {
    admin = "admin",
    user = "user",
    guest = "guest"
}
export interface backendInterface {
    assignCallerUserRole(user: Principal, role: UserRole): Promise<void>;
    createPage(title: string, content: string): Promise<bigint>;
    createPost(title: string, body: string): Promise<bigint>;
    deletePage(pageId: bigint): Promise<void>;
    deletePost(postId: bigint): Promise<void>;
    getAllPages(): Promise<Array<Page>>;
    getAllPosts(): Promise<Array<Post>>;
    getCallerUserProfile(): Promise<UserProfile | null>;
    getCallerUserRole(): Promise<UserRole>;
    getPage(pageId: bigint): Promise<Page | null>;
    getPost(postId: bigint): Promise<Post | null>;
    getUserProfile(user: Principal): Promise<UserProfile | null>;
    isCallerAdmin(): Promise<boolean>;
    saveCallerUserProfile(profile: UserProfile): Promise<void>;
    updatePage(pageId: bigint, title: string, content: string): Promise<void>;
    updatePost(postId: bigint, title: string, body: string): Promise<void>;
}
