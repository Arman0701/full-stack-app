'use client';
import { Task } from '@/_lib/types/board';
import { BaseIcon } from '@/components/shared/BaseIcon';
import { Button, Card, CardBody, CardFooter, CardHeader, Checkbox } from '@heroui/react';
import { Dispatch, SetStateAction, useState } from 'react';

interface IProps {
  task: Task;
  setSelectedTask: Dispatch<SetStateAction<Task | null>>;
  onEditTaskModalOpen: () => void;
}

export const TaskItem = ({ task, setSelectedTask, onEditTaskModalOpen }: IProps) => {
  const { title, complete, description, id } = task;
  const [isChecked, setIsChecked] = useState(complete);

  return (
    <Card>
      <CardHeader className="justify-between">
        <p>{title}</p>
        <Checkbox size="lg" checked={isChecked} onValueChange={setIsChecked}>
          {isChecked ? 'Complete' : 'Pending'}
        </Checkbox>
      </CardHeader>
      <CardBody>{description}</CardBody>
      <CardFooter className="justify-end gap-4 w-full border-t-2 border-slate-700">
        <Button
          startContent={<BaseIcon icon="Pencil" color="light" size={16} />}
          color="secondary"
          onPress={() => {
            setSelectedTask(task);
            onEditTaskModalOpen();
          }}
        >
          Edit
        </Button>
        <Button startContent={<BaseIcon icon="Trash" color="light" size={16} />} color="danger">
          Delete
        </Button>
      </CardFooter>
    </Card>
  );
};
