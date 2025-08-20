import Image from "next/image";
import CircularGallery from "../../Animations/CircularGallery/CircularGallery";
import ZainulAabideen from "../../../public/DirectorsImages/ZainulAabideen.png"
import SaudabiValappil from "../../../public/DirectorsImages/SaudabiValappil.png"
import { useState, useEffect } from "react";
import { getTrustees } from "../actions/actions";
import LoadingSpinner from "./LoadingSpinner";

export default function Directors() {

    const [isLoading, setIsLoading] = useState(true)
    const [selectedDirector, setSelectedDirector] = useState(null);
    const [directors, setDirectors] = useState([])

    useEffect(() => {
        const fetchDirectors = async () => {
            const tempDirectors = await getTrustees()
            setDirectors(tempDirectors)
            setIsLoading(false)
            console.log('directors are', directors)
        }
        fetchDirectors()
    }, [])


    return (
        <>
            {isLoading ? <LoadingSpinner></LoadingSpinner> :
                <div className="w-full pb-12 ">
                    <div className="max-w-7xl mx-auto px-4">
                        {/* Header */}
                        <div className="text-center mb-12">
                            <p className="text-lg text-gray-200">Click on any card to learn more about our leadership team</p>
                        </div>

                        {/* Carousel */}
                        <div className="flex gap-6 overflow-x-auto pb-6 snap-x snap-mandatory scrollbar-hide justify-center">
                            {directors.map((director) => (
                                <div
                                    key={director.trusteeId}
                                    onClick={() => setSelectedDirector(director)}
                                    className="flex-shrink-0 w-52 md:w-72 mt-7 bg-white rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 cursor-pointer group snap-center transform hover:scale-105"
                                >
                                    <div className="p-6">
                                        {/* Profile Image */}
                                        <div className="relative mb-4">
                                            <div className="w-16 h-16 md:h-24 md:w-24 mx-auto rounded-full overflow-hidden bg-gradient-to-br from-blue-400 to-purple-500 p-1">
                                                <img
                                                    src={director.image}
                                                    alt={director.name}
                                                    className="w-full h-full object-cover rounded-full bg-white"
                                                />
                                            </div>
                                        </div>

                                        {/* Name */}
                                        <h3 className="text-lg md:text-xl font-semibold text-gray-800 text-center mb-3 group-hover:text-blue-600 transition-colors">
                                            {director.name}
                                        </h3>

                                        {/* Truncated Description */}
                                        <p className="text-gray-600 text-xs md:text-sm text-center line-clamp-3">
                                            {director.description.length > 100
                                                ? `${director.description.substring(0, 100)}...`
                                                : director.description
                                            }
                                        </p>
                                    </div>
                                </div>
                            ))}
                        </div>

                        {/* Navigation hint */}
                        <div className="text-center mt-6">
                            <p className="text-gray-100 text-sm">← Scroll horizontally to see all directors →</p>
                        </div>
                    </div>

                    {/* Modal */}
                    {selectedDirector && (
                        <div
                            className="fixed inset-0 backdrop-blur-md flex items-center justify-center z-50 p-4"
                            onClick={() => setSelectedDirector(null)}
                        >
                            <div
                                className="bg-white rounded-3xl p-8 max-w-2xl w-full max-h-[90vh] overflow-y-auto relative shadow-2xl"
                                onClick={(e) => e.stopPropagation()}
                            >
                                {/* Close button */}
                                <button
                                    onClick={() => setSelectedDirector(null)}
                                    className="absolute top-6 right-6 w-8 h-8 flex items-center justify-center rounded-full bg-gray-100 hover:bg-gray-200 text-gray-600 hover:text-gray-800 transition-colors"
                                >
                                    ×
                                </button>

                                {/* Modal content */}
                                <div className="flex flex-col md:flex-row gap-8 items-center">
                                    {/* Director image */}
                                    <div className="flex-shrink-0">
                                        <div className="w-48 h-48 rounded-2xl overflow-hidden bg-gradient-to-br from-blue-400 to-purple-500 p-2">
                                            <img
                                                src={selectedDirector.image}
                                                alt={selectedDirector.name}
                                                className="w-full h-full object-cover rounded-xl bg-white"
                                            />
                                        </div>
                                    </div>

                                    {/* Director info */}
                                    <div className="flex-1 text-center md:text-left">
                                        <h2 className="text-3xl font-bold text-gray-800 mb-2">
                                            {selectedDirector.name}
                                        </h2>
                                        <div className="w-16 h-1 bg-gradient-to-r from-blue-500 to-purple-500 mx-auto md:mx-0 mb-6"></div>
                                        <p className="text-gray-600 text-lg leading-relaxed">
                                            {selectedDirector.description}
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    )}
                </div>
            }
        </>



    );
}

