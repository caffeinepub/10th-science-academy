import { useState, useEffect } from 'react';
import { Loader2, X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { useCreatePage, useUpdatePage } from '@/hooks/usePages';

interface PageFormProps {
  pageId?: bigint;
  initialTitle?: string;
  initialContent?: string;
  onSuccess?: () => void;
  onCancel?: () => void;
}

export default function PageForm({ pageId, initialTitle = '', initialContent = '', onSuccess, onCancel }: PageFormProps) {
  const [title, setTitle] = useState(initialTitle);
  const [content, setContent] = useState(initialContent);
  const [successMsg, setSuccessMsg] = useState('');

  const createPage = useCreatePage();
  const updatePage = useUpdatePage();

  const isEditing = pageId !== undefined;
  const mutation = isEditing ? updatePage : createPage;

  useEffect(() => {
    setTitle(initialTitle);
    setContent(initialContent);
  }, [initialTitle, initialContent]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim() || !content.trim()) return;

    try {
      if (isEditing && pageId !== undefined) {
        await updatePage.mutateAsync({ pageId, title: title.trim(), content: content.trim() });
      } else {
        await createPage.mutateAsync({ title: title.trim(), content: content.trim() });
      }
      setSuccessMsg(isEditing ? 'Page updated successfully!' : 'Page created successfully!');
      if (!isEditing) {
        setTitle('');
        setContent('');
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
        <Label htmlFor="page-title" className="text-sm font-semibold text-foreground">
          Title
        </Label>
        <Input
          id="page-title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="Enter page title..."
          required
          disabled={mutation.isPending}
          className="border-border focus:ring-primary"
        />
      </div>

      <div className="space-y-1.5">
        <Label htmlFor="page-content" className="text-sm font-semibold text-foreground">
          Content
        </Label>
        <Textarea
          id="page-content"
          value={content}
          onChange={(e) => setContent(e.target.value)}
          placeholder="Write your page content here..."
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
          disabled={mutation.isPending || !title.trim() || !content.trim()}
          className="bg-primary text-primary-foreground hover:bg-primary/90 font-semibold"
        >
          {mutation.isPending && <Loader2 className="w-4 h-4 mr-2 animate-spin" />}
          {isEditing ? 'Update Page' : 'Create Page'}
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
