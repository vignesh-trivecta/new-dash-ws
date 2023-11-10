import CustomerDetails from "@/components/admin/table/customerDetails";

export const metadata = {
    title: 'Wealth Spring | Customers',
}

const Customers = () => {
    return (
        <div className="h-[calc(100vh-200px)]">
            <CustomerDetails />
        </div>
    )
}

export default Customers;