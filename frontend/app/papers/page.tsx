'use client';

import { useMemo, useState, useEffect, useLayoutEffect } from 'react';

import PaperCard from '@/components/ui/PaperCard';
import TrendingPaper from '@/components/ui/TrendingPaper';
import TagFilterDropdown from '@/components/ui/TagFilterDropdown';
import AddPaperModal from '@/components/modals/AddPaperModal';

import { Tags } from '@/common/types/enums';
import { trendingMockPapers, mockPapers } from '@/common/constants';
import { getPapers } from '@/common/services/thegraph';

// Computation of Biological Conductance with Liouville Quantum Master Equation
// Recent experiments have revealed that single proteins can display high conductivity, which stays finite for low temperatures, decays slowly with distance, and exhibits a rich spatial structure featuring highly conducting and strongly insulating domains. Here, we intruduce a new formula by combining the density matrix of the Liouville-Master Equation simulating quantum transport in nanoscale devices, and the phenomenological model of electronic conductance through molecules, that can account for the observed distance- and temperature dependence of conductance in proteins. We demonstrate its efficacy on experimentally highly conductive extracellular cytochrome nanowires, which are good candidates to illustrate our new approach by calculating and visualizing their electronic wiring, given the interest in the arrangement of their conducting and insulating parts. As proteins and protein nanowires exhibit significant potential for diverse applications, including energy production and sensing, our computational technique can accelerate the design of nano-bioelectronic devices.
// Eszter Papp, Gabor Vattay
// 16 August 2024

const Papers = () => {
  const [papers, setPapers] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [selectedTags, setSelectedTags] = useState<Tags[]>([]);

  const filteredPapers = useMemo(() => {
    return mockPapers.filter((paper) => {
      const matchesTags =
        selectedTags.length === 0 ||
        paper.tags.some((tag) => selectedTags.includes(tag));
      const matchesSearch = paper.title
        .toLowerCase()
        .includes(searchTerm.toLowerCase());
      return matchesTags && matchesSearch;
    });
  }, [selectedTags, searchTerm]);

  const onFilterChange = (newSelectedTags: Tags[]) => {
    setSelectedTags(newSelectedTags);
  };

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value);
  };

  const onAddPaperClick = () => {
    setIsModalOpen(true);
  };

  useLayoutEffect(() => {
    const fetchPapersFromGraph = async () => {
      try {
        const papers = await getPapers();

        // IT WORKS!!!
        console.log(papers);

        setPapers(papers);
      } catch (error) {
        console.log(error);
      }
    };

    fetchPapersFromGraph();
  }, []);

  return (
    <>
      <div className="w-full h-full flex flex-col gap-8">
        <input
          placeholder="Search"
          value={searchTerm}
          onChange={handleSearchChange}
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
