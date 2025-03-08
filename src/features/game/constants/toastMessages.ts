export const TOAST_MESSAGES = {
  gameEnded: {
    variant: 'destructive',
    title: 'toast.nded.title',
    description: 'toast.nded.description',
  },
  maxScore: {
    variant: 'success',
    title: 'toast.maxScore.title',
    description: 'toast.maxScore.description',
    className: 'max-score-toast',
  },
  zeroScore: {
    variant: 'destructive',
    title: 'toast.zeroScore.title',
    description: 'toast.zeroScore.description',
    className: 'zero-score-toast',
  },
  yahtzee: {
    variant: 'default',
    description: 'toast.yahtzee.description',
    className: 'bg-yellow-600 text-yellow-100 border-2 border-yellow-400 font-bold text-lg',
    duration: 5000,
  },
} as const;
