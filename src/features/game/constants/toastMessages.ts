export const TOAST_MESSAGES = {
  gameEnded: {
    variant: 'destructive',
    title: 'toast.gameEnded.title',
    description: 'toast.gameEnded.description',
  },
  maxScore: {
    variant: 'success',
    title: 'toast.maxScore.title',
    description: 'toast.maxScore.description',
    className: 'text-xl font-bold',
  },
  zeroScore: {
    variant: 'destructive',
    title: 'toast.zeroScore.title',
    description: 'toast.zeroScore.description',
    className: 'text-xl font-bold',
  },
} as const;
