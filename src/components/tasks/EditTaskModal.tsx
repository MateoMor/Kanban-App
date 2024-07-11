// EditTaskModal.tsx

import React from 'react';
import { Button } from "@/components/ui/button";
import { useForm } from 'react-hook-form';

interface EditTaskModalProps {
  isOpen: boolean;
  onClose: () => void;
  task: { id: string; title: string; description: string };
  onEditTask: (editedTask: { id: string; title: string; description: string }) => void;
}

interface FormData {
  title: string;
  description: string;
}

const EditTaskModal: React.FC<EditTaskModalProps> = ({ isOpen, onClose, task, onEditTask }) => {
  const { register, handleSubmit, setValue, formState: { errors } } = useForm<FormData>();

  React.useEffect(() => {
    setValue('title', task.title);
    setValue('description', task.description);
  }, [task, setValue]);

  const onSubmit = handleSubmit((data: FormData) => {
    onEditTask({ ...task, ...data });
    onClose();
  });

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white p-6 rounded-lg w-96">
        <h2 className="text-2xl font-bold mb-4">Edit Task</h2>
        <form onSubmit={onSubmit}>
          <div className="mb-4">
            <label htmlFor="editTitle" className="block text-sm font-medium text-gray-700">
              Title
            </label>
            <input
              type="text"
              id="editTitle"
              {...register('title', { required: 'Title is required' })}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
            />
            {errors.title && (
              <p className="text-red-500 text-sm mt-1">{errors.title.message}</p>
            )}
          </div>
          <div className="mb-4">
            <label htmlFor="editDescription" className="block text-sm font-medium text-gray-700">
              Description
            </label>
            <textarea
              id="editDescription"
              {...register('description', { required: 'Description is required' })}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
              rows={3}
            />
            {errors.description && (
              <p className="text-red-500 text-sm mt-1">{errors.description.message}</p>
            )}
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
