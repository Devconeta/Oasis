'use client';

import React, { useState } from 'react';

import { Tags } from '@/common/types/enums';
import Modal from '../common/Modal';

interface AddPaperModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const AddPaperModal: React.FC<AddPaperModalProps> = ({ isOpen, onClose }) => {
  const [title, setTitle] = useState<string>('');
  const [description, setDescription] = useState<string>('');
  const [author, setAuthor] = useState<string>('');
  const [publishDate, setPublishDate] = useState<string>('');
  const [selectedTags, setSelectedTags] = useState<Tags[]>([]);
  const [pdfFile, setPdfFile] = useState<File | null>(null);
  const [imageFile, setImageFile] = useState<File | null>(null);

  const onCloseModal = () => {
    setTitle('');
    setDescription('');
    setAuthor('');
    setPublishDate('');
    setSelectedTags([]);
    setPdfFile(null);
    setImageFile(null);

    onClose();
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    // upload to ipfs
    // deploy contract

    onCloseModal();
  };

  const handleTagToggle = (tag: Tags) => {
    setSelectedTags((prev) =>
      prev.includes(tag) ? prev.filter((t) => t !== tag) : [...prev, tag]
    );
  };

  const handleFileChange = (
    e: React.ChangeEvent<HTMLInputElement>,
    fileType: 'pdf' | 'image'
  ) => {
    if (e.target.files && e.target.files[0]) {
      if (fileType === 'pdf') {
        setPdfFile(e.target.files[0]);
      } else {
        setImageFile(e.target.files[0]);
      }
    }
  };

  return (
    <Modal isOpen={isOpen} onClose={onCloseModal} title="Add New Paper">
      <form
        onSubmit={handleSubmit}
        className="p-1 space-y-4 text-gray-700 max-h-[35rem] overflow-y-auto">
        <div className="space-y-1">
          <label htmlFor="title" className="text-sm font-medium">
            Paper Title
          </label>
          <input
            type="text"
            id="title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="w-full px-2 py-1 rounded-md border border-gray-300 shadow-sm input-outline"
            required
          />
        </div>

        <div className="space-y-1">
          <label htmlFor="description" className="text-sm font-medium ">
            Paper Description
          </label>
          <textarea
            id="description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            className="w-full px-2 py-1 rounded-md border border-gray-300 shadow-sm input-outline max-h-[10rem]"
            required
          />
        </div>

        <div className="flex gap-3">
          <div className="w-[60%] space-y-1">
            <label htmlFor="author" className="text-sm font-medium ">
              Paper Author/s
            </label>
            <input
              type="text"
              id="author"
              value={author}
              onChange={(e) => setAuthor(e.target.value)}
              className="w-full px-2 py-1 rounded-md border border-gray-300 shadow-sm input-outline"
              required
            />
          </div>

          <div className="w-[40%] space-y-1">
            <label htmlFor="publishDate" className="text-sm font-medium ">
              Publish Date
            </label>
            <input
              type="date"
              id="publishDate"
              value={publishDate}
              onChange={(e) => setPublishDate(e.target.value)}
              className="w-full px-2 py-1 rounded-md border border-gray-300 shadow-sm input-outline"
              required
            />
          </div>
        </div>

        <div className="space-y-1">
          <label htmlFor="imageUpload" className="text-sm font-medium">
            Upload Image
          </label>
          <input
            type="file"
            id="imageUpload"
            accept="image/*"
            onChange={(e) => handleFileChange(e, 'image')}
            className="w-full px-2 py-1 rounded-md border border-gray-300 shadow-sm input-outline"
          />
        </div>

        <div className="space-y-1">
          <label htmlFor="pdfUpload" className="text-sm font-medium">
            Upload PDF
          </label>
          <input
            type="file"
            id="pdfUpload"
            accept=".pdf"
            onChange={(e) => handleFileChange(e, 'pdf')}
            className="w-full px-2 py-1 rounded-md border border-gray-300 shadow-sm input-outline"
            required
          />
        </div>

        <div className="space-y-1">
          <label className="text-sm font-medium ">Tags</label>
          <div className="max-h-40 overflow-y-auto">
            {Object.values(Tags).map((tag) => (
              <label key={tag} className="inline-flex items-center mr-4">
                <input
                  type="checkbox"
                  checked={selectedTags.includes(tag)}
                  onChange={() => handleTagToggle(tag)}
                  className="form-checkbox h-5 w-5 text-indigo-600"
                />
                <span className="ml-2 text-sm ">{tag}</span>
              </label>
            ))}
          </div>
        </div>

        <div className="flex justify-end">
          <button
            type="submit"
            className="px-4 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700">
            Add Paper
          </button>
        </div>
      </form>
    </Modal>
  );
};

export default AddPaperModal;
