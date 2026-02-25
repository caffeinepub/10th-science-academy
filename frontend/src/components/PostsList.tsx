import { useState } from 'react';
import { Pencil, Trash2, Loader2, Newspaper, AlertCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Skeleton } from '@/components/ui/skeleton';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from '@/components/ui/alert-dialog';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { useGetAllPosts, useDeletePost } from '@/hooks/usePosts';
import { useInternetIdentity } from '@/hooks/useInternetIdentity';
import PostForm from './PostForm';
import type { Post } from '../backend';

function formatDate(ns: bigint): string {
  const ms = Number(ns / 1_000_000n);
  return new Date(ms).toLocaleDateString('en-US', { year: 'numeric', month: 'short', day: 'numeric' });
}

function PostCard({ post, isOwner }: { post: Post; isOwner: boolean }) {
  const [editOpen, setEditOpen] = useState(false);
  const deletePost = useDeletePost();

  return (
    <>
      <Card className="border border-border shadow-card hover:shadow-card-hover transition-all duration-300 hover:-translate-y-0.5 bg-card">
        <CardHeader className="pb-2">
          <div className="flex items-start justify-between gap-2">
            <CardTitle className="font-serif text-base font-bold text-foreground leading-snug">
              {post.title}
            </CardTitle>
            {isOwner && (
              <div className="flex items-center gap-1 shrink-0">
                <Button
                  variant="ghost"
                  size="icon"
                  className="h-7 w-7 text-muted-foreground hover:text-primary hover:bg-primary/10"
                  onClick={() => setEditOpen(true)}
                >
                  <Pencil className="w-3.5 h-3.5" />
                </Button>
                <AlertDialog>
                  <AlertDialogTrigger asChild>
                    <Button
                      variant="ghost"
                      size="icon"
                      className="h-7 w-7 text-muted-foreground hover:text-destructive hover:bg-destructive/10"
                      disabled={deletePost.isPending}
                    >
                      {deletePost.isPending ? (
                        <Loader2 className="w-3.5 h-3.5 animate-spin" />
                      ) : (
                        <Trash2 className="w-3.5 h-3.5" />
                      )}
                    </Button>
                  </AlertDialogTrigger>
                  <AlertDialogContent>
                    <AlertDialogHeader>
                      <AlertDialogTitle>Delete Post</AlertDialogTitle>
                      <AlertDialogDescription>
                        Are you sure you want to delete "{post.title}"? This action cannot be undone.
                      </AlertDialogDescription>
                    </AlertDialogHeader>
                    <AlertDialogFooter>
                      <AlertDialogCancel>Cancel</AlertDialogCancel>
                      <AlertDialogAction
                        className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
                        onClick={() => deletePost.mutate(post.id)}
                      >
                        Delete
                      </AlertDialogAction>
                    </AlertDialogFooter>
                  </AlertDialogContent>
                </AlertDialog>
              </div>
            )}
          </div>
          <p className="text-xs text-muted-foreground mt-1">{formatDate(post.createdAt)}</p>
        </CardHeader>
        <CardContent className="pt-0">
          <p className="text-sm text-muted-foreground leading-relaxed line-clamp-3">
            {post.body}
          </p>
        </CardContent>
      </Card>

      <Dialog open={editOpen} onOpenChange={setEditOpen}>
        <DialogContent className="sm:max-w-lg">
          <DialogHeader>
            <DialogTitle className="font-serif text-lg font-bold">Edit Post</DialogTitle>
          </DialogHeader>
          <PostForm
            postId={post.id}
            initialTitle={post.title}
            initialBody={post.body}
            onSuccess={() => setEditOpen(false)}
            onCancel={() => setEditOpen(false)}
          />
        </DialogContent>
      </Dialog>
    </>
  );
}

export default function PostsList() {
  const { data: posts, isLoading, error } = useGetAllPosts();
  const { identity } = useInternetIdentity();

  if (isLoading) {
    return (
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {[1, 2, 3].map((i) => (
          <Card key={i} className="border border-border bg-card">
            <CardHeader className="pb-2">
              <Skeleton className="h-5 w-3/4" />
              <Skeleton className="h-3 w-1/4 mt-1" />
            </CardHeader>
            <CardContent className="pt-0 space-y-2">
              <Skeleton className="h-3 w-full" />
              <Skeleton className="h-3 w-5/6" />
              <Skeleton className="h-3 w-4/6" />
            </CardContent>
          </Card>
        ))}
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex items-center gap-3 bg-destructive/10 border border-destructive/30 rounded-lg px-4 py-3 text-destructive text-sm">
        <AlertCircle className="w-4 h-4 shrink-0" />
        <span>Failed to load posts. Please try again.</span>
      </div>
    );
  }

  if (!posts || posts.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-16 text-center">
        <div className="w-14 h-14 rounded-full bg-primary/10 flex items-center justify-center mb-4">
          <Newspaper className="w-6 h-6 text-primary" />
        </div>
        <h4 className="font-serif font-bold text-foreground text-base mb-1">No posts yet</h4>
        <p className="text-muted-foreground text-sm">Be the first to write a post!</p>
      </div>
    );
  }

  const currentPrincipal = identity?.getPrincipal().toString();
  const sorted = [...posts].sort((a, b) => Number(b.createdAt - a.createdAt));

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {sorted.map((post) => (
        <PostCard
          key={post.id.toString()}
          post={post}
          isOwner={!!currentPrincipal && post.author.toString() === currentPrincipal}
        />
      ))}
    </div>
  );
}
