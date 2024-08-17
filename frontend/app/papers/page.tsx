'use client';

import { useMemo, useState } from 'react';

import PaperCard from '@/components/ui/PaperCard';
import TrendingPaper from '@/components/ui/TrendingPaper';
import TagFilterDropdown from '@/components/ui/TagFilterDropdown';

import { Tags } from '@/common/types/enums';
import { trendingMockPapers, mockPapers } from '@/common/constants';
import AddPaperModal from '@/components/modals/AddPaperModal';

const Papers = () => {
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [selectedTags, setSelectedTags] = useState<Tags[]>([]);

  const filteredPapers = useMemo(() => {
    return selectedTags.length === 0
      ? mockPapers
      : mockPapers.filter((paper) =>
          paper.tags.some((tag) => selectedTags.includes(tag))
        );
  }, [selectedTags]);

  const onFilterChange = (newSelectedTags: Tags[]) => {
    setSelectedTags(newSelectedTags);
  };

  const onAddPaperClick = () => {
    setIsModalOpen(true);
  };

  return (
    <>
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
            <div className="flex justify-between">
              <button
                className="rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-sm font-medium text-gray-700 hover:bg-gray-50"
                onClick={onAddPaperClick}>
                Add Paper
              </button>

              <TagFilterDropdown onFilterChange={onFilterChange} />
            </div>

            <div className="flex flex-wrap justify-between gap-4 overflow-y-auto">
              {filteredPapers.map(({ id, title, tags }) => (
                <PaperCard key={id} title={title} tags={tags} />
              ))}
            </div>
          </div>
        </div>
      </div>

      <AddPaperModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
      />
    </>
  );
};

export default Papers;
