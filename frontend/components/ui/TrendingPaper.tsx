import { generateSoftColor } from '@/common/utils/generateRandomSoftColor';
import React from 'react';

interface TrendingPaperProps {
  tags: string[];
  title: string;
}

const TrendingPaper: React.FC<TrendingPaperProps> = ({ tags, title }) => {
  return (
    <div className="w-full flex flex-col p-4 gap-2 rounded-md border border-gray-400 bg-gray-300">
      <p className="text-xs text-justify line-clamp-3">{title}</p>

      <div className="flex flex-wrap gap-1">
        {tags.map((tag, index) => {
          const hexColor = generateSoftColor();

          return (
            <div
              key={index}
              style={{ backgroundColor: hexColor }}
              className={`flex items-center justify-center px-2 py-1 rounded-full`}>
              <p className="text-xs font-semibold truncate max-w-full">{tag}</p>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default React.memo(TrendingPaper);
