import { useState, useEffect } from 'react';
import { Loader2, X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { useCreatePost, useUpdatePost } from '@/hooks/usePosts';

interface PostFormProps {
  postId?: bigint;
  initialTitle?: string;
  initialBody?: string;
  onSuccess?: () => void;
  onCancel?: () => void;
}

export default function PostForm({ postId, initialTitle = '', initialBody = '', onSuccess, onCancel }: PostFormProps) {
  const [title, setTitle] = useState(initialTitle);
  const [body, setBody] = useState(initialBody);
  const [successMsg, setSuccessMsg] = useState('');

  const createPost = useCreatePost();
  const updatePost = useUpdatePost();

  const isEditing = postId !== undefined;
  const mutation = isEditing ? updatePost : createPost;

  useEffect(() => {
    setTitle(initialTitle);
    setBody(initialBody);
  }, [initialTitle, initialBody]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim() || !body.trim()) return;

    try {
      if (isEditing && postId !== undefined) {
        await updatePost.mutateAsync({ postId, title: title.trim(), body: body.trim() });
      } else {
        await createPost.mutateAsync({ title: title.trim(), body: body.trim() });
      }
      setSuccessMsg(isEditing ? 'Post updated successfully!' : 'Post created successfully!');
      if (!isEditing) {
        setTitle('');
        setBody('');
      }
      setTimeout(() => {
        setSuccessMsg('');
        onSuccess?.();
      }, 1200);
    } catch {
      // error handled via mutation.error
    }
  };

  const errorMsg = mutation.error ? String(mutation.error) : null;

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="space-y-1.5">
        <Label htmlFor="post-title" className="text-sm font-semibold text-foreground">
          Title
        </Label>
        <Input
          id="post-title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="Enter post title..."
          required
          disabled={mutation.isPending}
          className="border-border focus:ring-primary"
        />
      </div>

      <div className="space-y-1.5">
        <Label htmlFor="post-body" className="text-sm font-semibold text-foreground">
          Body
        </Label>
        <Textarea
          id="post-body"
          value={body}
          onChange={(e) => setBody(e.target.value)}
          placeholder="Write your post here..."
          required
          disabled={mutation.isPending}
          rows={6}
          className="border-border focus:ring-primary resize-none"
        />
      </div>

      {errorMsg && (
        <div className="flex items-start gap-2 bg-destructive/10 border border-destructive/30 rounded-md px-3 py-2 text-destructive text-sm">
          <X className="w-4 h-4 mt-0.5 shrink-0" />
          <span>{errorMsg.includes('Unauthorized') ? 'You are not authorized to perform this action.' : 'Something went wrong. Please try again.'}</span>
        </div>
      )}

      {successMsg && (
        <div className="bg-green-50 border border-green-200 rounded-md px-3 py-2 text-green-700 text-sm font-medium">
          {successMsg}
        </div>
      )}

      <div className="flex gap-3 pt-1">
        <Button
          type="submit"
          disabled={mutation.isPending || !title.trim() || !body.trim()}
          className="bg-primary text-primary-foreground hover:bg-primary/90 font-semibold"
        >
          {mutation.isPending && <Loader2 className="w-4 h-4 mr-2 animate-spin" />}
          {isEditing ? 'Update Post' : 'Create Post'}
        </Button>
        {onCancel && (
          <Button type="button" variant="outline" onClick={onCancel} disabled={mutation.isPending}>
            Cancel
          </Button>
        )}
      </div>
    </form>
  );
}
