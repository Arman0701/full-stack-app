import { Board } from '@/components/Board';
import { Task } from '@/_lib/types/board';

export default function Home() {
  const fakeList: Task[] = [
    {
      id: '1',
      complete: false,
      description: 'Description 1',
      title: 'Title 1',
    },
    {
      id: '2',
      complete: true,
      description: 'Description 2',
      title: 'Title 2',
    },
    {
      id: '3',
      complete: true,
      description: 'Description 3',
      title: 'Title 3',
    },
    {
      id: '4',
      complete: true,
      description: 'Description 4',
      title: 'Title 4',
    },
    {
      id: '5',
      complete: true,
      description: 'Description 5',
      title: 'Title 5',
    },
    {
      id: '6',
      complete: false,
      description: 'Description 6',
      title: 'Title 6',
    },
    {
      id: '7',
      complete: false,
      description: 'Description 7',
      title: 'Title 7',
    },
  ];

  return (
    <main className="flex flex-col gap-4 p-4">
      <h2 className="text-2xl">Task manager application</h2>
      <Board list={fakeList} />
    </main>
  );
}
