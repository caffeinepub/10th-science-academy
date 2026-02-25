import { useState } from 'react';
import { Plus, FileText, LogIn } from 'lucide-react';
import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import PagesList from '@/components/PagesList';
import PageForm from '@/components/PageForm';
import { useInternetIdentity } from '@/hooks/useInternetIdentity';

export default function PagesPage() {
  const [createOpen, setCreateOpen] = useState(false);
  const { identity, login, loginStatus } = useInternetIdentity();
  const isAuthenticated = !!identity;

  return (
    <div className="min-h-screen bg-background">
      {/* Page Header */}
      <section className="bg-primary text-primary-foreground py-10 sm:py-14">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
            <div className="flex items-center gap-3">
              <div className="bg-primary-foreground/15 rounded-full p-2.5">
                <FileText className="w-6 h-6 text-primary-foreground" />
              </div>
              <div>
                <h2 className="font-serif text-2xl sm:text-3xl font-bold leading-tight">Pages</h2>
                <p className="text-primary-foreground/75 text-sm mt-0.5">Browse and manage pages</p>
              </div>
            </div>
            {isAuthenticated ? (
              <Button
                onClick={() => setCreateOpen(true)}
                className="bg-primary-foreground text-primary hover:bg-primary-foreground/90 font-semibold shadow-md"
              >
                <Plus className="w-4 h-4 mr-2" />
                New Page
              </Button>
            ) : (
              <Button
                onClick={() => login()}
                disabled={loginStatus === 'logging-in'}
                variant="outline"
                className="border-primary-foreground/40 text-primary-foreground hover:bg-primary-foreground/10 font-semibold"
              >
                <LogIn className="w-4 h-4 mr-2" />
                Login to Create
              </Button>
            )}
          </div>
        </div>
      </section>

      {/* Pages List */}
      <section className="py-10 sm:py-14">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          {!isAuthenticated && (
            <div className="mb-6 flex items-center gap-3 bg-accent border border-border rounded-lg px-4 py-3 text-sm text-muted-foreground">
              <LogIn className="w-4 h-4 shrink-0 text-primary" />
              <span>
                <button
                  onClick={() => login()}
                  className="text-primary font-semibold hover:underline"
                >
                  Log in
                </button>{' '}
                to create, edit, or delete your own pages.
              </span>
            </div>
          )}
          <PagesList />
        </div>
      </section>

      {/* Create Page Dialog */}
      <Dialog open={createOpen} onOpenChange={setCreateOpen}>
        <DialogContent className="sm:max-w-lg">
          <DialogHeader>
            <DialogTitle className="font-serif text-lg font-bold">Create New Page</DialogTitle>
          </DialogHeader>
          <PageForm
            onSuccess={() => setCreateOpen(false)}
            onCancel={() => setCreateOpen(false)}
          />
        </DialogContent>
      </Dialog>
    </div>
  );
}
