"use client";

import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "./card";
import { Label } from "./label";
import { Input } from "./input";
import { Button } from "./button";
import { useKanban } from "../../context/kanbanContext";
import React, { useState, ChangeEvent } from 'react';
import { Column } from "../../types"

export function ModalSection({ toggleModal }: { toggleModal: () => void }) {
  const [ string, setString ] = useState('');
  const { columns, setColumns } = useKanban();

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setString(e.target.value)
  } 

  const handleColumn = (event: React.FormEvent) => {
    const newColumn: Column = {
      id: columns.length + 1,
      user_id: 2,
      title: string,
      position: 1
    }
    event.preventDefault();
    setColumns((prevColumns) => [...prevColumns, newColumn]);
    toggleModal();
  }

  return (
    <Card className="w-full max-w-md">
      <CardHeader>
        <CardTitle>Create New Section</CardTitle>
        <CardDescription>Enter a title for your new Kanban section.</CardDescription>
      </CardHeader>
      <CardContent>
        <form className="space-y-4" onSubmit={handleColumn}>
          <div>
            <Label htmlFor="title">Title</Label>
            <Input type="text" id="title" name="title" placeholder="Enter section title" onChange={handleChange}/>
          </div>
          <div className="flex justify-end">
            <Button onClick={toggleModal} variant="outline" className="mr-2">
              Cancel
            </Button>
            <Button type="submit">Create Section</Button>
          </div>
        </form>
      </CardContent>
    </Card>
  );
}