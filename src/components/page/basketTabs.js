'use client';

import { Tabs } from 'flowbite-react';
import { MdOutlineAddShoppingCart, MdOutlineShoppingBasket } from 'react-icons/md';
import { useState, useRef } from 'react';


export default function BasketTabs() {
  const [activeTab, setActiveTab] = useState(0);
  const tabsRef = useRef(null);
  const props = { setActiveTab, tabsRef };

  return (
    <>
      <Tabs.Group
        ariaLabel="Default tabs"
        style="default"
        ref={props.tabsRef}
        onActiveTabChange={(tab) => props.setActiveTab(tab)}
      >
        <Tabs.Item active title="Baskets" icon={MdOutlineShoppingBasket}>
          This is <span className="font-medium text-gray-800 dark:text-white">Profile tab's associated content</span>.
          Clicking another tab will toggle the visibility of this one for the next. The tab JavaScript swaps classes to
          control the content visibility and styling.
        </Tabs.Item>
        <Tabs.Item title="Create" icon={MdOutlineAddShoppingCart}>
          This is <span className="font-medium text-gray-800 dark:text-white">Dashboard tab's associated content</span>.
          Clicking another tab will toggle the visibility of this one for the next. The tab JavaScript swaps classes to
          control the content visibility and styling.
        </Tabs.Item>
      </Tabs.Group>
    </>
  )
}


