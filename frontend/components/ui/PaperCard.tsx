import { Paper } from '@/common/types';
import { generateSoftColor } from '@/common/utils/generateRandomSoftColor';
import React from 'react';

interface PaperCardProps {
  tags: string[];
  title: string;
}

const PaperCard = ({ tags, title }: PaperCardProps) => {
  return (
    <div className="w-[15rem] h-auto flex flex-col gap-2 p-4 rounded-md border border-gray-400 bg-gray-300">
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

export default React.memo(PaperCard);
