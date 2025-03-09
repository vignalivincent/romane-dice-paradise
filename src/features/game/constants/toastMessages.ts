export const TOAST_MESSAGES = {
  gameEnded: {
    variant: 'destructive',
    title: 'toast.ended.title',
    description: 'toast.ended.description',
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
    duration: 4000,
  },
  gameStarted: {
    variant: 'primary',
    description: 'toast.gameStarted.description',
    className: 'text-xl font-bold',
  },
  playerExists: {
    variant: 'destructive',
    title: 'toast.playerExists.title',
    description: 'toast.playerExists.description',
  },
  playerAdded: {
    variant: 'default',
    title: 'toast.playerAdded.title',
    description: 'toast.playerAdded.description',
  },
} as const;
