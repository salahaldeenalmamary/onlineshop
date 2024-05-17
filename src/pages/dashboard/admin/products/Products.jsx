import React from 'react';

const TabViews = React.lazy(() => import("@components/TabsViews/TabViews"));
const Product = React.lazy(() => import("@pages/dashboard/admin/products/components/tabs/Product"));
const ProductType = React.lazy(() => import("@pages/dashboard/admin/products/components/tabs/ProductType"));

const tabsData = [
    { label: "Product", component: <Product /> },
    { label: "Product Type", component: <ProductType /> },
];

function Products() {
    return <TabViews tabs={tabsData} />;
}

export default React.memo(Products);