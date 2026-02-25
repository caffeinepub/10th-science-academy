import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { useActor } from './useActor';
import type { Page } from '../backend';

export function useGetAllPages() {
  const { actor, isFetching } = useActor();

  return useQuery<Page[]>({
    queryKey: ['pages'],
    queryFn: async () => {
      if (!actor) return [];
      return actor.getAllPages();
    },
    enabled: !!actor && !isFetching,
  });
}

export function useCreatePage() {
  const { actor } = useActor();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({ title, content }: { title: string; content: string }) => {
      if (!actor) throw new Error('Not authenticated');
      return actor.createPage(title, content);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['pages'] });
    },
  });
}

export function useUpdatePage() {
  const { actor } = useActor();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({ pageId, title, content }: { pageId: bigint; title: string; content: string }) => {
      if (!actor) throw new Error('Not authenticated');
      return actor.updatePage(pageId, title, content);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['pages'] });
    },
  });
}

export function useDeletePage() {
  const { actor } = useActor();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (pageId: bigint) => {
      if (!actor) throw new Error('Not authenticated');
      return actor.deletePage(pageId);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['pages'] });
    },
  });
}
