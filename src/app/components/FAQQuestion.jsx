"use client";
import React, { useState } from 'react';
import { ChevronDown } from 'lucide-react';

const SingleFAQQuestion = ({ question, children }) => {
    const [isOpen, setIsOpen] = useState(false);

    return (
        <div className="w-full rounded-lg border border-gray-900 shadow-sm">
            <button
                className="flex w-full items-center justify-between px-6 bg-transparent hover:bg-black/10 hover:backdrop-blur-sm py-4 text-left  hover:cursor-pointer focus:outline-none transition-colors duration-200"
                onClick={() => setIsOpen(!isOpen)}
            >
                <span className="text-lg font-medium text-gray-900 pr-4">
                    {question}
                </span>
                <ChevronDown
                    className={`${isOpen ? 'rotate-180' : ''} h-5 w-5 text-gray-500 transition-transform duration-200 flex-shrink-0`}
                />
            </button>

            {isOpen && (
                <div className="px-6 pb-4 transition-all duration-200 ease-out">
                    <div className="border-t border-gray-900 pt-4">
                        <div className="text-gray-700 leading-relaxed break-words">
                            {children}
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default SingleFAQQuestion;
