'use client';

import React, { useState } from 'react';
import { Tags } from '@/common/types/enums';

interface TagFilterDropdownProps {
  onFilterChange: (selectedTags: Tags[]) => void;
}

const TagFilterDropdown: React.FC<TagFilterDropdownProps> = ({
  onFilterChange,
}) => {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [selectedTags, setSelectedTags] = useState<Tags[]>([]);

  const toggleDropdown = () => setIsOpen(!isOpen);

  const handleTagToggle = (tag: Tags) => {
    setSelectedTags((prevTags) => {
      const newTags = prevTags.includes(tag)
        ? prevTags.filter((t) => t !== tag)
        : [...prevTags, tag];
      onFilterChange(newTags);
      return newTags;
    });
  };

  return (
    <div className="relative inline-block text-left">
      <div>
        <button
          type="button"
          className="inline-flex justify-center w-full rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-100 focus:ring-indigo-500"
          onClick={toggleDropdown}>
          Filter by Tags
          <svg
            className="-mr-1 ml-2 h-5 w-5"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 20 20"
            fill="currentColor"
            aria-hidden="true">
            <path
              fillRule="evenodd"
              d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
              clipRule="evenodd"
            />
          </svg>
        </button>
      </div>

      {isOpen && (
        <div className="origin-top-right absolute right-0 mt-2 w-56 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 focus:outline-none">
          <div className="py-1 max-h-60 overflow-y-auto">
            {Object.values(Tags).map((tag) => (
              <label
                key={tag}
                className="flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 hover:text-gray-900"
                role="menuitem">
                <input
                  type="checkbox"
                  className="form-checkbox h-5 w-5 text-indigo-600"
                  checked={selectedTags.includes(tag)}
                  onChange={() => handleTagToggle(tag)}
                />
                <span className="ml-2">{tag}</span>
              </label>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default TagFilterDropdown;
