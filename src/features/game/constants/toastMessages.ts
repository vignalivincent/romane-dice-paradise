export const TOAST_MESSAGES = {
  gameEnded: {
    variant: 'destructive' as const,
    title: '❌ Partie terminée',
    description: 'Vous ne pouvez plus modifier les scores.',
  },
  maxScore: {
    variant: 'success' as const,
    title: '🍾 Tu me fais rêver !',
    description: (name: string) => `${name}, j'ai toujours cru en toi ! Rendez-vous au sommet.`,
    className: 'text-xl font-bold',
  },
  zeroScore: {
    variant: 'destructive' as const,
    title: '💩 Aïe aïe aïe...',
    description: (name: string) => `${name}, toi il va falloir te reprendre ! Ne gâche plus ton potentiel comme ça.`,
    className: 'text-xl font-bold',
  },
};
