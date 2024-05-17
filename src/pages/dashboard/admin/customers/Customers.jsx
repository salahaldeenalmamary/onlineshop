import React from 'react'

const TabViews = React.lazy(() => import("@components/TabsViews/TabViews"));
const Customer = React.lazy(() => import("@pages/dashboard/admin/customers/components/tabs/Customer"));
const Role = React.lazy(() => import("@pages/dashboard/admin/customers/components/tabs/Role"));

const tabsData = [
    { label: "Customer", component: <Customer /> },
    { label: "Role", component: <Role /> },
];

function Customers() {
    return <TabViews tabs={tabsData} />;
}

export default React.memo(Customers);