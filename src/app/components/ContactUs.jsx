import { Phone, Mail, MapPin, Clock } from "lucide-react"
import Image from "next/image"
import img from "../../../public/FinalMainPhoto.png"

export default function ContactUs() {
    return (
        <div className="min-h-screen bg-gradient-to-br from-[#d4eaff] via-[#a3d8ff] to-[#6bbefb] py-12 px-4 sm:px-6 lg:px-8">
            <div className="max-w-6xl mx-auto">
                <div className="grid lg:grid-cols-2 gap-12 items-center">

                    {/* Contact Information */}
                    <div className="space-y-8">
                        <div>
                            <h1 className="text-4xl font-bold text-gray-900 mb-4">Contact Us</h1>
                            <p className="text-lg text-gray-600 mb-8">
                                If you have any questions about registering as an organ or stem cell donor, or volunteering with Upahaar, feel free to reach out. Our team is always ready to guide you through the process, answer your questions, and help you take the next step in giving the gift of life.
                            </p>
                        </div>

                        <div className="space-y-6">
                            {/* Phone */}

                            {/*<div className="flex items-center space-x-4">
                                <div className="bg-blue-100 p-3 rounded-full">
                                    <Phone className="w-6 h-6 text-blue-600" />
                                </div>
                                <div>
                                    <a
                                        href="tel:+971-XXX-XXXX"
                                        className="text-xl font-semibold text-gray-900 hover:text-blue-600 transition-colors"
                                    >
                                        +971-XXX-XXXX
                                    </a>
                                </div>
                            </div>*/}

                            {/* Email */}
                            <div className="flex items-center space-x-4">
                                <div className="bg-blue-100 p-3 rounded-full">
                                    <Mail className="w-6 h-6 text-blue-600" />
                                </div>
                                <div>
                                    <a
                                        href="mailto:contact@upahaar.org"
                                        className="text-xl font-semibold text-gray-900 hover:text-blue-600 transition-colors"
                                    >
                                        upahaar2014@gmail.com
                                    </a>
                                </div>
                            </div>

                            {/* Address */}
                            <div className="flex items-center space-x-4">
                                <div className="bg-blue-100 p-3 rounded-full">
                                    <MapPin className="w-6 h-6 text-blue-600" />
                                </div>
                                <div>
                                    <p className="text-xl font-semibold text-gray-900">
                                        4 Melrose Crescent, Hale, WA158NN
                                    </p>
                                </div>
                            </div>


                        </div>
                    </div>

                    {/* Image Section */}
                    <div className="flex justify-center lg:justify-end">
                        <div className="relative">
                            <div className="bg-gradient-to-br from-blue-500 to-blue-700 rounded-2xl p-8 shadow-2xl">
                                <div className="w-80 h-80 bg-blue-600 bg-opacity-30 rounded-xl flex items-center justify-center border border-white border-opacity-20">
                                    <div className="text-center text-white px-6">
                                        <Image src={img}></Image>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
