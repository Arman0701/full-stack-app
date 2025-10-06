'use client';
import { Task } from '@/_lib/types/board';
import { taskSchema } from '@/validationSchemas/task';
import {
  Button,
  Input,
  Modal,
  ModalBody,
  ModalContent,
  ModalHeader,
  Textarea,
} from '@heroui/react';
import { ErrorMessage, Field, Form, Formik, FormikHelpers } from 'formik';

interface IProps {
  onClose: () => void;
  onOpenChange: () => void;
  isOpen: boolean;
  task: Task | null;
}

export const EditTaskModal = ({ onClose, onOpenChange, isOpen, task }: IProps) => {
  const submitHandler = async (values: Partial<Task>, {}: FormikHelpers<Partial<Task>>) => {};

  return (
    <Modal isOpen={isOpen} onOpenChange={onOpenChange} size="2xl">
      <ModalContent>
        <ModalHeader>Edit {task?.title} task</ModalHeader>
        <ModalBody>
          <Formik<Partial<Task>>
            initialValues={{
              title: task?.title ?? '',
              description: task?.description ?? '',
            }}
            validationSchema={taskSchema}
            onSubmit={submitHandler}
          >
            {({ values }) => (
              <Form className="flex flex-col gap-4">
                <Field as={Input} name="title" label="Title" />
                <ErrorMessage component="span" className="!text-sm !text-red-500" name="title" />
                <Field as={Textarea} name="description" label="Description" />
                <ErrorMessage
                  component="span"
                  className="!text-sm !text-red-500"
                  name="description"
                />
                <Button type="submit" color="secondary" variant="flat">
                  Apply changes
                </Button>
                <Button color="danger" variant="flat" onPress={onClose}>
                  Cancel
                </Button>
              </Form>
            )}
          </Formik>
        </ModalBody>
      </ModalContent>
    </Modal>
  );
};
