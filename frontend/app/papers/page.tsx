'use client';

import TrendingPaper from '@/components/ui/TrendingPaper';

import { trendingMockPapers, mockPapers } from '@/common/constants';
import PaperCard from '@/components/ui/PaperCard';
import TagFilterDropdown from '@/components/ui/TagFilterDropdown';
import { useMemo, useState } from 'react';
import { Tags } from '@/common/types/enums';

const Papers = () => {
  const [selectedTags, setSelectedTags] = useState<Tags[]>([]);

  const filteredPapers = useMemo(() => {
    return selectedTags.length === 0
      ? mockPapers
      : mockPapers.filter((paper) =>
          paper.tags.some((tag) => selectedTags.includes(tag))
        );
  }, [selectedTags]);

  const handleFilterChange = (newSelectedTags: Tags[]) => {
    setSelectedTags(newSelectedTags);
  };

  return (
    <div className="w-full h-full flex flex-col gap-8">
      <input
        placeholder="Search"
        className="w-[20%] py-1 px-4 rounded-md input-outline text-black"
      />

      <div className="w-ful flex flex-1 gap-10 overflow-hidden text-black">
        <div className="w-[20%] flex flex-col items-center gap-6 py-3 px-4 overflow-hidden rounded-md bg-whitesmoke">
          <p className="font-semibold">Trending Science 🧬🔥</p>

          <div className="flex flex-1 flex-col gap-2 overflow-y-auto">
            {trendingMockPapers.map(({ id, title, tags }) => (
              <TrendingPaper key={id} title={title} tags={tags} />
            ))}
          </div>
        </div>

        <div className="flex flex-1 flex-col gap-4 p-6 rounded-md bg-whitesmoke">
          <div className="flex justify-end">
            <TagFilterDropdown onFilterChange={handleFilterChange} />
          </div>

          <div className="flex flex-wrap justify-between gap-4 overflow-y-auto">
            {filteredPapers.map(({ id, title, tags }) => (
              <PaperCard key={id} title={title} tags={tags} />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Papers;
