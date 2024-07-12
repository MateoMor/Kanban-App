import { PlusIcon } from "lucide-react";
import { Button } from "./ui/button";
import { useState } from "react";

interface SectionsProps {}
const SectionButton: React.FC<SectionsProps> = () => {
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [columnTitle, setColumnTitle] = useState<string>("");

  const handleCreateColumn = () => {
    console.log("Creating new column:", columnTitle);
    setIsModalOpen(false);
    setColumnTitle("");
  };

  return (
    <div className="bg-card rounded-lg p-4 shadow-sm">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-medium">Create New Column </h3>
        <Button
          variant="outline"
          size="sm"
          onClick={() => setIsModalOpen(true)}
        >
          <PlusIcon className="w-4 h-4 mr-2" />
          Create Column
        </Button>
      </div>
    </div>
  );
};

export default SectionButton;
