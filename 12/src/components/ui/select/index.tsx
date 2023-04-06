import { Listbox } from '@headlessui/react';
import { useState } from 'react';

const people = [
  { id: 1, name: 'Durward Reynolds', unavailable: false },
  { id: 2, name: 'Kenton Towne', unavailable: false },
  { id: 3, name: 'Therese Wunsch', unavailable: false },
  { id: 4, name: 'Benedict Kessler', unavailable: true },
  { id: 5, name: 'Katelyn Rohan', unavailable: false },
];

export const Select = () => {
  const [selectedPerson, setSelectedPerson] = useState(people[0]);

  const getPerson = (name: string) => {
    return people.find(person => person.name === name) || people[0];
  };
  return (
    <>
      <Listbox value={selectedPerson} onChange={setSelectedPerson}>
        <Listbox.Button>{selectedPerson.name}</Listbox.Button>
        <Listbox.Options>
          {people.map(person => (
            <Listbox.Option key={person.id} value={person} disabled={person.unavailable}>
              {person.name}
            </Listbox.Option>
          ))}
        </Listbox.Options>
      </Listbox>
      <div></div>
      <select value={selectedPerson.name} onChange={e => setSelectedPerson(getPerson(e.currentTarget.value))}>
        {people.map(person => (
          <option value={person.name}>{person.name}</option>
        ))}
      </select>
    </>
  );
};
