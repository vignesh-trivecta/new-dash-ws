import CustomerDetails from "@/components/admin/table/customerDetails";

export const metadata = {
    title: 'Wealth Spring | Customers',
}

const Customers = () => {
    return (
        <div className="container mx-auto mt-4 overflow-hidden">
            <CustomerDetails />
        </div>
    )
}

export default Customers;