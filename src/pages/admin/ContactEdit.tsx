import { useEffect, useState } from "react";
import BackToTab from "../../components/BackToTab";
import { IContactProps } from "../../interfaces/interfaces";
import { editContact, getContact } from "../../api/firebase";
import useFetch from "../../hooks/useFetch";

export default function ContactEdit() {
    const [email, setEmail] = useState("");
    const [phone, setPhone] = useState("");
    const [address, setAddress] = useState("");
    const [loadingAction, setLoadingAction] = useState(false);

    const { data: ContactData, refetch: refetchContact } = useFetch(getContact)

    const handleEditContact = async ({ email, phone, address }: IContactProps) => {
        try {
            setLoadingAction(true);
            await editContact({ email, phone, address })
            setLoadingAction(false)
            refetchContact()
        } catch (error) {
            console.error(error);
        }
    }

    useEffect(() => {
        if (ContactData) {
            setEmail(ContactData.email);
            setPhone(ContactData.phone);
            setAddress(ContactData.address);
        }
    }, [ContactData])

    return (
        <div className="max-w-4xl mx-auto py-10">
            <BackToTab />

            <div className="shadow-xl border border-gray-100 rounded-lg px-6 py-8 bg-white">
                <h2 className="text-2xl font-semibold mb-6 text-gray-800 border-b pb-4">Edit Contact Section</h2>

                <div className="space-y-5">
                    <div>
                        <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">Email</label>
                        <input
                            type="text"
                            id="name"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            placeholder="Enter your full email"
                            className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all focus:outline-none"
                        />
                    </div>

                    <div>
                        <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">Phone</label>
                        <input
                            type="text"
                            id="name"
                            value={phone}
                            onChange={(e) => setPhone(e.target.value)}
                            placeholder="Enter your full phone"
                            className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all focus:outline-none"
                        />
                    </div>

                    <div>
                        <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">Address</label>
                        <input
                            type="text"
                            id="name"
                            value={address}
                            onChange={(e) => setAddress(e.target.value)}
                            placeholder="Enter your full address"
                            className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all focus:outline-none"
                        />
                    </div>

                    <div className="pt-4">
                        <div className="flex justify-end">
                            <button className="bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 px-6 rounded-lg transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
                                onClick={() => handleEditContact({ email, phone, address })}
                            >
                                {loadingAction ? <div className="w-5 h-5 border-[3px] rounded-full border-white border-t-[#16a24a] animate-spin"></div> : 'Save'}
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
