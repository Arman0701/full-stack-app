'use client';
import { BoardProps, Task } from '@/_lib/types/board';
import { AddTaskModal } from '@/components/AddTaskModal';
import { BaseIcon } from '@/components/shared/BaseIcon';
import { EditTaskModal } from '@/components/shared/EditTaskModal';
import { TaskItem } from '@/components/Task';
import { Chip, RadioGroup, Radio, Button, useDisclosure } from '@heroui/react';
import { useMemo, useState } from 'react';

type FilterTasksBy = 'all' | 'pending' | 'completed';

export const Board = ({ list }: BoardProps) => {
  const [selectedTask, setSelectedTask] = useState<Task | null>(null);
  const [filterBy, setFilterBy] = useState<FilterTasksBy>('all');

  const filteredTasksList = useMemo(() => {
    if (filterBy === 'all') return list;

    return list.filter((task) => {
      console.log('filterBy :::', filterBy);
      console.log('task :::', task);
      if (filterBy === 'completed') {
        return task.complete;
      }
      return !task.complete;
    });
  }, [filterBy]);

  const {
    isOpen: isAddTaskModalOpen,
    onOpen: onAddTaskModalOpen,
    onClose: onAddTaskModalClose,
    onOpenChange: onAddTaskModalOpenCHange,
  } = useDisclosure();
  const {
    isOpen: isEditTaskModalOpen,
    onOpen: onEditTaskModalOpen,
    onClose: onEditTaskModalClose,
    onOpenChange: onEditTaskModalOpenCHange,
  } = useDisclosure();

  return (
    <>
      <section className="flex flex-col gap-3">
        <header className="bg-background border border-slate-700 p-4 rounded-xl flex gap-6 justify-between items-center">
          <RadioGroup
            label="Filter tasks"
            orientation="horizontal"
            value={filterBy}
            onValueChange={(value: string) => {
              setFilterBy(value as FilterTasksBy);
            }}
          >
            <Radio value="all">All tasks</Radio>
            <Radio value="completed">Completed tasks</Radio>
            <Radio value="pending">Pending tasks</Radio>
          </RadioGroup>
          <Button
            startContent={<BaseIcon icon="Plus" size={16} color="light" />}
            onPress={onAddTaskModalOpen}
            color="primary"
          >
            Add
          </Button>
        </header>
        {filteredTasksList.length ? (
          filteredTasksList.map((t) => (
            <TaskItem
              key={t.id}
              task={t}
              setSelectedTask={setSelectedTask}
              onEditTaskModalOpen={onEditTaskModalOpen}
            />
          ))
        ) : (
          <Chip startContent={<BaseIcon icon="X" size={16} color="light" />} color="warning">
            Tasks are missing!
          </Chip>
        )}
      </section>

      <AddTaskModal
        isOpen={isAddTaskModalOpen}
        onClose={onAddTaskModalClose}
        onOpenChange={onAddTaskModalOpenCHange}
      />
      <EditTaskModal
        isOpen={isEditTaskModalOpen}
        onClose={onEditTaskModalClose}
        onOpenChange={onEditTaskModalOpenCHange}
        task={selectedTask}
      />
    </>
  );
};
