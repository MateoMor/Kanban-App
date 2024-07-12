import React from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

interface CreateColumnDialogProps {
  isOpen: boolean;
  onClose: () => void;
  columnTitle: string;
  onColumnTitleChange: (title: string) => void;
  onCreateColumn: () => void;
}

const CreateColumnDialog: React.FC<CreateColumnDialogProps> = ({ isOpen, onClose, columnTitle, onColumnTitleChange, onCreateColumn }) => {
  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[400px]">
        <DialogHeader>
          <DialogTitle>Create New Column</DialogTitle>
        </DialogHeader>
        <div className="space-y-4 py-4">
          <div className="space-y-2">
            <Label htmlFor="column-title">Column Title</Label>
            <Input
              id="column-title"
              placeholder="Enter column title"
              value={columnTitle}
              onChange={(e) => onColumnTitleChange(e.target.value)}
            />
          </div>
        </div>
        <DialogFooter>
          <Button variant="outline" onClick={onClose}>
            Cancel
          </Button>
          <Button onClick={onCreateColumn}>Create Column</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default CreateColumnDialog;
