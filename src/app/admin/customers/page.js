import CustomerDetails from "@/components/admin/table/customerDetails";

export const metadata = {
    title: 'Wealth Spring | Customers',
}

const Customers = () => {
    return (
        <div className="container mx-auto mt-4 overflow-hidden" style={{ width: "95%" }}>
            <CustomerDetails />
        </div>
    )
}

export default Customers;