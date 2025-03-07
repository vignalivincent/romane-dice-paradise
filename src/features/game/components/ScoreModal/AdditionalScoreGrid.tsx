import { FC } from 'react';
import { useTranslation } from 'react-i18next';
import { ScoreCategory } from '@/types/game';

interface AdditionalScoreGridProps {
  scores: number[];
  onSelect: (score: number) => void;
  baseScore: number;
  category: ScoreCategory;
}

export const AdditionalScoreGrid: FC<AdditionalScoreGridProps> = ({
  scores,
  onSelect,
  baseScore,
  category,
}) => {
  const { t } = useTranslation();

  return (
    <div className="space-y-6">
      <div className="text-center space-y-2">
        <div className="text-lg font-semibold text-purple-900">
          {category === 'threeOfAKind' || category === 'fourOfAKind' ? (
            <>
              <div className="text-lg font-semibold text-purple-900">
                {t(`scoreModal.additionalScore.${category}.title`)}
              </div>
              <div className="text-sm text-purple-800">
                {t(`scoreModal.additionalScore.${category}.description`)}
              </div>
            </>
          ) : (
            <>
              {t('scoreModal.additionalScore.title')}
              <div className="text-2xl font-bold text-purple-900">
                {t('scoreModal.additionalScore.base', { score: baseScore })}
              </div>
              <div className="text-lg font-semibold text-purple-900">
                {t(`scoreModal.additionalScore.${category}.title`)}
              </div>
              <div className="text-sm text-purple-800">
                {t(`scoreModal.additionalScore.${category}.description`)}
              </div>
            </>
          )}
        </div>
      </div>

      <div className="grid grid-cols-4 gap-3">
        {scores.map((score) => (
          <button
            key={score}
            onClick={() => onSelect(score)}
            className="bg-purple-100 hover:bg-purple-200 text-purple-900 font-bold py-4 px-4 rounded-xl transition-colors text-xl shadow-sm hover:shadow-md"
          >
            {score}
          </button>
        ))}
      </div>
    </div>
  );
}; 