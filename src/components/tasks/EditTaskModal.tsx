import React, { useState, useEffect } from 'react';
import { Button } from "@/components/ui/button";

interface EditTaskModalProps {
  isOpen: boolean;
  onClose: () => void;
  onEditTask: (task: { id: string; title: string; description: string }) => void;
  task: { id: string; title: string; description: string };
}

const EditTaskModal: React.FC<EditTaskModalProps> = ({ isOpen, onClose, onEditTask, task }) => {
  const [title, setTitle] = useState(task.title);
  const [description, setDescription] = useState(task.description);

  useEffect(() => {
    setTitle(task.title);
    setDescription(task.description);
  }, [task]);

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (title.trim() && description.trim()) {
      onEditTask({ ...task, title, description });
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 backdrop-blur-sm flex items-center justify-center z-50">
      <div className="bg-white p-6 rounded-lg w-96 shadow-2xl">
        <h2 className="text-2xl font-bold mb-4">Edit Task</h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label htmlFor="title" className="block text-sm font-medium text-gray-700">
              Title
            </label>
            <input
              type="text"
              id="title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
              required
              style={{ wordWrap: 'break-word', whiteSpace: 'pre-wrap' }}
            />
          </div>
          <div className="mb-4">
            <label htmlFor="description" className="block text-sm font-medium text-gray-700">
              Description
            </label>
            <textarea
              id="description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
              rows={3}
              required
              style={{ wordWrap: 'break-word', whiteSpace: 'pre-wrap' }}
            />
          </div>
          <div className="flex justify-end space-x-2">
            <Button variant="outline" onClick={onClose}>
              Cancel
            </Button>
            <Button type="submit">
              Save Changes
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default EditTaskModal;
