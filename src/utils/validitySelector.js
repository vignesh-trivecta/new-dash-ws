import { Fragment, useState } from 'react'
import { Listbox, Transition } from '@headlessui/react'
import { CheckIcon, ChevronUpDownIcon } from '@heroicons/react/20/solid'
import { Label } from 'flowbite-react'
import { useDispatch } from 'react-redux'
import { setBasketValidity } from '@/store/basketSlice'

const people = [
  { name: '1 day' },
  { name: '2 day' },
]

export default function ValiditySelector({ text }) {
  const [selected, setSelected] = useState(people[0]);
  const dispatch = useDispatch();

  const handleChange = (selectedItem) => {
    setSelected(selectedItem);
    // Dispatch the value of the selected item to Redux store
    dispatch(setBasketValidity(selectedItem.name));
  };

  return (
    <div className="">
      <Listbox value={selected} onChange={handleChange} >
        <div className=" mt-1">
          <Listbox.Button className="w-32 relative cursor-default rounded-lg bg-white py-2 pl-3 pr-10 text-left border border-gray-200 focus:outline-none focus-visible:border-indigo-500 focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-opacity-75 focus-visible:ring-offset-2 focus-visible:ring-offset-orange-300 sm:text-xs">
            <span className="block truncate">{selected.name}</span>
            <span className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-2">
              <ChevronUpDownIcon
                className="h-5 w-5 text-gray-400"
                ariaHidden="true"
              />
            </span>
          </Listbox.Button>
          <Transition
            as={Fragment}
            leave="transition ease-in duration-100"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <Listbox.Options 
            style={{height: '70px'}}
            className="absolute mt-1 max-h-32 w-32 overflow-auto rounded-md bg-white py-1 text-base shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-xs">
              {people.map((person, personIdx) => (
                <Listbox.Option
                  key={personIdx}
                  className={({ active }) =>
                    `relative cursor-default select-none py-2 pl-8 pr-4  ${
                      active ? 'bg-amber-100 text-amber-900' : 'text-gray-900'
                    }`
                  }
                  value={person}
                >
                  {({ selected }) => (
                    <>
                      <span
                        className={`block truncate ${
                          selected ? 'font-medium' : 'font-normal'
                        }`}
                      >
                        {person.name}
                      </span>
                      {selected ? (
                        <span className="absolute inset-y-0 left-0 flex items-center pl-2 text-amber-600">
                          <CheckIcon className="h-3 w-3" ariaHidden="true" />
                        </span>
                      ) : null}
                    </>
                  )}
                </Listbox.Option>
              ))}
            </Listbox.Options>
          </Transition>
        </div>
      </Listbox>
    </div>
  )
}
